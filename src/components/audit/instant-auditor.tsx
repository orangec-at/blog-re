"use client";

import React, { useState } from "react";
import type { SqlAuditResult } from "@/lib/mcp/types";

/**
 * 샘플 취약점 SQL 데이터
 * 사용자가 직접 입력하지 않고도 즉시 테스트해볼 수 있도록 제공합니다.
 */
const SAMPLE_VULNERABLE_SQL = `-- 1. RLS가 누락되어 인터넷에 전체 노출되는 결제/유저 테이블
CREATE TABLE public.user_billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  card_last4 TEXT
);

-- 2. 검색 경로(search_path)가 고정되지 않아 권한 탈취 위험이 있는 SECURITY DEFINER 함수
CREATE OR REPLACE FUNCTION public.clean_inactive_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.user_billing WHERE email IS NULL;
END;
$$;

-- 3. 누구에게나 삭제 권한이 열려있는 위험한 정책
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can delete" ON public.documents
  FOR DELETE
  USING (true);
`;

/**
 * InstantAuditor: 웹 기반 10초 무료 보안 진단기 & 리드 캡처 컴포넌트
 * 
 * [동작 흐름]
 * 1. 사용자가 SQL을 입력하거나 샘플 버튼을 누르고 '10초 보안 진단 시작' 클릭
 * 2. 즉시 클라이언트/서버에서 보안 등급(A~F)과 누락된 RLS/취약점 목록을 렌더링
 * 3. 치료 패치 SQL 다운로드 및 AI 에이전트(Cursor/Claude) 상시 연동을 위해 이메일 입력 유도
 * 4. 이메일 입력 시 개인화된 Bearer 토큰 및 1줄 설치 스크립트 발급
 */
export function InstantAuditor() {
  const [sqlContent, setSqlContent] = useState(SAMPLE_VULNERABLE_SQL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SqlAuditResult | null>(null);

  const [copied, setCopied] = useState(false);

  // 1. 즉시 진단 실행
  const handleRunAudit = async () => {
    if (!sqlContent.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sqlContent }),
      });

      const data = await res.json();
      if (data.success && data.auditResult) {
        setResult(data.auditResult);
      }
    } catch {
      alert("진단 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-rule bg-canvas p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            vibeguard live security inspector
          </span>
        </div>
        <h3 className="font-display text-2xl text-ink font-semibold tracking-tight">
          내 Supabase SQL 마이그레이션 10초 무료 보안 진단
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
          바이브 코딩으로 생성된 마이그레이션 SQL을 붙여넣으세요. RLS 누락, 권한 우회 정책,
          취약한 SECURITY DEFINER 함수, 하드코딩 시크릿을 1초 만에 스캔합니다.
        </p>
      </div>

      {/* SQL 입력 에디터 영역 */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label htmlFor="sql-input" className="font-mono text-xs text-ink-muted">
            Postgres / Supabase Migration SQL
          </label>
          <button
            type="button"
            onClick={() => setSqlContent(SAMPLE_VULNERABLE_SQL)}
            className="text-xs text-ink underline hover:text-ink-faint transition-colors"
          >
            샘플 취약 코드 불러오기
          </button>
        </div>

        <textarea
          id="sql-input"
          value={sqlContent}
          onChange={(e) => setSqlContent(e.target.value)}
          rows={8}
          placeholder="CREATE TABLE public.users (...);"
          className="w-full rounded-lg border border-rule bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100 placeholder-slate-500 focus:border-ink focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading || !sqlContent.trim()}
            onClick={handleRunAudit}
            className="rounded-lg bg-ink px-6 py-2.5 font-sans text-sm font-medium text-canvas hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? "보안 분석 중..." : "10초 무료 보안 진단 시작 →"}
          </button>
        </div>
      </div>

      {/* 진단 결과 렌더링 영역 */}
      {result && (
        <div className="mt-8 rounded-xl border border-rule bg-slate-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
            <div>
              <span className="font-mono text-xs text-ink-muted">보안 점수 (Security Score)</span>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`font-display text-4xl font-bold ${
                    result.score === "F"
                      ? "text-red-600"
                      : result.score === "A"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  Grade {result.score}
                </span>
                <span className="text-xs text-ink-muted">
                  총 {result.summary.total}개 취약점 발견 (치명적: {result.summary.critical}건, 높음: {result.summary.high}건)
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="rounded bg-red-100 px-2.5 py-1 font-mono text-xs font-medium text-red-800">
                Critical: {result.summary.critical}
              </span>
              <span className="rounded bg-amber-100 px-2.5 py-1 font-mono text-xs font-medium text-amber-800">
                High: {result.summary.high}
              </span>
            </div>
          </div>

          {/* 발견된 취약점 상세 */}
          <div className="mt-4 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
              발견된 주요 취약점 항목
            </h4>
            {result.vulnerabilities.map((v, idx) => (
              <div key={idx} className="rounded-lg border border-rule bg-canvas p-3.5 text-xs">
                <div className="flex items-center gap-2 font-mono font-medium text-red-600">
                  <span>[{v.severity}]</span>
                  <span>{v.title}</span>
                </div>
                <p className="mt-1 text-ink-muted">{v.description}</p>
                <div className="mt-2 rounded bg-slate-100 p-2 font-mono text-[11px] text-slate-700">
                  💡 <strong>권장 조치:</strong> {v.recommendation}
                </div>
              </div>
            ))}
          </div>

          {/* 발견된 것을 고치는 SQL. 이메일도 토큰도 요구하지 않는다 —
              받아둘 곳이 없으면서 받는 척하지 않는다. */}
          <div className="mt-6 rounded-xl border border-rule bg-canvas p-5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
                자동 치료 패치 마이그레이션 SQL
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(result.fixMigrationSql)}
                className="rounded border border-rule px-2.5 py-1 font-sans text-[11px] font-medium text-ink transition hover:bg-slate-100"
              >
                {copied ? "복사됨" : "복사"}
              </button>
            </div>
            <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-slate-200">
              {result.fixMigrationSql}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
