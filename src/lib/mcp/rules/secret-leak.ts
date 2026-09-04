import type { Vulnerability } from "../types";

export function checkSecretLeaks(sql: string): {
  vulnerabilities: Vulnerability[];
} {
  const vulnerabilities: Vulnerability[] = [];

  // Match: JWT service_role or sensitive secret strings (eyJ...)
  const jwtRegex = /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g;
  if (jwtRegex.test(sql)) {
    vulnerabilities.push({
      ruleId: "VG-SEC-004",
      severity: "CRITICAL",
      title: "Hardcoded Supabase JWT Secret detected in SQL",
      description: "A hardcoded JWT token / secret key was found in the migration file.",
      recommendation: "Remove the hardcoded secret immediately and rotate your Supabase API keys via the dashboard.",
    });
  }

  // Match: raw secret keys (e.g. sk_live_..., sbp_...)
  const secretKeyRegex = /(?:sk_live_|sbp_|service_role)\s*['"=:]\s*([a-zA-Z0-9_-]{16,})/gi;
  if (secretKeyRegex.test(sql)) {
    vulnerabilities.push({
      ruleId: "VG-SEC-005",
      severity: "CRITICAL",
      title: "Hardcoded API Secret Key detected",
      description: "A live API private key or service_role secret was found in the SQL migration.",
      recommendation: "Use Supabase Vault or environment variables instead of hardcoding secrets in migration files.",
    });
  }

  return { vulnerabilities };
}
