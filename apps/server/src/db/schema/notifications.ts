import { pgTable, text, timestamp, boolean, integer, decimal, serial, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";
import { websites } from "./website";

// Enums
export const alertType = pgEnum('alert_type', [
  'TRAFFIC_SPIKE',
  'TRAFFIC_DROP',
  'GOAL_COMPLETION',
  'CONVERSION_RATE_CHANGE',
  'HIGH_BOUNCE_RATE',
  'PAGE_LOAD_SLOW',
  'ERROR_RATE_HIGH',
  'NEW_REFERRER',
  'UNUSUAL_LOCATION',
  'CUSTOM'
]);

export const alertSeverity = pgEnum('alert_severity', [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL'
]);

export const alertStatus = pgEnum('alert_status', [
  'ACTIVE',
  'PAUSED',
  'TRIGGERED',
  'RESOLVED',
  'ARCHIVED'
]);

export const notificationType = pgEnum('notification_type', [
  'EMAIL',
  'PUSH',
  'IN_APP',
  'WEBHOOK',
  'SMS',
  'SLACK',
  'DISCORD'
]);

export const notificationStatus = pgEnum('notification_status', [
  'PENDING',
  'SENT',
  'DELIVERED',
  'FAILED',
  'BOUNCED'
]);

export const alertFrequency = pgEnum('alert_frequency', [
  'IMMEDIATE',
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'ONCE'
]);

// Tables
export const alerts = pgTable('alerts', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  websiteId: text('website_id')
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Alert configuration
  name: text('name').notNull(),
  description: text('description'),
  alertType: alertType('alert_type').notNull(),
  severity: alertSeverity('severity').default('MEDIUM').notNull(),
  status: alertStatus('status').default('ACTIVE').notNull(),
  
  // Trigger conditions
  metric: text('metric').notNull(), // page_views, conversion_rate, etc.
  operator: text('operator').notNull(), // greater_than, less_than, equals, etc.
  threshold: decimal('threshold', { precision: 10, scale: 4 }).notNull(),
  comparisonPeriod: text('comparison_period').default('previous_period').notNull(),
  
  // Time settings
  timeWindow: integer('time_window').default(60).notNull(), // minutes
  frequency: alertFrequency('frequency').default('IMMEDIATE').notNull(),
  
  // Filters & Conditions
  filters: text('filters'), // JSON for additional filters
  conditions: text('conditions'), // JSON for complex conditions
  
  // Notification settings
  notificationTypes: notificationType('notification_types').array().default(['EMAIL']).notNull(),
  recipients: text('recipients').array(), // Additional email recipients
  webhookUrl: text('webhook_url'),
  slackChannel: text('slack_channel'),
  
  // Throttling
  cooldownPeriod: integer('cooldown_period').default(60).notNull(), // minutes
  maxAlertsPerDay: integer('max_alerts_per_day').default(10).notNull(),
  
  // Metrics (tracking)
  triggerCount: integer('trigger_count').default(0).notNull(),
  lastTriggeredAt: timestamp('last_triggered_at', { mode: 'string' }),
  lastTriggeredValue: decimal('last_triggered_value', { precision: 10, scale: 4 }),
  
  // Resolution
  autoResolve: boolean('auto_resolve').default(true).notNull(),
  resolvedAt: timestamp('resolved_at', { mode: 'string' }),
  resolvedBy: text('resolved_by').references(() => user.id, { onDelete: 'set null' }),
  
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('alerts_user_id_idx').on(table.userId),
  index('alerts_website_id_idx').on(table.websiteId),
  index('alerts_alert_type_idx').on(table.alertType),
  index('alerts_status_idx').on(table.status),
  index('alerts_severity_idx').on(table.severity),
  index('alerts_is_active_idx').on(table.isActive),
  index('alerts_last_triggered_at_idx').on(table.lastTriggeredAt),
]);

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  alertId: text('alert_id')
    .references(() => alerts.id, { onDelete: 'cascade' }),
  
  // Notification details
  type: notificationType('type').notNull(),
  status: notificationStatus('status').default('PENDING').notNull(),
  
  // Content
  title: text('title').notNull(),
  message: text('message').notNull(),
  data: text('data'), // JSON for additional notification data
  
  // Delivery details
  recipient: text('recipient').notNull(), // email, phone, webhook URL, etc.
  deliveryAttempts: integer('delivery_attempts').default(0).notNull(),
  maxDeliveryAttempts: integer('max_delivery_attempts').default(3).notNull(),
  
  // Timestamps
  scheduledFor: timestamp('scheduled_for', { mode: 'string' }),
  sentAt: timestamp('sent_at', { mode: 'string' }),
  deliveredAt: timestamp('delivered_at', { mode: 'string' }),
  readAt: timestamp('read_at', { mode: 'string' }),
  
  // Error handling
  errorCode: text('error_code'),
  errorMessage: text('error_message'),
  
  // Metadata
  metadata: text('metadata'), // JSON for provider-specific data
  externalId: text('external_id'), // ID from external service (Sendgrid, etc.)
  
  // User interaction
  isRead: boolean('is_read').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  clickedAt: timestamp('clicked_at', { mode: 'string' }),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('notifications_user_id_idx').on(table.userId),
  index('notifications_alert_id_idx').on(table.alertId),
  index('notifications_type_idx').on(table.type),
  index('notifications_status_idx').on(table.status),
  index('notifications_is_read_idx').on(table.isRead),
  index('notifications_is_archived_idx').on(table.isArchived),
  index('notifications_created_at_idx').on(table.createdAt),
  index('notifications_sent_at_idx').on(table.sentAt),
]);