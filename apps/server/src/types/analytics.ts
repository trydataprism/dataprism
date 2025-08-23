export interface TrackingData {
  websiteId: string;
  visitorId: string;
  sessionId: string;
  timestamp?: number;
  path?: string;
  title?: string;
  referrer?: string;
  referrerDomain?: string;
  hostname?: string;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  region?: string;
  city?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface EventData extends TrackingData {
  eventType?: string;
  eventName?: string;
  properties?: Record<string, any>;
}

export interface SessionEndData {
  websiteId: string;
  sessionId: string;
  duration?: number;
  endReason?: string;
}

export interface HeartbeatData {
  websiteId: string;
  sessionId: string;
  path?: string;
  title?: string;
}

export interface ErrorData {
  websiteId: string;
  visitorId?: string;
  sessionId?: string;
  level?: string;
  source?: string;
  message?: string;
  path?: string;
  context?: string;
  browser?: string;
  os?: string;
  timestamp?: number;
}

export interface GeolocationData {
  country_code: string;
  region: string;
  city: string;
}

export interface RealTimeVisitorResponse {
  visitors: any[];
  count: number;
  timestamp: string;
}

export interface SessionResponse {
  session: any;
  timestamp: string;
}