import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const verificationType = pgEnum("verification_type", [
  "EMAIL_VERIFICATION",
  "PASSWORD_RESET",
]);

export const verificationStatus = pgEnum("verification_status", [
  "PENDING",
  "VERIFIED",
  "EXPIRED",
]);

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    newsletter: boolean("newsletter").notNull().default(false),
    referralSource: text("referral_source"),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
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
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("sessions_token_unique").on(table.token),
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
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
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "string",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "string",
    }),
    createdAt: timestamp("created_at", { mode: "string" })
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
    email: text("email").notNull(),
    code: text("code").notNull(),
    type: verificationType("type").notNull(),
    status: verificationStatus("status").default("PENDING").notNull(),
    attempts: integer("attempts").default(0).notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    verifiedAt: timestamp("verified_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("verifications_email_idx").on(table.email),
    index("verifications_code_idx").on(table.code),
    index("verifications_expires_at_idx").on(table.expiresAt),
    index("verifications_type_status_idx").on(table.type, table.status),
  ]
);

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;
export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;
