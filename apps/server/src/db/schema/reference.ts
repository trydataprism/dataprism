import { pgTable, text, timestamp, boolean, integer, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

// Enums
export const campaignStatus = pgEnum('campaign_status', [
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
  'ARCHIVED'
]);

export const deviceCategory = pgEnum('device_category', [
  'DESKTOP',
  'MOBILE',
  'TABLET',
  'TV',
  'WEARABLE',
  'UNKNOWN'
]);

// Tables
export const utmCampaigns = pgTable('utm_campaigns', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // UTM Parameters
  source: text('source').notNull(),
  medium: text('medium').notNull(),
  campaign: text('campaign').notNull(),
  content: text('content'),
  term: text('term'),
  
  // Campaign details
  name: text('name').notNull(),
  description: text('description'),
  status: campaignStatus('status').default('ACTIVE').notNull(),
  
  // Date ranges
  startDate: timestamp('start_date', { mode: 'string' }),
  endDate: timestamp('end_date', { mode: 'string' }),
  
  // Budget & Goals
  budget: text('budget'), // JSON for budget details
  goals: text('goals'), // JSON for campaign goals
  
  // Metrics (cached for performance)
  totalClicks: integer('total_clicks').default(0).notNull(),
  totalImpressions: integer('total_impressions').default(0).notNull(),
  totalConversions: integer('total_conversions').default(0).notNull(),
  
  // Metadata
  tags: text('tags').array(), // Campaign tags
  metadata: text('metadata'), // JSON for additional data
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('utm_campaigns_website_source_medium_campaign_unique')
    .on(table.websiteId, table.source, table.medium, table.campaign),
  index('utm_campaigns_website_id_idx').on(table.websiteId),
  index('utm_campaigns_source_idx').on(table.source),
  index('utm_campaigns_medium_idx').on(table.medium),
  index('utm_campaigns_campaign_idx').on(table.campaign),
  index('utm_campaigns_status_idx').on(table.status),
]);

export const referrerDomains = pgTable('referrer_domains', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Domain info
  domain: text('domain').notNull(),
  normalizedDomain: text('normalized_domain').notNull(), // Without www, subdomains
  
  // Classification
  category: text('category'), // social, search, direct, etc.
  subcategory: text('subcategory'),
  platform: text('platform'), // google, facebook, twitter, etc.
  
  // Domain details
  title: text('title'),
  description: text('description'),
  favicon: text('favicon'),
  
  // Trust & Safety
  isSpam: boolean('is_spam').default(false).notNull(),
  isBot: boolean('is_bot').default(false).notNull(),
  trustScore: integer('trust_score'), // 0-100
  
  // Metrics (cached)
  totalReferrals: integer('total_referrals').default(0).notNull(),
  uniqueVisitors: integer('unique_visitors').default(0).notNull(),
  
  // First/Last seen
  firstSeenAt: timestamp('first_seen_at', { mode: 'string' }).notNull(),
  lastSeenAt: timestamp('last_seen_at', { mode: 'string' }).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('referrer_domains_website_domain_unique').on(table.websiteId, table.domain),
  index('referrer_domains_website_id_idx').on(table.websiteId),
  index('referrer_domains_normalized_domain_idx').on(table.normalizedDomain),
  index('referrer_domains_category_idx').on(table.category),
  index('referrer_domains_platform_idx').on(table.platform),
  index('referrer_domains_is_spam_idx').on(table.isSpam),
]);

export const deviceInfo = pgTable('device_info', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Device details
  deviceHash: text('device_hash').notNull(), // Hash of device fingerprint
  category: deviceCategory('category').notNull(),
  
  // Browser info
  browser: text('browser').notNull(),
  browserVersion: text('browser_version'),
  browserEngine: text('browser_engine'),
  
  // Operating System
  os: text('os').notNull(),
  osVersion: text('os_version'),
  
  // Hardware
  screenResolution: text('screen_resolution'),
  colorDepth: integer('color_depth'),
  pixelRatio: text('pixel_ratio'),
  
  // Capabilities
  hasJavaScript: boolean('has_javascript').default(true).notNull(),
  hasCookies: boolean('has_cookies').default(true).notNull(),
  hasLocalStorage: boolean('has_local_storage').default(true).notNull(),
  hasSessionStorage: boolean('has_session_storage').default(true).notNull(),
  
  // Bot detection
  isBot: boolean('is_bot').default(false).notNull(),
  botName: text('bot_name'),
  
  // Metrics (cached)
  totalSessions: integer('total_sessions').default(0).notNull(),
  totalPageViews: integer('total_page_views').default(0).notNull(),
  
  // First/Last seen
  firstSeenAt: timestamp('first_seen_at', { mode: 'string' }).notNull(),
  lastSeenAt: timestamp('last_seen_at', { mode: 'string' }).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('device_info_website_device_hash_unique').on(table.websiteId, table.deviceHash),
  index('device_info_website_id_idx').on(table.websiteId),
  index('device_info_category_idx').on(table.category),
  index('device_info_browser_idx').on(table.browser),
  index('device_info_os_idx').on(table.os),
  index('device_info_is_bot_idx').on(table.isBot),
]);

export const locationData = pgTable('location_data', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Location hierarchy
  country: text('country').notNull(),
  countryCode: text('country_code').notNull(), // ISO 3166-1 alpha-2
  region: text('region'),
  regionCode: text('region_code'),
  city: text('city'),
  
  // Geographic coordinates
  latitude: text('latitude'),
  longitude: text('longitude'),
  timezone: text('timezone'),
  
  // Additional location info
  continent: text('continent'),
  continentCode: text('continent_code'),
  postalCode: text('postal_code'),
  
  // ISP & Connection
  isp: text('isp'),
  organization: text('organization'),
  connectionType: text('connection_type'), // broadband, mobile, etc.
  
  // Metrics (cached)
  totalVisitors: integer('total_visitors').default(0).notNull(),
  totalSessions: integer('total_sessions').default(0).notNull(),
  totalPageViews: integer('total_page_views').default(0).notNull(),
  
  // First/Last seen
  firstSeenAt: timestamp('first_seen_at', { mode: 'string' }).notNull(),
  lastSeenAt: timestamp('last_seen_at', { mode: 'string' }).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('location_data_website_country_region_city_unique')
    .on(table.websiteId, table.country, table.region, table.city),
  index('location_data_website_id_idx').on(table.websiteId),
  index('location_data_country_idx').on(table.country),
  index('location_data_country_code_idx').on(table.countryCode),
  index('location_data_region_idx').on(table.region),
  index('location_data_city_idx').on(table.city),
  index('location_data_continent_idx').on(table.continent),
]);