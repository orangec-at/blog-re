import type { Vulnerability } from "../types";

export function checkRlsMissing(cleanSql: string): {
  vulnerabilities: Vulnerability[];
  fixSqls: string[];
} {
  const vulnerabilities: Vulnerability[] = [];
  const fixSqls: string[] = [];

  // Match: CREATE TABLE [IF NOT EXISTS] [schema.]table_name
  const createTableRegex =
    /CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+(?:(?:public|auth|storage)\.)?(?:"([^"]+)"|([a-zA-Z0-9_]+))/gi;

  const createdTables: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = createTableRegex.exec(cleanSql)) !== null) {
    const tbl = match[1] || match[2];
    if (!createdTables.includes(tbl)) {
      createdTables.push(tbl);
    }
  }

  for (const tbl of createdTables) {
    // Match: ALTER TABLE [schema.]table_name ENABLE ROW LEVEL SECURITY
    const rlsRegex = new RegExp(
      `ALTER\\s+TABLE\\s+(?:(?:public|auth)\\.)?${tbl}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`,
      "i"
    );

    if (!rlsRegex.test(cleanSql)) {
      const fix = `ALTER TABLE public.${tbl} ENABLE ROW LEVEL SECURITY;`;
      vulnerabilities.push({
        ruleId: "VG-RLS-001",
        severity: "CRITICAL",
        tableName: tbl,
        title: `Table '${tbl}' does not enable Row Level Security (RLS)`,
        description: `Creating a table in Supabase without enabling RLS leaves it open to the public if exposed to PostgREST.`,
        recommendation: `Enable RLS immediately and define appropriate access policies.`,
        fixSql: fix,
      });
      fixSqls.push(fix);
    }
  }

  return { vulnerabilities, fixSqls };
}
