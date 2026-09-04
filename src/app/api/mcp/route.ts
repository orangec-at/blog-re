import { NextRequest, NextResponse } from "next/server";

import { absoluteUrl } from "@/config/site";
import { validateBearerToken } from "@/lib/mcp/auth/token";
import { dispatchMcpRequest, VIBEGUARD_TOOLS, type JsonRpcRequest } from "@/lib/mcp/protocol/dispatcher";

export const runtime = "nodejs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// GET /api/mcp: Healthcheck & Discovery endpoint
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const { auth } = validateBearerToken(authHeader);

  return NextResponse.json(
    {
      status: "online",
      name: "vibeguard launch gate MCP gateway",
      version: "0.2.0",
      docs: absoluteUrl("/contact"),
      toolsCount: VIBEGUARD_TOOLS.length,
      tools: VIBEGUARD_TOOLS.map((t) => ({ name: t.name, description: t.description })),
      authenticated: auth.isValid,
      tier: auth.tier,
    },
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
}

// POST /api/mcp: Standard MCP JSON-RPC 2.0 endpoint with Bearer Token Auth
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const { auth, error: authError } = validateBearerToken(authHeader);

  if (authError) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: authError.status === 429 ? -32000 : -32600,
          message: authError.message,
          data: {
            statusCode: authError.status,
            contactUrl: absoluteUrl("/contact"),
          },
        },
      },
      {
        status: authError.status,
        headers: CORS_HEADERS,
      }
    );
  }

  try {
    const body = (await req.json()) as JsonRpcRequest;
    const response = await dispatchMcpRequest(body, auth);

    return NextResponse.json(response, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error parsing request payload";
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: errorMsg,
        },
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }
}
