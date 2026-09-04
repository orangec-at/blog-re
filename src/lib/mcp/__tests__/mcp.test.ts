import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { auditSql } from "../auditors/sql-auditor";
import { generateRlsSql } from "../generators/rls-generator";
import { validateBearerToken } from "../auth/token";
import { dispatchMcpRequest } from "../protocol/dispatcher";
import { assertAuditableUrl, UnauditableUrlError } from "../auditors/endpoint-auditor";

describe("VibeGuard MCP Security Engine", () => {
  it("should detect missing RLS and generate fix migration", () => {
    const sql = `
      CREATE TABLE public.accounts (
        id UUID PRIMARY KEY,
        user_id UUID,
        secret_key TEXT
      );
    `;

    const result = auditSql(sql);
    expect(result.score).toBe("F");
    expect(result.summary.critical).toBe(1);
    expect(result.vulnerabilities[0].ruleId).toBe("VG-RLS-001");
    expect(result.fixMigrationSql).toContain("ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;");
  });

  it("should detect permissive USING (true) policies", () => {
    const sql = `
      CREATE TABLE public.posts (id UUID PRIMARY KEY);
      ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Open access" ON public.posts FOR DELETE USING (true);
    `;

    const result = auditSql(sql);
    expect(result.summary.critical).toBe(1);
    expect(result.vulnerabilities.some((v) => v.ruleId === "VG-RLS-002")).toBe(true);
  });

  it("should detect insecure SECURITY DEFINER functions", () => {
    const sql = `
      CREATE OR REPLACE FUNCTION delete_item(item_id UUID)
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        DELETE FROM items WHERE id = item_id;
      END;
      $$;
    `;

    const result = auditSql(sql);
    expect(result.vulnerabilities.some((v) => v.ruleId === "VG-SEC-003")).toBe(true);
    expect(result.fixMigrationSql).toContain("ALTER FUNCTION public.delete_item SET search_path = public;");
  });

  it("should generate proper multi-tenant RLS SQL", () => {
    const sql = generateRlsSql({
      tableName: "documents",
      pattern: "org_multi_tenant",
      tenantColumn: "organization_id",
    });

    expect(sql).toContain("ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;");
    expect(sql).toContain("organization_id = (auth.jwt() -> 'app_metadata' ->> 'organization_id')::uuid");
  });
});

describe("MCP auth guard", () => {
  const originalTokens = process.env.MCP_API_TOKENS;

  beforeEach(() => {
    process.env.MCP_API_TOKENS = "tok_configured_one,tok_configured_two";
  });

  afterEach(() => {
    if (originalTokens === undefined) delete process.env.MCP_API_TOKENS;
    else process.env.MCP_API_TOKENS = originalTokens;
  });

  it("rejects requests without a Bearer token", () => {
    const { auth, error } = validateBearerToken(null);
    expect(auth.isValid).toBe(false);
    expect(error?.status).toBe(401);
  });

  it("accepts a token that is in the configured registry", () => {
    const res = validateBearerToken("Bearer tok_configured_one");
    expect(res.auth.isValid).toBe(true);
    expect(res.error).toBeUndefined();
  });

  it("rejects an unregistered token, whatever it looks like", () => {
    // Until 2026-09-04 the check was a prefix test, so every one of these
    // authenticated - the first two as a paying customer.
    for (const token of [
      "vg_live_abcdef123456",
      "vg_live_",
      "vg_test_evaluation",
      "aaaaaaaaaaaaaaaaaaaa",
      "tok_configured_onx",
    ]) {
      const res = validateBearerToken(`Bearer ${token}`);
      expect(res.auth.isValid, `${token} must not authenticate`).toBe(false);
      expect(res.error?.status).toBe(401);
    }
  });

  it("rejects everything when no tokens are configured", () => {
    delete process.env.MCP_API_TOKENS;
    const res = validateBearerToken("Bearer tok_configured_one");
    expect(res.auth.isValid).toBe(false);
    expect(res.error?.status).toBe(401);
  });

  it("says the same thing for a wrong token as for an empty registry", () => {
    const wrong = validateBearerToken("Bearer nope_not_a_token")?.error?.message;
    delete process.env.MCP_API_TOKENS;
    const unconfigured = validateBearerToken("Bearer tok_configured_one")?.error?.message;
    expect(wrong).toBe(unconfigured);
  });
});

describe("endpoint auditor host guard", () => {
  it("refuses any host that is not a Supabase project", () => {
    // Each of these was fetched server-side before the guard existed.
    for (const url of [
      "http://169.254.169.254/latest/meta-data/",
      "http://localhost:3000/admin",
      "https://127.0.0.1/",
      "https://evil.example.com/",
      "https://supabase.co.evil.example.com/",
      "file:///etc/passwd",
      "not a url at all",
    ]) {
      expect(() => assertAuditableUrl(url), `${url} must be refused`).toThrow(UnauditableUrlError);
    }
  });

  it("refuses a Supabase host over plain http", () => {
    expect(() => assertAuditableUrl("http://abc.supabase.co")).toThrow(UnauditableUrlError);
  });

  it("allows a real Supabase project URL", () => {
    expect(assertAuditableUrl("https://abcdefgh.supabase.co").hostname).toBe("abcdefgh.supabase.co");
  });

  it("answers a refused host as invalid params, not a crash", async () => {
    const res = await dispatchMcpRequest(
      {
        jsonrpc: "2.0",
        id: 9,
        method: "tools/call",
        params: {
          name: "audit_supabase_endpoints",
          arguments: { supabaseUrl: "http://169.254.169.254/", anonKey: "anon" },
        },
      },
      {
        token: "t",
        userId: "usr_1",
        tier: "pro" as const,
        dailyQuota: 10,
        usedToday: 1,
        isValid: true,
      },
    );

    expect(res.error?.code).toBe(-32602);
    expect(res.result).toBeUndefined();
  });
});

describe("VibeGuard MCP JSON-RPC Dispatcher", () => {
  it("should handle initialize handshake", async () => {
    const auth = {
      token: "vg_live_test",
      userId: "usr_123",
      tier: "pro" as const,
      dailyQuota: 1000,
      usedToday: 5,
      isValid: true,
    };

    const res = await dispatchMcpRequest(
      {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
      },
      auth
    );

    expect(res.jsonrpc).toBe("2.0");
    expect(res.id).toBe(1);
    expect((res.result as { serverInfo: { name: string } }).serverInfo.name).toBe("vibeguard-hosted");
  });

  it("should handle tools/list", async () => {
    const auth = {
      token: "vg_live_test",
      userId: "usr_123",
      tier: "pro" as const,
      dailyQuota: 1000,
      usedToday: 5,
      isValid: true,
    };

    const res = await dispatchMcpRequest(
      {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
      },
      auth
    );

    const tools = (res.result as { tools: Array<{ name: string }> }).tools;
    expect(tools.length).toBe(3);
    expect(tools.map((t) => t.name)).toContain("audit_sql_migrations");
  });

  it("should execute audit_sql_migrations tool call", async () => {
    const auth = {
      token: "vg_live_test",
      userId: "usr_123",
      tier: "pro" as const,
      dailyQuota: 1000,
      usedToday: 5,
      isValid: true,
    };

    const res = await dispatchMcpRequest(
      {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "audit_sql_migrations",
          arguments: {
            sqlContent: "CREATE TABLE secret_notes (id UUID PRIMARY KEY, body TEXT);",
          },
        },
      },
      auth
    );

    expect(res.result).toBeDefined();
    const content = (res.result as { content: Array<{ text: string }> }).content[0].text;
    expect(content).toContain("VG-RLS-001");
  });
});
