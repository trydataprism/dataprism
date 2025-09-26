// Main export file for all database schemas

// === CORE SCHEMAS ===
export * from "./auth";
export * from "./website";
export * from "./organization";
export * from "./analytics";
export * from "./reference";
export * from "./notifications";
export * from "./monitoring";
// export * from "./materialized-views"; // Temporarily disabled due to view name conflicts

// Import all tables for establishing relationships
import { user } from "./auth";
import { websites } from "./website";
import {
  organizations,
  organizationMembers,
  organizationInvitations,
} from "./organization";
import { pageViews, userSessions, events } from "./analytics";
import {
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
} from "./reference";
import { alerts, notifications } from "./notifications";
import { errorLogs, realTimeVisitors } from "./monitoring";
import { dataExports } from "./utility";

// Export grouped table collections for easier imports
export const authTables = { user };
export const organizationTables = {
  organizations,
  organizationMembers,
  organizationInvitations,
};
export const websiteTables = { websites };
export const analyticsTables = { pageViews, userSessions, events };
export const referenceDataTables = {
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
};

export const notificationTables = {
  alerts,
  notifications,
};

export const monitoringTables = {
  errorLogs,
  realTimeVisitors,
};

export const utilityTables = {
  dataExports,
};

// All tables in one object for convenience
export const allTables = {
  user,
  websites,
  organizations,
  organizationMembers,
  organizationInvitations,
  pageViews,
  userSessions,
  events,
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
  alerts,
  notifications,
  errorLogs,
  realTimeVisitors,
  dataExports,
};

// Type definitions for better TypeScript support
export type UserTable = typeof user;
export type WebsiteTable = typeof websites;
export type OrganizationTable = typeof organizations;
export type OrganizationMemberTable = typeof organizationMembers;
export type OrganizationInvitationTable = typeof organizationInvitations;
export type PageViewTable = typeof pageViews;
export type SessionTable = typeof userSessions;
export type EventTable = typeof events;
export type UTMCampaignTable = typeof utmCampaigns;
export type ReferrerDomainTable = typeof referrerDomains;
export type DeviceInfoTable = typeof deviceInfo;
export type LocationDataTable = typeof locationData;
export type AlertTable = typeof alerts;
export type NotificationTable = typeof notifications;
export type ErrorLogTable = typeof errorLogs;
export type RealTimeVisitorTable = typeof realTimeVisitors;

// Schema version for migrations
export const SCHEMA_VERSION = "1.0.0";

// Database configuration constants
export const DATABASE_CONFIG = {
  maxConnections: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
} as const;
