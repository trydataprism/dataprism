import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const userStatus = pgEnum("user_status", [
  "ACTIVE",
  "SUSPENDED",
  "INACTIVE",
  "DELETED",
]);

export const userRole = pgEnum("user_role", [
  "ADMIN",
  "USER",
  "EARLY_ADOPTER",
  "BETA_TESTER",
]);

export const verificationStatus = pgEnum("verification_status", [
  "PENDING",
  "VERIFIED",
  "FAILED",
  "EXPIRED",
]);

// Tables
export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    status: userStatus("status").default("ACTIVE").notNull(),
    role: userRole("role").default("USER").notNull(),
    timezone: text("timezone").default("UTC").notNull(),
    language: text("language").default("en").notNull(),
    lastLoginAt: timestamp("last_login_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    index("users_status_idx").on(table.status),
    index("users_role_idx").on(table.role),
    index("users_created_at_idx").on(table.createdAt),
  ]
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    device: text("device"),
    browser: text("browser"),
    os: text("os"),
    country: text("country"),
    city: text("city"),
    isActive: boolean("is_active").default(true).notNull(),
    lastAccessedAt: timestamp("last_accessed_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("sessions_token_unique").on(table.token),
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
    index("sessions_is_active_idx").on(table.isActive),
  ]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "string",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "string",
    }),
    scope: text("scope"),
    tokenType: text("token_type"),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("accounts_provider_account_unique").on(
      table.providerId,
      table.accountId
    ),
    index("accounts_user_id_idx").on(table.userId),
  ]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey().notNull(),
    identifier: text("identifier").notNull(), // email or phone
    value: text("value").notNull(), // verification code
    type: text("type").notNull(), // email_verification, password_reset, phone_verification
    status: verificationStatus("status").default("PENDING").notNull(),
    attempts: text("attempts").default("0").notNull(),
    maxAttempts: text("max_attempts").default("3").notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    verifiedAt: timestamp("verified_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("verifications_identifier_idx").on(table.identifier),
    index("verifications_expires_at_idx").on(table.expiresAt),
    index("verifications_status_idx").on(table.status),
  ]
);
