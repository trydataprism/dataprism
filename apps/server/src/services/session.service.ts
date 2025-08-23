import { db } from "../db";
import { userSessions, pageViews, events } from "../db/schema";
import { eq, and, count } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../constants";
import type { TrackingData, UserSession } from "../types";

export class SessionService {
  async getOrCreateSession(
    websiteId: string,
    visitorId: string,
    sessionId: string,
    data: TrackingData
  ): Promise<UserSession> {
    try {
      // Try to find existing session
      const existingSession = await db
        .select()
        .from(userSessions)
        .where(
          and(
            eq(userSessions.id, sessionId),
            eq(userSessions.websiteId, websiteId)
          )
        )
        .limit(1);

      if (existingSession.length > 0) {
        return existingSession[0];
      }

      // Create new session
      const newSession = await db
        .insert(userSessions)
        .values({
          id: sessionId,
          websiteId,
          visitorId,
          startTime: new Date(data.timestamp || Date.now()),
          entryPage: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
          device: (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") || "UNKNOWN",
          browser: data.browser,
          os: data.os,
          country: data.country,
          referrer: data.referrer,
        })
        .returning();

      return newSession[0];
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  async updateSessionPageViews(sessionId: string): Promise<void> {
    const pageViewCount = await db
      .select({ count: count() })
      .from(pageViews)
      .where(eq(pageViews.sessionId, sessionId));

    await db
      .update(userSessions)
      .set({
        pageViews: pageViewCount[0]?.count || 1,
      })
      .where(eq(userSessions.id, sessionId));
  }

  async updateSessionEventCount(sessionId: string): Promise<void> {
    const eventCount = await db
      .select({ count: count() })
      .from(events)
      .where(eq(events.sessionId, sessionId));

    await db
      .update(userSessions)
      .set({
        pageViews: eventCount[0]?.count || 1,
      })
      .where(eq(userSessions.id, sessionId));
  }

  async endSession(websiteId: string, sessionId: string): Promise<void> {
    await db
      .update(userSessions)
      .set({
        endTime: new Date(),
      })
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      );
  }

  async updateHeartbeat(websiteId: string, sessionId: string, path: string): Promise<void> {
    await db
      .update(userSessions)
      .set({
        exitPage: path || ANALYTICS_CONFIG.DEFAULT_PATH,
      })
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      );
  }

  async getSession(websiteId: string, sessionId: string): Promise<UserSession | null> {
    const session = await db
      .select()
      .from(userSessions)
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      )
      .limit(1);

    return session[0] || null;
  }
}