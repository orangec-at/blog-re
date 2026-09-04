import type { SqlAuditResult, Vulnerability } from "../types";
import { checkRlsMissing } from "../rules/rls-missing";
import { checkPermissivePolicies } from "../rules/permissive-policy";
import { checkSecurityDefiner } from "../rules/security-definer";
import { checkSecretLeaks } from "../rules/secret-leak";

export function auditSql(sql: string): SqlAuditResult {
  const vulnerabilities: Vulnerability[] = [];
  const fixSqls: string[] = [];

  // Normalize comments for AST-like regex checks
  const cleanSql = sql.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  // 1. Run all rule checks
  const rlsCheck = checkRlsMissing(cleanSql);
  vulnerabilities.push(...rlsCheck.vulnerabilities);
  fixSqls.push(...rlsCheck.fixSqls);

  const policyCheck = checkPermissivePolicies(cleanSql);
  vulnerabilities.push(...policyCheck.vulnerabilities);

  const secDefCheck = checkSecurityDefiner(cleanSql);
  vulnerabilities.push(...secDefCheck.vulnerabilities);
  fixSqls.push(...secDefCheck.fixSqls);

  const secretCheck = checkSecretLeaks(sql);
  vulnerabilities.push(...secretCheck.vulnerabilities);

  // 2. Compute summary
  const summary = {
    critical: vulnerabilities.filter((v) => v.severity === "CRITICAL").length,
    high: vulnerabilities.filter((v) => v.severity === "HIGH").length,
    medium: vulnerabilities.filter((v) => v.severity === "MEDIUM").length,
    low: vulnerabilities.filter((v) => v.severity === "LOW").length,
    total: vulnerabilities.length,
  };

  // 3. Compute score grade
  let score: SqlAuditResult["score"] = "A";
  if (summary.critical > 0) {
    score = "F";
  } else if (summary.high > 1) {
    score = "D";
  } else if (summary.high === 1 || summary.medium > 2) {
    score = "C";
  } else if (summary.medium > 0 || summary.low > 2) {
    score = "B";
  }

  // 4. Generate Remediation Patch
  const header = [
    "-- Auto-generated remediation patch — fmv launch gate audit",
    `-- Generated on: ${new Date().toISOString()}`,
    "",
  ].join("\n");

  const fixMigrationSql =
    fixSqls.length > 0
      ? `${header}\n${fixSqls.join("\n\n")}\n`
      : "-- No automated DDL fixes required.\n";

  return {
    vulnerabilities,
    summary,
    score,
    fixMigrationSql,
  };
}
