import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";
import { user } from "./auth";

// Enums
export const goalType = pgEnum("goal_type", [
  "PAGE_VIEW",
  "EVENT",
  "CUSTOM",
  "REVENUE",
  "DURATION",
]);

export const goalStatus = pgEnum("goal_status", [
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "ARCHIVED",
]);

export const funnelStepType = pgEnum("funnel_step_type", [
  "PAGE_VIEW",
  "EVENT",
  "CUSTOM",
]);

export const funnelGoalType = pgEnum("funnel_goal_type", [
  "COMPLETION",
  "STEP_CONVERSION",
  "TIME_TO_CONVERT",
  "REVENUE",
]);

// Tables
export const goals = pgTable(
  "goals",
  {
    id: text("id").primaryKey().notNull(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),

    // Goal details
    name: text("name").notNull(),
    description: text("description"),
    type: goalType("type").notNull(),
    status: goalStatus("status").default("ACTIVE").notNull(),

    // Goal configuration
    target: text("target").notNull(), // URL pattern, event name, etc.
    targetValue: decimal("target_value", { precision: 10, scale: 2 }), // For revenue goals

    // Conditions & Filters
    conditions: text("conditions"), // JSON for complex conditions
    filters: text("filters"), // JSON for additional filters

    // Value assignment
    value: decimal("value", { precision: 10, scale: 2 }), // Monetary value per conversion
    currency: text("currency").default("USD"),

    // Tracking settings
    trackRevenue: boolean("track_revenue").default(false).notNull(),
    allowMultipleConversions: boolean("allow_multiple_conversions")
      .default(true)
      .notNull(),

    // Attribution
    attributionWindow: integer("attribution_window").default(30).notNull(), // days

    // Metrics (cached for performance)
    totalConversions: integer("total_conversions").default(0).notNull(),
    totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 })
      .default("0.00")
      .notNull(),
    conversionRate: decimal("conversion_rate", { precision: 5, scale: 4 })
      .default("0.0000")
      .notNull(),

    // Timestamps
    firstConversionAt: timestamp("first_conversion_at", { mode: "string" }),
    lastConversionAt: timestamp("last_conversion_at", { mode: "string" }),

    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("goals_website_id_idx").on(table.websiteId),
    index("goals_created_by_idx").on(table.createdBy),
    index("goals_type_idx").on(table.type),
    index("goals_status_idx").on(table.status),
    index("goals_is_active_idx").on(table.isActive),
    index("goals_website_id_deleted_at_created_at_idx").on(
      table.websiteId,
      table.deletedAt,
      table.createdAt
    ),
  ]
);

export const funnelDefinitions = pgTable(
  "funnel_definitions",
  {
    id: text("id").primaryKey().notNull(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),

    // Funnel details
    name: text("name").notNull(),
    description: text("description"),

    // Funnel configuration
    steps: text("steps").notNull(), // JSON array of funnel steps
    stepCount: integer("step_count").notNull(),

    // Filters & Settings
    filters: text("filters"), // JSON for global funnel filters
    timeWindow: integer("time_window").default(30).notNull(), // days for completion

    // Attribution
    attributionModel: text("attribution_model")
      .default("first_touch")
      .notNull(),

    // Metrics (cached for performance)
    totalEntries: integer("total_entries").default(0).notNull(),
    totalCompletions: integer("total_completions").default(0).notNull(),
    completionRate: decimal("completion_rate", { precision: 5, scale: 4 })
      .default("0.0000")
      .notNull(),
    averageTimeToComplete: integer("average_time_to_complete"), // minutes

    // Step-by-step metrics (cached)
    stepMetrics: text("step_metrics"), // JSON with metrics for each step

    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("funnel_definitions_website_id_idx").on(table.websiteId),
    index("funnel_definitions_created_by_idx").on(table.createdBy),
    index("funnel_definitions_is_active_idx").on(table.isActive),
    index("funnel_definitions_website_id_deleted_at_idx").on(
      table.websiteId,
      table.deletedAt
    ),
  ]
);

export const funnelGoals = pgTable(
  "funnel_goals",
  {
    id: text("id").primaryKey().notNull(),
    funnelId: text("funnel_id")
      .notNull()
      .references(() => funnelDefinitions.id, { onDelete: "cascade" }),

    // Goal details
    name: text("name").notNull(),
    description: text("description"),
    goalType: funnelGoalType("goal_type").notNull(),

    // Goal configuration
    targetValue: text("target_value"), // JSON for flexible target configuration
    targetStep: integer("target_step"), // Specific step number for step-based goals

    // Thresholds
    warningThreshold: decimal("warning_threshold", { precision: 5, scale: 4 }),
    criticalThreshold: decimal("critical_threshold", {
      precision: 5,
      scale: 4,
    }),

    // Current metrics
    currentValue: decimal("current_value", { precision: 10, scale: 4 })
      .default("0.0000")
      .notNull(),
    lastCalculatedAt: timestamp("last_calculated_at", { mode: "string" }),

    // Alerting
    enableAlerts: boolean("enable_alerts").default(true).notNull(),
    lastAlertSentAt: timestamp("last_alert_sent_at", { mode: "string" }),

    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("funnel_goals_funnel_id_idx").on(table.funnelId),
    index("funnel_goals_goal_type_idx").on(table.goalType),
    index("funnel_goals_is_active_idx").on(table.isActive),
  ]
);
