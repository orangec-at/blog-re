import type { Vulnerability } from "../types";

export function checkPermissivePolicies(cleanSql: string): {
  vulnerabilities: Vulnerability[];
} {
  const vulnerabilities: Vulnerability[] = [];

  // Match: CREATE POLICY "policy name" or policy_name ON [schema.]table_name ... USING (true) or WITH CHECK (true)
  const policyRegex =
    /CREATE\s+POLICY\s+(?:"([^"]+)"|([a-zA-Z0-9_]+))\s+ON\s+(?:(?:public|auth)\.)?(?:"([^"]+)"|([a-zA-Z0-9_]+))[\s\S]*?(?:USING\s*\(\s*true\s*\)|WITH\s+CHECK\s*\(\s*true\s*\))/gi;

  let match: RegExpExecArray | null;
  while ((match = policyRegex.exec(cleanSql)) !== null) {
    const policyName = match[1] || match[2];
    const tblName = match[3] || match[4];

    const isPublicRead = /FOR\s+SELECT/i.test(match[0]);
    const severity = isPublicRead ? "MEDIUM" : "CRITICAL";

    vulnerabilities.push({
      ruleId: "VG-RLS-002",
      severity,
      tableName: tblName,
      title: `Overly permissive policy '${policyName}' on '${tblName}'`,
      description: `Policy uses 'true' condition, allowing unrestricted access across all users/guests without row-level authorization.`,
      recommendation: isPublicRead
        ? `If public read is intentional, ensure sensitive columns (e.g. email, tokens) are protected. Otherwise restrict to auth.uid().`
        : `Replace 'USING (true)' / 'WITH CHECK (true)' with an authentication check like 'auth.uid() = user_id'.`,
    });
  }

  return { vulnerabilities };
}
