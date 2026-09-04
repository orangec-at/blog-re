import { auditSql } from "../auditors/sql-auditor";
import { auditEndpoints, UnauditableUrlError } from "../auditors/endpoint-auditor";
import { generateRlsSql } from "../generators/rls-generator";
import type { AuthContext, RlsPattern } from "../types";

export interface JsonRpcRequest {
  jsonrpc?: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export const VIBEGUARD_TOOLS = [
  {
    name: "audit_sql_migrations",
    description:
      "Analyze Supabase / Postgres SQL migration code for security vulnerabilities (vibeguard): missing RLS, permissive 'USING(true)' policies, unsecure SECURITY DEFINER functions, and hardcoded secrets. Returns severity score (A-F) and an automated remediation patch SQL.",
    inputSchema: {
      type: "object",
      properties: {
        sqlContent: {
          type: "string",
          description: "The SQL migration or DDL schema text to audit.",
        },
      },
      required: ["sqlContent"],
    },
  },
  {
    name: "audit_supabase_endpoints",
    description:
      "Probe live Supabase REST API endpoints using an Anon Key (vibeguard) to detect tables publicly exposed without RLS, data leaks (e.g. exposed emails/tokens), and permission bypasses.",
    inputSchema: {
      type: "object",
      properties: {
        supabaseUrl: {
          type: "string",
          description: "The Supabase project URL (e.g., https://xyz.supabase.co).",
        },
        anonKey: {
          type: "string",
          description: "The project's public anon key.",
        },
        targetTables: {
          type: "array",
          items: { type: "string" },
          description:
            "Optional list of table names to test. If omitted, tests common tables.",
        },
      },
      required: ["supabaseUrl", "anonKey"],
    },
  },
  {
    name: "generate_secure_rls",
    description:
      "Generate industry-standard, production-ready Supabase RLS (Row Level Security) policies (vibeguard) for common application architecture patterns.",
    inputSchema: {
      type: "object",
      properties: {
        tableName: {
          type: "string",
          description: "Name of the database table (e.g. 'posts', 'profiles').",
        },
        pattern: {
          type: "string",
          enum: [
            "user_private",
            "public_read_auth_write",
            "org_multi_tenant",
            "admin_only",
          ],
          description:
            "Security pattern: 'user_private', 'public_read_auth_write', 'org_multi_tenant', 'admin_only'.",
        },
        userColumn: {
          type: "string",
          description: "Owner column name (defaults to 'user_id').",
        },
        tenantColumn: {
          type: "string",
          description: "Tenant column name for org_multi_tenant (defaults to 'tenant_id').",
        },
      },
      required: ["tableName", "pattern"],
    },
  },
];

export async function dispatchMcpRequest(
  request: JsonRpcRequest,
  auth: AuthContext
): Promise<JsonRpcResponse> {
  const id = request.id ?? null;

  switch (request.method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "vibeguard-hosted",
            version: "0.2.0",
          },
          capabilities: {
            tools: {},
          },
          meta: {
            tier: auth.tier,
            quotaRemaining: auth.dailyQuota - auth.usedToday,
          },
        },
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: VIBEGUARD_TOOLS,
        },
      };

    case "tools/call": {
      const params = request.params as { name?: string; arguments?: Record<string, unknown> } | undefined;
      const toolName = params?.name;
      const args = params?.arguments ?? {};

      if (!toolName) {
        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32602,
            message: "Missing tool name in params.",
          },
        };
      }

      if (toolName === "audit_sql_migrations") {
        const sqlContent = args.sqlContent as string;
        if (typeof sqlContent !== "string") {
          return {
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Invalid or missing 'sqlContent'." },
          };
        }

        const report = auditSql(sqlContent);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(report, null, 2),
              },
            ],
          },
        };
      }

      if (toolName === "audit_supabase_endpoints") {
        const supabaseUrl = args.supabaseUrl as string;
        const anonKey = args.anonKey as string;
        const targetTables = args.targetTables as string[] | undefined;

        if (!supabaseUrl || !anonKey) {
          return {
            jsonrpc: "2.0",
            id,
            error: {
              code: -32602,
              message: "Missing 'supabaseUrl' or 'anonKey'.",
            },
          };
        }

        try {
          const report = await auditEndpoints(supabaseUrl, anonKey, targetTables);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(report, null, 2),
                },
              ],
            },
          };
        } catch (err) {
          // A host the auditor refuses to fetch is bad input, not a server
          // fault, and the caller should be told which rule it broke.
          if (err instanceof UnauditableUrlError) {
            return {
              jsonrpc: "2.0",
              id,
              error: { code: -32602, message: err.message },
            };
          }
          throw err;
        }
      }

      if (toolName === "generate_secure_rls") {
        const tableName = args.tableName as string;
        const pattern = args.pattern as RlsPattern;
        const userColumn = args.userColumn as string | undefined;
        const tenantColumn = args.tenantColumn as string | undefined;

        if (!tableName || !pattern) {
          return {
            jsonrpc: "2.0",
            id,
            error: {
              code: -32602,
              message: "Missing 'tableName' or 'pattern'.",
            },
          };
        }

        const sql = generateRlsSql({
          tableName,
          pattern,
          userColumn,
          tenantColumn,
        });

        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: sql,
              },
            ],
          },
        };
      }

      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Unknown tool: ${toolName}`,
        },
      };
    }

    default:
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Method not supported: ${request.method}`,
        },
      };
  }
}
