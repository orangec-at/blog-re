#!/usr/bin/env bash
# ==============================================================================
# VibeGuard One-Line Installer
#
# [주의] 이 스크립트는 아직 공개 배포되지 않는다. 홈페이지 어디에서도 링크하지
# 않으며, MCP 게이트웨이는 MCP_API_TOKENS 에 등록된 토큰만 받는다. 공개하기
# 전에 호스트를 확정할 것 — curl | bash 는 이 도메인을 가진 사람이 실행하는
# 사람의 셸을 갖는다는 뜻이다.
# 
# [설명]
# 사용자의 로컬 환경(Claude Code, Cursor, Codex, Pi 에이전트 등)을 자동 감지하여:
# 1. VibeGuard Agent Skill (/vibeguard)을 로컬 스킬 디렉토리에 설치합니다.
# 2. 원격 MCP Server (https://wakeymoment.vercel.app/api/mcp) 설정을 구성합니다.
#
# [사용법]
# curl -fsSL https://wakeymoment.vercel.app/install.sh | TOKEN=<발급받은 토큰> bash
# ==============================================================================

set -euo pipefail

VIBEGUARD_HOME="${HOME}/.vibeguard"
MCP_ENDPOINT="${MCP_ENDPOINT:-https://wakeymoment.vercel.app/api/mcp}"
TOKEN="${TOKEN:-}"
if [ -z "${TOKEN}" ]; then
  echo "TOKEN이 필요하다. 발급 문의: https://wakeymoment.vercel.app/contact" >&2
  exit 1
fi

echo "🛡️  Installing VibeGuard for your AI Coding Agents..."

# 1. 로컬 VibeGuard 디렉토리 생성 및 토큰 저장
mkdir -p "${VIBEGUARD_HOME}/skills"
echo "${TOKEN}" > "${VIBEGUARD_HOME}/token"

# 2. VibeGuard SKILL.md 파일 생성
cat << 'EOF' > "${VIBEGUARD_HOME}/skills/SKILL.md"
---
name: vibeguard
description: Use VibeGuard to audit Supabase database migrations for RLS security, probe live endpoints for leaks, and generate bulletproof security policies.
allowed-tools:
  - audit_sql_migrations
  - audit_supabase_endpoints
  - generate_secure_rls
---

# VibeGuard Security Guard

Use VibeGuard MCP tools to ensure all Supabase tables, migrations, and live endpoints are hardened before deployment.

## When to Use VibeGuard
1. **Schema / Migration Writing**: Whenever writing or modifying PostgreSQL/Supabase tables, call `audit_sql_migrations` to check for missing RLS, permissive `USING (true)` policies, or exposed secrets.
2. **Pre-deployment Check ("Ship Ready")**: When the user asks "is my app secure?", "check database security", or "ready to ship?", run `audit_sql_migrations` or `audit_supabase_endpoints`.
3. **RLS Policy Creation**: When asked to create permissions or tenant isolation, call `generate_secure_rls` to obtain battle-tested RLS SQL.

## Security Rules Enforced
- **VG-RLS-001**: Every created table MUST explicitly enable Row Level Security.
- **VG-RLS-002**: No `USING (true)` or `WITH CHECK (true)` on write/delete operations without authentication filter.
- **VG-SEC-003**: All `SECURITY DEFINER` functions MUST include `SET search_path = public`.
- **VG-SEC-004 / 005**: Zero hardcoded secrets, JWT service roles, or live keys in SQL.
EOF

# 3. 지원되는 에이전트 클라이언트 탐색 및 스킬 복사
INSTALLED_TARGETS=()

# (A) Claude Code (~/.claude/skills)
if [ -d "${HOME}/.claude" ] || command -v claude &> /dev/null; then
  mkdir -p "${HOME}/.claude/skills/vibeguard"
  cp "${VIBEGUARD_HOME}/skills/SKILL.md" "${HOME}/.claude/skills/vibeguard/SKILL.md"
  INSTALLED_TARGETS+=("Claude Code")
fi

# (B) Cursor (~/.cursor/skills)
if [ -d "${HOME}/.cursor" ]; then
  mkdir -p "${HOME}/.cursor/skills/vibeguard"
  cp "${VIBEGUARD_HOME}/skills/SKILL.md" "${HOME}/.cursor/skills/vibeguard/SKILL.md"
  INSTALLED_TARGETS+=("Cursor")
fi

# (C) Codex (~/.codex/skills)
if [ -d "${HOME}/.codex" ]; then
  mkdir -p "${HOME}/.codex/skills/vibeguard"
  cp "${VIBEGUARD_HOME}/skills/SKILL.md" "${HOME}/.codex/skills/vibeguard/SKILL.md"
  INSTALLED_TARGETS+=("Codex")
fi

# (D) Pi / Open Agents (~/.agents/skills)
mkdir -p "${HOME}/.agents/skills/vibeguard"
cp "${VIBEGUARD_HOME}/skills/SKILL.md" "${HOME}/.agents/skills/vibeguard/SKILL.md"
INSTALLED_TARGETS+=("Pi / Open Agents")

echo "✅ VibeGuard skills installed for: ${INSTALLED_TARGETS[*]}"

# 4. MCP 서버 설정 안내 출력
echo ""
echo "=================================================================="
echo "🎉 VibeGuard MCP Server Configuration"
echo "=================================================================="
echo "Add this to your claude_desktop_config.json, Cursor, or ~/.claude.json:"
echo ""
cat << EOF
{
  "mcpServers": {
    "vibeguard": {
      "type": "http",
      "url": "${MCP_ENDPOINT}",
      "headers": {
        "Authorization": "Bearer ${TOKEN}"
      }
    }
  }
}
EOF
echo ""
echo "=================================================================="
echo "🛡️  VibeGuard is ready. Type '/vibeguard' in your AI agent to test!"
echo "=================================================================="
