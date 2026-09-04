import { NextRequest, NextResponse } from "next/server";

import { auditSql } from "@/lib/mcp/auditors/sql-auditor";

export const runtime = "nodejs";

/**
 * Instant SQL audit.
 *
 * This route used to mint a `vg_live_...` API token from Math.random(), store it
 * nowhere, and hand back a one-line `curl | bash` installer pointing at a domain
 * this project does not own. It was a credential that meant nothing, delivered
 * over a supply chain nobody controlled. Both are gone.
 *
 * What is left is what the route can actually do without a datastore: read SQL
 * out of the request, audit it in memory, and return the finding. It stores
 * nothing, so it asks for nothing to store — no email field. Add lead capture
 * back the day there is somewhere to put a lead.
 */

// The audit is a set of regex passes over the text. Bounded so one request
// cannot pin a function's CPU with a multi-megabyte paste.
const MAX_SQL_LENGTH = 100_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sqlContent } = body;

    if (typeof sqlContent !== "string" || sqlContent.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Provide 'sqlContent' as a non-empty string." },
        { status: 400 },
      );
    }

    if (sqlContent.length > MAX_SQL_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `SQL is too long to audit in one request (${sqlContent.length} characters, limit ${MAX_SQL_LENGTH}).`,
        },
        { status: 413 },
      );
    }

    return NextResponse.json({
      success: true,
      auditResult: auditSql(sqlContent),
      message: "Audit completed.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process audit request";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
