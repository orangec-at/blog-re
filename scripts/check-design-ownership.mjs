#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const designPath = path.join(root, 'DESIGN.md');
const inventoryPath = path.join(root, 'docs/design-system/ui-pattern-inventory.md');

const requiredOwners = [
  {
    name: 'ServicePackageCard',
    owner: 'src/components/marketing/service-package-card.tsx',
    usedBy: 'src/components/home-redesign/services-preview-grid.tsx',
  },
  {
    name: 'ProofArtifactCard',
    owner: 'src/components/marketing/proof-artifact-card.tsx',
    usedBy: 'src/components/home-redesign/featured-insight-row.tsx',
  },
  {
    name: 'PainSignalCard',
    owner: 'src/components/marketing/pain-signal-card.tsx',
    usedBy: 'src/components/home-redesign/pain-point-grid.tsx',
  },
  {
    name: 'ProofMetricCard',
    owner: 'src/components/marketing/proof-metric-card.tsx',
    usedBy: 'src/components/home-redesign/proof-stat-strip.tsx',
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
