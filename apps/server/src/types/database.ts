// Re-export database types from schemas
export type {
  User,
  NewUser,
  Session,
  NewSession,
  Account,
  NewAccount,
  Verification,
  NewVerification,
} from "../db/schema/auth";

// Website and analytics types (based on schema structure)
export interface Website {
  id: string;
  domain: string;
  allowedDomains?: string[] | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  websiteId: string;
  visitorId: string;
  startTime: Date;
  endTime?: Date | null;
  entryPage: string;
  exitPage?: string | null;
  pageViews?: number;
  device: string | null;
  browser?: string | null;
  os?: string | null;
  country?: string | null;
  referrer?: string | null;
}

export interface PageView {
  websiteId: string;
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  device: string | null;
  browser?: string;
  os?: string;
  country?: string;
  timestamp: Date;
}

export interface Event {
  websiteId: string;
  visitorId: string;
  sessionId: string;
  eventType: string;
  eventName: string;
  path: string;
  properties?: string;
  timestamp: Date;
}

export interface RealTimeVisitor {
  id: string;
  websiteId: string;
  visitorId: string;
  sessionId: string;
  currentPath: string;
  currentTitle?: string | null;
  entryPath: string;
  lastActivity: string;
  pageViews: number;
  device?: string | null;
  browser?: string | null;
  country?: string | null;
  referrer?: string | null;
  isActive: boolean;
  expiresAt: string;
}