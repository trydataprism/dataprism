import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { user } from "./auth";

// Enums
export const organizationMemberRole = pgEnum("organization_member_role", [
  "OWNER",
  "ADMIN",
  "MEMBER",
  "VIEWER",
]);

export const invitationStatus = pgEnum("invitation_status", [
  "PENDING",
  "ACCEPTED",
  "DECLINED",
  "EXPIRED",
  "REVOKED",
]);

// Tables
export const organizations = pgTable(
  "organizations",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull(), // URL-friendly version of name

    // Owner information (will be set via migration)
    ownerId: text("owner_id").notNull(),

    // Status
    isActive: boolean("is_active").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("organizations_slug_unique").on(table.slug),
    index("organizations_owner_id_idx").on(table.ownerId),
    index("organizations_is_active_idx").on(table.isActive),
  ]
);

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: text("id").primaryKey().notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    role: organizationMemberRole("role").default("MEMBER").notNull(),
    permissions: text("permissions").array(), // Custom permissions array
    invitedBy: text("invited_by"),
    isActive: boolean("is_active").default(true).notNull(),
    lastAccessedAt: timestamp("last_accessed_at", { mode: "string" }),
    joinedAt: timestamp("joined_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("organization_members_org_user_unique").on(
      table.organizationId,
      table.userId
    ),
    index("organization_members_organization_id_idx").on(table.organizationId),
    index("organization_members_user_id_idx").on(table.userId),
    index("organization_members_role_idx").on(table.role),
    index("organization_members_is_active_idx").on(table.isActive),
  ]
);

export const organizationInvitations = pgTable(
  "organization_invitations",
  {
    id: text("id").primaryKey().notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: organizationMemberRole("role").default("MEMBER").notNull(),
    permissions: text("permissions").array(), // Custom permissions array
    invitedBy: text("invited_by").notNull(),
    status: invitationStatus("status").default("PENDING").notNull(),
    token: text("token").notNull(),
    message: text("message"), // Optional invitation message
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    acceptedAt: timestamp("accepted_at", { mode: "string" }),
    acceptedBy: text("accepted_by"),
    revokedAt: timestamp("revoked_at", { mode: "string" }),
    revokedBy: text("revoked_by"),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("organization_invitations_org_email_unique").on(
      table.organizationId,
      table.email
    ),
    index("organization_invitations_organization_id_idx").on(
      table.organizationId
    ),
    index("organization_invitations_email_idx").on(table.email),
    index("organization_invitations_status_idx").on(table.status),
    index("organization_invitations_expires_at_idx").on(table.expiresAt),
    index("organization_invitations_invited_by_idx").on(table.invitedBy),
  ]
);

// Relations
export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    owner: one(user, {
      fields: [organizations.ownerId],
      references: [user.id],
    }),
    members: many(organizationMembers),
    invitations: many(organizationInvitations),
  })
);

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(user, {
      fields: [organizationMembers.userId],
      references: [user.id],
    }),
  })
);

export const organizationInvitationsRelations = relations(
  organizationInvitations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationInvitations.organizationId],
      references: [organizations.id],
    }),
  })
);

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMember = typeof organizationMembers.$inferSelect;
export type NewOrganizationMember = typeof organizationMembers.$inferInsert;
export type OrganizationInvitation =
  typeof organizationInvitations.$inferSelect;
export type NewOrganizationInvitation =
  typeof organizationInvitations.$inferInsert;
