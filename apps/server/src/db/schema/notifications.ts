import { pgTable, text, timestamp, boolean, integer, serial, pgEnum, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";
import { websites } from "./website";

export const alertType = pgEnum('alert_type', [
  'TRAFFIC_SPIKE',
  'TRAFFIC_DROP',
  'ERROR_RATE_HIGH',
  'CUSTOM'
]);

export const notificationType = pgEnum('notification_type', [
  'EMAIL',
  'IN_APP'
]);

export const alerts = pgTable('alerts', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  websiteId: text('website_id')
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  name: text('name').notNull(),
  alertType: alertType('alert_type').notNull(),
  
  metric: text('metric').notNull(),
  threshold: integer('threshold').notNull(),
  
  notificationTypes: notificationType('notification_types').array().default(['EMAIL']).notNull(),
  
  isActive: boolean('is_active').default(true).notNull(),
  lastTriggeredAt: timestamp('last_triggered_at', { mode: 'string' }),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('alerts_user_id_idx').on(table.userId),
  index('alerts_website_id_idx').on(table.websiteId),
  index('alerts_alert_type_idx').on(table.alertType),
  index('alerts_is_active_idx').on(table.isActive),
]);

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  alertId: text('alert_id')
    .references(() => alerts.id, { onDelete: 'cascade' }),
  
  type: notificationType('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  
  isRead: boolean('is_read').default(false).notNull(),
  sentAt: timestamp('sent_at', { mode: 'string' }),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('notifications_user_id_idx').on(table.userId),
  index('notifications_type_idx').on(table.type),
  index('notifications_is_read_idx').on(table.isRead),
  index('notifications_created_at_idx').on(table.createdAt),
]);

export type Alert = typeof alerts.$inferSelect;
export type NewAlert = typeof alerts.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;