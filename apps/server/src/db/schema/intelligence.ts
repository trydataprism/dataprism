import { pgTable, text, timestamp, boolean, integer, decimal, serial, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

// Enums
export const conversionPathStatus = pgEnum('conversion_path_status', [
  'IN_PROGRESS',
  'COMPLETED',
  'ABANDONED',
  'EXPIRED'
]);

export const touchpointType = pgEnum('touchpoint_type', [
  'ORGANIC_SEARCH',
  'PAID_SEARCH',
  'SOCIAL_MEDIA',
  'EMAIL',
  'DIRECT',
  'REFERRAL',
  'DISPLAY',
  'VIDEO',
  'AFFILIATE',
  'OTHER'
]);

export const cohortPeriod = pgEnum('cohort_period', [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'QUARTERLY'
]);

export const retentionMetricType = pgEnum('retention_metric_type', [
  'USER_RETENTION',
  'REVENUE_RETENTION',
  'FEATURE_RETENTION',
  'ENGAGEMENT_RETENTION'
]);

// Tables
export const conversionPaths = pgTable('conversion_paths', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Visitor journey
  visitorId: text('visitor_id').notNull(),
  
  // Path details
  touchpoints: text('touchpoints').notNull(), // JSON array of touchpoints
  touchpointCount: integer('touchpoint_count').notNull(),
  
  // Journey timing
  firstTouchAt: timestamp('first_touch_at', { mode: 'string' }).notNull(),
  lastTouchAt: timestamp('last_touch_at', { mode: 'string' }).notNull(),
  conversionTime: integer('conversion_time'), // Minutes from first touch to conversion
  
  // Conversion details
  status: conversionPathStatus('status').default('IN_PROGRESS').notNull(),
  goalId: text('goal_id'), // Reference to goals table
  conversionValue: decimal('conversion_value', { precision: 10, scale: 2 }),
  conversionCurrency: text('conversion_currency').default('USD'),
  
  // Attribution
  firstTouchChannel: touchpointType('first_touch_channel'),
  lastTouchChannel: touchpointType('last_touch_channel'),
  assistingChannels: touchpointType('assisting_channels').array(),
  
  // Journey complexity
  sessionCount: integer('session_count').default(1).notNull(),
  pageViewCount: integer('page_view_count').default(0).notNull(),
  eventCount: integer('event_count').default(0).notNull(),
  
  // Device diversity
  uniqueDevices: integer('unique_devices').default(1).notNull(),
  deviceTypes: text('device_types').array(), // desktop, mobile, tablet
  
  // Geography
  countries: text('countries').array(), // List of countries visited from
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('conversion_paths_website_id_idx').on(table.websiteId),
  index('conversion_paths_visitor_id_idx').on(table.visitorId),
  index('conversion_paths_status_idx').on(table.status),
  index('conversion_paths_first_touch_at_idx').on(table.firstTouchAt),
  index('conversion_paths_first_touch_channel_idx').on(table.firstTouchChannel),
  index('conversion_paths_last_touch_channel_idx').on(table.lastTouchChannel),
  index('conversion_paths_goal_id_idx').on(table.goalId),
]);

export const cohortAnalysis = pgTable('cohort_analysis', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Cohort definition
  cohortPeriod: cohortPeriod('cohort_period').notNull(),
  cohortDate: timestamp('cohort_date', { mode: 'string' }).notNull(),
  cohortSize: integer('cohort_size').notNull(),
  
  // Retention metrics by period
  period0Retention: decimal('period_0_retention', { precision: 5, scale: 4 }).default('1.0000').notNull(), // Always 100%
  period1Retention: decimal('period_1_retention', { precision: 5, scale: 4 }),
  period2Retention: decimal('period_2_retention', { precision: 5, scale: 4 }),
  period3Retention: decimal('period_3_retention', { precision: 5, scale: 4 }),
  period4Retention: decimal('period_4_retention', { precision: 5, scale: 4 }),
  period5Retention: decimal('period_5_retention', { precision: 5, scale: 4 }),
  period6Retention: decimal('period_6_retention', { precision: 5, scale: 4 }),
  
  // Revenue metrics (if applicable)
  period0Revenue: decimal('period_0_revenue', { precision: 10, scale: 2 }),
  period1Revenue: decimal('period_1_revenue', { precision: 10, scale: 2 }),
  period2Revenue: decimal('period_2_revenue', { precision: 10, scale: 2 }),
  period3Revenue: decimal('period_3_revenue', { precision: 10, scale: 2 }),
  period4Revenue: decimal('period_4_revenue', { precision: 10, scale: 2 }),
  period5Revenue: decimal('period_5_revenue', { precision: 10, scale: 2 }),
  period6Revenue: decimal('period_6_revenue', { precision: 10, scale: 2 }),
  
  // Cohort characteristics
  acquisitionChannel: text('acquisition_channel'),
  deviceType: text('device_type'),
  country: text('country'),
  
  // Additional metrics
  averageSessionsPerUser: decimal('average_sessions_per_user', { precision: 5, scale: 2 }),
  averagePageViewsPerUser: decimal('average_page_views_per_user', { precision: 5, scale: 2 }),
  averageRevenuePerUser: decimal('average_revenue_per_user', { precision: 10, scale: 2 }),
  
  lastCalculatedAt: timestamp('last_calculated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('cohort_analysis_website_period_date_unique')
    .on(table.websiteId, table.cohortPeriod, table.cohortDate),
  index('cohort_analysis_website_id_idx').on(table.websiteId),
  index('cohort_analysis_cohort_date_idx').on(table.cohortDate),
  index('cohort_analysis_cohort_period_idx').on(table.cohortPeriod),
  index('cohort_analysis_acquisition_channel_idx').on(table.acquisitionChannel),
]);

export const retentionStats = pgTable('retention_stats', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Date range
  dateFrom: timestamp('date_from', { mode: 'string' }).notNull(),
  dateTo: timestamp('date_to', { mode: 'string' }).notNull(),
  
  // Metric type
  metricType: retentionMetricType('metric_type').notNull(),
  
  // Segmentation
  segment: text('segment'), // e.g., 'mobile_users', 'premium_users', etc.
  segmentValue: text('segment_value'),
  
  // Retention periods (percentages)
  day1Retention: decimal('day_1_retention', { precision: 5, scale: 4 }),
  day7Retention: decimal('day_7_retention', { precision: 5, scale: 4 }),
  day14Retention: decimal('day_14_retention', { precision: 5, scale: 4 }),
  day30Retention: decimal('day_30_retention', { precision: 5, scale: 4 }),
  day60Retention: decimal('day_60_retention', { precision: 5, scale: 4 }),
  day90Retention: decimal('day_90_retention', { precision: 5, scale: 4 }),
  
  // Base metrics
  totalUsers: integer('total_users').notNull(),
  returningUsers: integer('returning_users').notNull(),
  newUsers: integer('new_users').notNull(),
  
  // Engagement metrics
  averageSessionDuration: integer('average_session_duration'), // seconds
  averagePageViewsPerSession: decimal('average_page_views_per_session', { precision: 5, scale: 2 }),
  bounceRate: decimal('bounce_rate', { precision: 5, scale: 4 }),
  
  // Revenue metrics (if applicable)
  totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }),
  averageRevenuePerUser: decimal('average_revenue_per_user', { precision: 10, scale: 2 }),
  
  lastCalculatedAt: timestamp('last_calculated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('retention_stats_website_date_metric_segment_unique')
    .on(table.websiteId, table.dateFrom, table.dateTo, table.metricType, table.segment),
  index('retention_stats_website_id_idx').on(table.websiteId),
  index('retention_stats_date_from_idx').on(table.dateFrom),
  index('retention_stats_metric_type_idx').on(table.metricType),
  index('retention_stats_segment_idx').on(table.segment),
]);