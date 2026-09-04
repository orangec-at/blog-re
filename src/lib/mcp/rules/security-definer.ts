import type { Vulnerability } from "../types";

export function checkSecurityDefiner(cleanSql: string): {
  vulnerabilities: Vulnerability[];
  fixSqls: string[];
} {
  const vulnerabilities: Vulnerability[] = [];
  const fixSqls: string[] = [];

  // Match: CREATE [OR REPLACE] FUNCTION [schema.]func_name (...) ... SECURITY DEFINER ... AS $$ ... $$
  const secDefRegex =
    /CREATE(?:\s+OR\s+REPLACE)?\s+FUNCTION\s+(?:(?:public|auth)\.)?(?:"([^"]+)"|([a-zA-Z0-9_]+))\s*\([^)]*\)[\s\S]*?SECURITY\s+DEFINER[\s\S]*?AS\s+\$\$([\s\S]*?)\$\$/gi;

  let match: RegExpExecArray | null;
  while ((match = secDefRegex.exec(cleanSql)) !== null) {
    const funcName = match[1] || match[2];
    const funcBody = match[0];

    if (!/SET\s+search_path\s*=/i.test(funcBody)) {
      const fix = `ALTER FUNCTION public.${funcName} SET search_path = public;`;
      vulnerabilities.push({
        ruleId: "VG-SEC-003",
        severity: "HIGH",
        title: `SECURITY DEFINER function '${funcName}' missing explicit search_path`,
        description: `Postgres functions running as SECURITY DEFINER without 'SET search_path = public' are vulnerable to search-path hijacking.`,
        recommendation: `Add 'SET search_path = public' (or empty) to the function definition or alter it.`,
        fixSql: fix,
      });
      fixSqls.push(fix);
    }
  }

  return { vulnerabilities, fixSqls };
}
