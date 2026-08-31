#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const designPath = path.join(root, 'DESIGN.md');
const inventoryPath = path.join(root, 'docs/design-system/ui-pattern-inventory.md');

// The four marketing cards this table used to guard were only ever rendered by
// src/components/home-redesign/, which the proposal-home redesign deleted. The
// table went empty, then the proposal-home redesign registered its own five
// reusable patterns below — the ones src/app/page.tsx now composes the home
// page from.
const requiredOwners = [
  {
    name: 'ProposalSection',
    owner: 'src/components/proposal/proposal-section.tsx',
    usedBy: 'src/app/page.tsx',
  },
  {
    name: 'SystemMapPanel',
    owner: 'src/components/proposal/system-map-panel.tsx',
    usedBy: 'src/app/page.tsx',
  },
  {
    name: 'GateList',
    owner: 'src/components/proposal/gate-list.tsx',
    usedBy: 'src/app/page.tsx',
  },
  {
    name: 'VerdictSheet',
    owner: 'src/components/proposal/verdict-sheet.tsx',
    usedBy: 'src/app/page.tsx',
  },
  {
    name: 'ScopeTable',
    owner: 'src/components/proposal/scope-table.tsx',
    usedBy: 'src/app/page.tsx',
  },
  {
    name: 'ReportMeta',
    owner: 'src/components/content/report-blocks.tsx',
    usedBy: 'content/posts/ai-mvp-technical-debt-audit-sample-report.mdx',
  },
  {
    name: 'ReportSection',
    owner: 'src/components/content/report-blocks.tsx',
    usedBy: 'content/posts/ai-mvp-technical-debt-audit-sample-report.mdx',
  },
  {
    name: 'ReportTable',
    owner: 'src/components/content/report-blocks.tsx',
    usedBy: 'content/posts/ai-mvp-technical-debt-audit-sample-report.mdx',
  },
  {
    name: 'ReportList',
    owner: 'src/components/content/report-blocks.tsx',
    usedBy: 'content/posts/ai-mvp-technical-debt-audit-sample-report.mdx',
  },
];

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required design ownership file: ${path.relative(root, filePath)}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

const design = readRequired(designPath);
const inventory = readRequired(inventoryPath);
const failures = [];

for (const item of requiredOwners) {
  for (const source of [
    { label: 'DESIGN.md', body: design },
    { label: 'ui-pattern-inventory.md', body: inventory },
  ]) {
    for (const needle of [item.name, item.owner, item.usedBy]) {
      if (!source.body.includes(needle)) {
        failures.push(`${source.label} does not mention ${needle}`);
      }
    }
  }

  for (const file of [item.owner, item.usedBy]) {
    if (!fs.existsSync(path.join(root, file))) {
      failures.push(`Referenced file does not exist: ${file}`);
    }
  }
}

const requiredGuardrails = [
  'Do not create ad-hoc card shells',
  'Do not add page-local cards',
  'If a visual pattern appears more than once',
];

for (const guardrail of requiredGuardrails) {
  if (!design.includes(guardrail)) {
    failures.push(`DESIGN.md missing guardrail: ${guardrail}`);
  }
}

if (failures.length > 0) {
  console.error('Design ownership check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Design ownership check passed for ${requiredOwners.length} reusable marketing component contracts.`);
