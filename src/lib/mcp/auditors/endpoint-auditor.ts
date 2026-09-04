import type { EndpointAuditResult } from "../types";

const COMMON_TABLES = [
  "users",
  "profiles",
  "accounts",
  "payments",
  "subscriptions",
  "posts",
  "documents",
  "organizations",
  "members",
  "audit_logs",
];

const SENSITIVE_COLUMN_PATTERNS = [
  /email/i,
  /password/i,
  /hash/i,
  /token/i,
  /secret/i,
  /stripe/i,
  /phone/i,
  /ssn/i,
  /card/i,
  /billing/i,
];

// This function makes the server fetch a URL the caller supplied. Without a
// host check that is an SSRF: the caller aims it at cloud metadata, at anything
// on the private network the function can reach, or at a third party it wants
// requests sent to from someone else's IP addresses. Only Supabase's own REST
// hosts are auditable, and only over TLS.
const ALLOWED_HOST_SUFFIXES = [".supabase.co", ".supabase.in"];

// One call already fans out to one request per table. Without a cap the caller
// picks how many.
const MAX_TABLES_PER_AUDIT = 20;

export class UnauditableUrlError extends Error {}

export function assertAuditableUrl(rawUrl: string): URL {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new UnauditableUrlError(`Not a URL: ${rawUrl}`);
  }

  if (url.protocol !== "https:") {
    throw new UnauditableUrlError("Only https:// Supabase project URLs can be audited.");
  }

  const host = url.hostname.toLowerCase();
  if (!ALLOWED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) {
    throw new UnauditableUrlError(
      "Only Supabase project hosts (*.supabase.co) can be audited. Self-hosted projects have to be audited from your own network.",
    );
  }

  return url;
}

export async function auditEndpoints(
  supabaseUrl: string,
  anonKey: string,
  targetTables?: string[]
): Promise<EndpointAuditResult> {
  const cleanUrl = assertAuditableUrl(supabaseUrl).toString().replace(/\/+$/, "");
  const tablesToProbe = (
    targetTables && targetTables.length > 0 ? targetTables : COMMON_TABLES
  ).slice(0, MAX_TABLES_PER_AUDIT);

  const accessibleTables: string[] = [];
  const exposedSensitiveColumns: EndpointAuditResult["exposedSensitiveColumns"] = [];

  for (const table of tablesToProbe) {
    try {
      // Encoded, so a table name cannot add query parameters or walk the path.
      const endpoint = `${cleanUrl}/rest/v1/${encodeURIComponent(table)}?select=*&limit=3`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
          Prefer: "count=exact",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          accessibleTables.push(table);

          // Inspect returned columns for sensitive patterns
          const sampleRow = data[0];
          for (const key of Object.keys(sampleRow)) {
            if (SENSITIVE_COLUMN_PATTERNS.some((pat) => pat.test(key))) {
              exposedSensitiveColumns.push({
                table,
                column: key,
                sampleRedactedValue: sampleRow[key] ? "[EXPOSED_DATA_PRESENT]" : undefined,
              });
            }
          }
        }
      }
    } catch {
      // Ignore network errors or unresolvable URLs per table
    }
  }

  const totalVulnerabilities = accessibleTables.length + exposedSensitiveColumns.length;
  let riskSummary = "Healthy: No public table leaks detected.";
  if (totalVulnerabilities > 0) {
    riskSummary = `Critical Risk: ${accessibleTables.length} tables publicly readable with anon key without active RLS.`;
  }

  return {
    supabaseUrl: cleanUrl,
    accessibleTables,
    exposedSensitiveColumns,
    totalVulnerabilities,
    riskSummary,
  };
}
