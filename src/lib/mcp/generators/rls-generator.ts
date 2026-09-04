import type { RlsGeneratorOptions } from "../types";

export function generateRlsSql(options: RlsGeneratorOptions): string {
  const {
    tableName,
    pattern,
    userColumn = "user_id",
    tenantColumn = "tenant_id",
    roleColumn = "role",
  } = options;

  const header = [
    `-- Standard RLS policy for '${tableName}' — fmv launch gate audit`,
    `-- Pattern: ${pattern}`,
    "",
    `-- 1. Enable RLS`,
    `ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;`,
    "",
  ].join("\n");

  switch (pattern) {
    case "user_private":
      return `${header}-- 2. User Private: Owner has full CRUD access
CREATE POLICY "Users can manage their own ${tableName}" ON public.${tableName}
  FOR ALL
  TO authenticated
  USING (auth.uid() = ${userColumn})
  WITH CHECK (auth.uid() = ${userColumn});
`;

    case "public_read_auth_write":
      return `${header}-- 2. Public Read: Anyone can read, Authenticated Owner can insert/update/delete
CREATE POLICY "Public read access for ${tableName}" ON public.${tableName}
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Owners can insert ${tableName}" ON public.${tableName}
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = ${userColumn});

CREATE POLICY "Owners can update ${tableName}" ON public.${tableName}
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = ${userColumn})
  WITH CHECK (auth.uid() = ${userColumn});

CREATE POLICY "Owners can delete ${tableName}" ON public.${tableName}
  FOR DELETE
  TO authenticated
  USING (auth.uid() = ${userColumn});
`;

    case "org_multi_tenant":
      return `${header}-- 2. Multi-tenant isolation policy
CREATE POLICY "Tenant isolation for ${tableName}" ON public.${tableName}
  FOR ALL
  TO authenticated
  USING (
    ${tenantColumn} = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid
  )
  WITH CHECK (
    ${tenantColumn} = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid
  );
`;

    case "admin_only":
      return `${header}-- 2. Role-Based Admin Only Policy
CREATE POLICY "Admin full access for ${tableName}" ON public.${tableName}
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> '${roleColumn}') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> '${roleColumn}') = 'admin'
  );
`;
  }
}
