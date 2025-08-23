import { z } from "zod";

export const trackingDataSchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
  visitorId: z.string().min(1, "Visitor ID is required"),
  sessionId: z.string().min(1, "Session ID is required"),
  timestamp: z.number().optional(),
  path: z.string().optional().default("/"),
  title: z.string().optional(),
  referrer: z.string().optional(),
  referrerDomain: z.string().optional(),
  hostname: z.string().optional(),
  device: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const eventDataSchema = trackingDataSchema.merge(z.object({
  eventType: z.string().optional().default("CUSTOM"),
  eventName: z.string().optional().default("custom_event"),
  properties: z.record(z.string(), z.any()).optional(),
}));

export const sessionEndSchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
  sessionId: z.string().min(1, "Session ID is required"),
  duration: z.number().optional(),
  endReason: z.string().optional(),
});

export const heartbeatSchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
  sessionId: z.string().min(1, "Session ID is required"),
  path: z.string().optional().default("/"),
  title: z.string().optional(),
});

export const errorDataSchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
  visitorId: z.string().optional(),
  sessionId: z.string().optional(),
  level: z.string().optional().default("ERROR"),
  source: z.string().optional().default("client"),
  message: z.string().optional().default("Unknown error"),
  path: z.string().optional().default("/"),
  context: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  timestamp: z.number().optional(),
});

export const websiteIdParamSchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
});

export const sessionQuerySchema = z.object({
  websiteId: z.string().min(1, "Website ID is required"),
  sessionId: z.string().min(1, "Session ID is required"),
});

export type TrackingDataInput = z.infer<typeof trackingDataSchema>;
export type EventDataInput = z.infer<typeof eventDataSchema>;
export type SessionEndInput = z.infer<typeof sessionEndSchema>;
export type HeartbeatInput = z.infer<typeof heartbeatSchema>;
export type ErrorDataInput = z.infer<typeof errorDataSchema>;