// Main export file for all database schemas
// This file exports all tables and enums from the analytics platform

// === AUTH & USER MANAGEMENT ===
export * from "./auth";

// === WEBSITE TEAM MANAGEMENT ===
export * from "./team";

// === PLANS & BILLING ===
export * from "./billing";

// === WEBSITE MANAGEMENT ===
export * from "./website";

// === ANALYTICS CORE ===
export * from "./analytics";

// === ANALYTICS REFERENCE DATA ===
export * from "./reference";

// === GOALS & FUNNELS ===
export * from "./goals";

// === AI FEATURES ===
export * from "./ai";

// === ALERTS & NOTIFICATIONS ===
export * from "./notifications";

// === PERFORMANCE & MONITORING ===
export * from "./monitoring";

// === BUSINESS INTELLIGENCE ===
export * from "./intelligence";

// === UTILITY & PERFORMANCE ===
export * from "./utility";

// === MATERIALIZED VIEWS ===
export * from "./materialized-views";

// === TABLE RELATIONSHIPS & CONSTRAINTS ===
// Import all tables for establishing relationships
import { user } from "./auth";
import { websites } from "./website";
import { websiteMembers, websiteInvitations } from "./team";
import { plans, subscriptions, usage, paymentMethods } from "./billing";
import { pageViews, userSessions, events } from "./analytics";
import {
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
} from "./reference";
import { goals, funnelDefinitions, funnelGoals } from "./goals";
import { aiTokens, aiUsage } from "./ai";
import { alerts, notifications } from "./notifications";
import { errorLogs, realTimeVisitors } from "./monitoring";
import {
  conversionPaths,
  cohortAnalysis,
  retentionStats,
} from "./intelligence";
import { exports } from "./utility";

// Export grouped table collections for easier imports
export const authTables = {
  user,
};

export const teamTables = {
  websiteMembers,
  websiteInvitations,
};

export const billingTables = {
  plans,
  subscriptions,
  usage,
  paymentMethods,
};

export const websiteTables = {
  websites,
};

export const analyticsTables = {
  pageViews,
  userSessions,
  events,
};

export const referenceDataTables = {
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
};

export const goalsTables = {
  goals,
  funnelDefinitions,
  funnelGoals,
};

export const aiTables = {
  aiTokens,
  aiUsage,
};

export const notificationTables = {
  alerts,
  notifications,
};

export const monitoringTables = {
  errorLogs,
  realTimeVisitors,
};

export const intelligenceTables = {
  conversionPaths,
  cohortAnalysis,
  retentionStats,
};

export const utilityTables = {
  exports,
};

// All tables in one object for convenience
export const allTables = {
  // Auth & User Management
  user,

  // Team Management
  websiteMembers,
  websiteInvitations,

  // Billing
  plans,
  subscriptions,
  usage,
  paymentMethods,

  // Websites
  websites,

  // Analytics Core
  pageViews,
  userSessions,
  events,

  // Reference Data
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,

  // Goals & Funnels
  goals,
  funnelDefinitions,
  funnelGoals,

  // AI Features
  aiTokens,
  aiUsage,

  // Notifications
  alerts,
  notifications,

  // Monitoring
  errorLogs,
  realTimeVisitors,

  // Business Intelligence
  conversionPaths,
  cohortAnalysis,
  retentionStats,

  // Utility
  exports,
};

// Type definitions for better TypeScript support
export type UserTable = typeof user;
export type WebsiteTable = typeof websites;
export type PageViewTable = typeof pageViews;
export type SessionTable = typeof userSessions;
export type EventTable = typeof events;

// Schema version for migrations
export const SCHEMA_VERSION = "1.0.0";

// Database configuration constants
export const DATABASE_CONFIG = {
  maxConnections: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
} as const;
