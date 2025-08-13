import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  serial,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";
import { websites } from "./website";

// Enums
export const aiTokenType = pgEnum("ai_token_type", [
  "DAILY_CREDITS",
  "BONUS_CREDITS",
  "PURCHASED_CREDITS",
  "PROMOTIONAL_CREDITS",
]);

export const aiTokenStatus = pgEnum("ai_token_status", [
  "ACTIVE",
  "EXPIRED",
  "USED",
  "RESERVED",
]);

export const aiModel = pgEnum("ai_model", [
  "GPT_4",
  "GPT_4_TURBO",
  "GPT_3_5_TURBO",
  "CLAUDE_3_SONNET",
  "CLAUDE_3_HAIKU",
  "GEMINI_PRO",
]);

export const aiQueryType = pgEnum("ai_query_type", [
  "ANALYTICS_INSIGHT",
  "DATA_EXPLANATION",
  "REPORT_GENERATION",
  "TREND_ANALYSIS",
  "RECOMMENDATION",
  "CUSTOM_QUERY",
]);

export const aiQueryStatus = pgEnum("ai_query_status", [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
  "TIMEOUT",
]);

// Tables
export const aiTokens = pgTable(
  "ai_tokens",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Token details
    tokenType: aiTokenType("token_type").notNull(),
    status: aiTokenStatus("status").default("ACTIVE").notNull(),

    // Amounts
    amount: integer("amount").notNull(),
    usedAmount: integer("used_amount").default(0).notNull(),
    remainingAmount: integer("remaining_amount").notNull(),

    // Validity
    expiresAt: timestamp("expires_at", { mode: "string" }),
    isExpired: boolean("is_expired").default(false).notNull(),

    // Source information
    source: text("source"), // plan, purchase, promotion, etc.
    sourceId: text("source_id"), // Reference to source (subscription_id, etc.)
    description: text("description"),

    // Billing (for purchased tokens)
    cost: decimal("cost", { precision: 10, scale: 2 }),
    currency: text("currency").default("USD"),

    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("ai_tokens_user_id_idx").on(table.userId),
    index("ai_tokens_token_type_idx").on(table.tokenType),
    index("ai_tokens_status_idx").on(table.status),
    index("ai_tokens_expires_at_idx").on(table.expiresAt),
    index("ai_tokens_is_expired_idx").on(table.isExpired),
  ]
);

export const aiUsage = pgTable(
  "ai_usage",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    websiteId: text("website_id").references(() => websites.id, {
      onDelete: "cascade",
    }),

    // Query details
    queryType: aiQueryType("query_type").notNull(),
    query: text("query").notNull(),
    response: text("response"),
    status: aiQueryStatus("status").default("PENDING").notNull(),

    // AI Model & Tokens
    model: aiModel("model").notNull(),
    tokensUsed: integer("tokens_used").default(0).notNull(),
    promptTokens: integer("prompt_tokens").default(0).notNull(),
    completionTokens: integer("completion_tokens").default(0).notNull(),

    // Processing time
    processingTimeMs: integer("processing_time_ms"),

    // Context & Session
    sessionId: text("session_id"), // For conversation tracking
    conversationId: text("conversation_id"), // For multi-turn conversations
    parentQueryId: text("parent_query_id"), // For follow-up queries

    // Request metadata
    requestMetadata: text("request_metadata"), // JSON with request details
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"), // Hashed for privacy

    // Quality & Feedback
    userRating: integer("user_rating"), // 1-5 stars
    userFeedback: text("user_feedback"),
    isHelpful: boolean("is_helpful"),

    // Error handling
    errorCode: text("error_code"),
    errorMessage: text("error_message"),
    retryCount: integer("retry_count").default(0).notNull(),

    // Analytics context (for analytics-specific queries)
    analyticsContext: text("analytics_context"), // JSON with relevant analytics data
    dateRange: text("date_range"), // JSON with from/to dates
    filters: text("filters"), // JSON with applied filters

    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    completedAt: timestamp("completed_at", { mode: "string" }),
  },
  (table) => [
    index("ai_usage_user_id_idx").on(table.userId),
    index("ai_usage_website_id_idx").on(table.websiteId),
    index("ai_usage_created_at_idx").on(table.createdAt),
    index("ai_usage_query_type_idx").on(table.queryType),
    index("ai_usage_status_idx").on(table.status),
    index("ai_usage_model_idx").on(table.model),
    index("ai_usage_session_id_idx").on(table.sessionId),
    index("ai_usage_conversation_id_idx").on(table.conversationId),
    index("ai_usage_parent_query_id_idx").on(table.parentQueryId),
  ]
);
