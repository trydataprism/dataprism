import { pgTable, text, timestamp, integer, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

export const deviceCategory = pgEnum('device_category', [
  'DESKTOP',
  'MOBILE',
  'TABLET',
  'UNKNOWN'
]);

export const utmCampaigns = pgTable('utm_campaigns', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  source: text('source').notNull(),
  medium: text('medium').notNull(),
  campaign: text('campaign').notNull(),
  
  name: text('name').notNull(),
  
  totalVisitors: integer('total_visitors').default(0).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('utm_campaigns_website_source_medium_campaign_unique')
    .on(table.websiteId, table.source, table.medium, table.campaign),
  index('utm_campaigns_website_id_idx').on(table.websiteId),
  index('utm_campaigns_source_idx').on(table.source),
]);

export const referrerDomains = pgTable('referrer_domains', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  domain: text('domain').notNull(),
  category: text('category'), // social, search, direct
  
  totalReferrals: integer('total_referrals').default(0).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('referrer_domains_website_domain_unique').on(table.websiteId, table.domain),
  index('referrer_domains_website_id_idx').on(table.websiteId),
  index('referrer_domains_category_idx').on(table.category),
]);

export const deviceInfo = pgTable('device_info', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  category: deviceCategory('category').notNull(),
  browser: text('browser').notNull(),
  os: text('os').notNull(),
  
  totalSessions: integer('total_sessions').default(0).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('device_info_website_browser_os_unique').on(table.websiteId, table.browser, table.os),
  index('device_info_website_id_idx').on(table.websiteId),
  index('device_info_category_idx').on(table.category),
]);

export const locationData = pgTable('location_data', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  country: text('country').notNull(),
  region: text('region'),
  city: text('city'),
  
  totalVisitors: integer('total_visitors').default(0).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('location_data_website_country_region_city_unique')
    .on(table.websiteId, table.country, table.region, table.city),
  index('location_data_website_id_idx').on(table.websiteId),
  index('location_data_country_idx').on(table.country),
]);

export type UTMCampaign = typeof utmCampaigns.$inferSelect;
export type NewUTMCampaign = typeof utmCampaigns.$inferInsert;
export type ReferrerDomain = typeof referrerDomains.$inferSelect;
export type NewReferrerDomain = typeof referrerDomains.$inferInsert;
export type DeviceInfo = typeof deviceInfo.$inferSelect;
export type NewDeviceInfo = typeof deviceInfo.$inferInsert;
export type LocationData = typeof locationData.$inferSelect;
export type NewLocationData = typeof locationData.$inferInsert;