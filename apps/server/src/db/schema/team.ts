import { pgTable, text, timestamp, boolean, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";
import { websites } from "./website";

// Enums
export const websiteMemberRole = pgEnum('website_member_role', [
  'OWNER',
  'ADMIN', 
  'EDITOR',
  'VIEWER'
]);

export const invitationStatus = pgEnum('invitation_status', [
  'PENDING',
  'ACCEPTED',
  'DECLINED',
  'EXPIRED',
  'REVOKED'
]);

// Tables
export const websiteMembers = pgTable('website_members', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: websiteMemberRole('role').default('VIEWER').notNull(),
  permissions: text('permissions').array(), // Custom permissions array
  invitedBy: text('invited_by')
    .references(() => user.id, { onDelete: 'set null' }),
  isActive: boolean('is_active').default(true).notNull(),
  lastAccessedAt: timestamp('last_accessed_at', { mode: 'string' }),
  joinedAt: timestamp('joined_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('website_members_website_user_unique').on(table.websiteId, table.userId),
  index('website_members_website_id_idx').on(table.websiteId),
  index('website_members_user_id_idx').on(table.userId),
  index('website_members_role_idx').on(table.role),
  index('website_members_is_active_idx').on(table.isActive),
]);

export const websiteInvitations = pgTable('website_invitations', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: websiteMemberRole('role').default('VIEWER').notNull(),
  permissions: text('permissions').array(), // Custom permissions array
  invitedBy: text('invited_by')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: invitationStatus('status').default('PENDING').notNull(),
  token: text('token').notNull(),
  message: text('message'), // Optional invitation message
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
  acceptedAt: timestamp('accepted_at', { mode: 'string' }),
  acceptedBy: text('accepted_by')
    .references(() => user.id, { onDelete: 'set null' }),
  revokedAt: timestamp('revoked_at', { mode: 'string' }),
  revokedBy: text('revoked_by')
    .references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('website_invitations_website_email_unique').on(table.websiteId, table.email),
  index('website_invitations_website_id_idx').on(table.websiteId),
  index('website_invitations_email_idx').on(table.email),
  index('website_invitations_status_idx').on(table.status),
  index('website_invitations_expires_at_idx').on(table.expiresAt),
  index('website_invitations_invited_by_idx').on(table.invitedBy),
]);