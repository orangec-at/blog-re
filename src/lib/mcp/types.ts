export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface Vulnerability {
  ruleId: string;
  severity: Severity;
  title: string;
  tableName?: string;
  description: string;
  recommendation: string;
  fixSql?: string;
}

export interface SqlAuditResult {
  vulnerabilities: Vulnerability[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  score: "A" | "B" | "C" | "D" | "F";
  fixMigrationSql: string;
}

export interface EndpointAuditResult {
  supabaseUrl: string;
  accessibleTables: string[];
  exposedSensitiveColumns: Array<{
    table: string;
    column: string;
    sampleRedactedValue?: string;
  }>;
  totalVulnerabilities: number;
  riskSummary: string;
}

export type RlsPattern =
  | "user_private"
  | "public_read_auth_write"
  | "org_multi_tenant"
  | "admin_only";

export interface RlsGeneratorOptions {
  tableName: string;
  pattern: RlsPattern;
  userColumn?: string;
  tenantColumn?: string;
  roleColumn?: string;
}

export type UserTier = "free" | "pro" | "enterprise";

export interface AuthContext {
  token: string;
  userId: string;
  tier: UserTier;
  dailyQuota: number;
  usedToday: number;
  isValid: boolean;
}
