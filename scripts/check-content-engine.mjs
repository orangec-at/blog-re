import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const unsafeClaimPatterns = [
  /client result/i,
  /client case study/i,
  /proof\/results/i,
  /APAC clinics/i,
  /founding duo/i,
];

export const requiredPublishedFields = ["seoTitle", "seoDescription", "canonicalPath", "tags", "keywords"];
const placeholderPatterns = [/hello@example\.com/i, /mailto:hello@example\.com/i];

export function findUnsafeClaims(content) {
  return unsafeClaimPatterns.filter((pattern) => pattern.test(content)).map((pattern) => pattern.source);
}

export function validatePostFrontmatter(post) {
  const errors = [];
  const warnings = [];
  const slug = post.slug ?? "unknown";
  const isDraft = post.draft === true || post.draft === "true";

  if (!isDraft) {
    for (const field of requiredPublishedFields) {
      const value = post[field];
      if (Array.isArray(value)) {
        if (value.length === 0) errors.push(`${slug}: missing ${field}`);
      } else if (!value) {
        errors.push(`${slug}: missing ${field}`);
      }
    }
  } else {
    for (const field of ["seoTitle", "seoDescription", "canonicalPath"]) {
      if (!post[field]) warnings.push(`${slug}: draft missing ${field}`);
    }
  }

  if (post.canonicalPath && !post.canonicalPath.startsWith("/posts/") && !/^https?:\/\//.test(post.canonicalPath)) {
    errors.push(`${slug}: canonicalPath must start with /posts/ or be absolute`);
  }

  return { errors, warnings };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed.replace(/^['\"]|['\"]$/g, "");
}

export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  const data = {};
  const lines = match[1].split(/\r?\n/);
  let currentListKey = null;

  for (const line of lines) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentListKey) {
      data[currentListKey].push(parseScalar(listItem[1]));
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValue) continue;

    const [, key, rawValue] = keyValue;
    if (rawValue === "") {
      data[key] = [];
      currentListKey = key;
    } else {
      data[key] = parseScalar(rawValue);
      currentListKey = null;
    }
  }

  return data;
}

function readMdxPosts(repoRoot) {
  const postsDir = path.join(repoRoot, "content", "posts");
  return fs.readdirSync(postsDir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const filePath = path.join(postsDir, name);
      const content = fs.readFileSync(filePath, "utf8");
      return {
        filePath,
        content,
        frontmatter: { slug: name.replace(/\.mdx$/, ""), ...parseFrontmatter(content) },
      };
    });
}

export function runContentEngineCheck(repoRoot = process.cwd()) {
  const errors = [];
  const warnings = [];
  const posts = readMdxPosts(repoRoot);

  for (const post of posts) {
    const result = validatePostFrontmatter(post.frontmatter);
    errors.push(...result.errors);
    warnings.push(...result.warnings);

    const unsafeClaims = findUnsafeClaims(post.content);
    for (const claim of unsafeClaims) {
      errors.push(`${path.relative(repoRoot, post.filePath)}: unsafe claim pattern /${claim}/`);
    }
  }

  const contactFile = path.join(repoRoot, "src", "data", "contacts.ts");
  if (fs.existsSync(contactFile)) {
    const contactContent = fs.readFileSync(contactFile, "utf8");
    for (const pattern of placeholderPatterns) {
      if (pattern.test(contactContent)) {
        errors.push(`src/data/contacts.ts: placeholder contact matched ${pattern}`);
      }
    }
  }

  return { errors, warnings };
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const { errors, warnings } = runContentEngineCheck();
  for (const warning of warnings) console.warn(`warning: ${warning}`);
  if (errors.length > 0) {
    console.error("content-engine check failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("content-engine check passed");
}
