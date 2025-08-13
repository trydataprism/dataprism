import { pgTable, text, timestamp, boolean, integer, decimal, serial, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";
import { websites } from "./website";

// Enums
export const exportType = pgEnum('export_type', [
  'FULL_DATA',
  'FILTERED_DATA',
  'DASHBOARD_DATA',
  'CUSTOM_REPORT',
  'FUNNEL_DATA',
  'GOAL_DATA'
]);

export const exportFormat = pgEnum('export_format', [
  'CSV',
  'JSON',
  'XLSX',
  'PDF',
  'XML'
]);

export const exportStatus = pgEnum('export_status', [
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'EXPIRED',
  'CANCELED'
]);

export const cachePeriod = pgEnum('cache_period', [
  'REAL_TIME',
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'MONTHLY'
]);

export const cacheStatus = pgEnum('cache_status', [
  'VALID',
  'EXPIRED',
  'BUILDING',
  'FAILED'
]);

// Tables
export const exports = pgTable('exports', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  websiteId: text('website_id')
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Export configuration
  name: text('name').notNull(),
  description: text('description'),
  exportType: exportType('export_type').notNull(),
  format: exportFormat('format').notNull(),
  status: exportStatus('status').default('PENDING').notNull(),
  
  // Date range
  dateFrom: timestamp('date_from', { mode: 'string' }).notNull(),
  dateTo: timestamp('date_to', { mode: 'string' }).notNull(),
  timezone: text('timezone').default('UTC').notNull(),
  
  // Filters & Configuration
  filters: text('filters'), // JSON for data filters
  columns: text('columns'), // JSON array of columns to include
  groupBy: text('group_by'), // JSON for grouping configuration
  sortBy: text('sort_by'), // JSON for sorting configuration
  limit: integer('limit'), // Row limit for large exports
  
  // Processing details
  totalRows: integer('total_rows'),
  processedRows: integer('processed_rows').default(0).notNull(),
  estimatedTimeRemaining: integer('estimated_time_remaining'), // seconds
  
  // File details
  fileUrl: text('file_url'),
  fileName: text('file_name'),
  fileSize: integer('file_size'), // bytes
  fileMimeType: text('file_mime_type'),
  
  // Download tracking
  downloadCount: integer('download_count').default(0).notNull(),
  lastDownloadedAt: timestamp('last_downloaded_at', { mode: 'string' }),
  
  // Expiry
  expiresAt: timestamp('expires_at', { mode: 'string' }),
  autoDelete: boolean('auto_delete').default(true).notNull(),
  
  // Error handling
  errorMessage: text('error_message'),
  errorCode: text('error_code'),
  retryCount: integer('retry_count').default(0).notNull(),
  maxRetries: integer('max_retries').default(3).notNull(),
  
  // Metadata
  metadata: text('metadata'), // JSON for additional export metadata
  
  // Timestamps
  startedAt: timestamp('started_at', { mode: 'string' }),
  completedAt: timestamp('completed_at', { mode: 'string' }),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});