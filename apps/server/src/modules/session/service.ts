import { db } from "../../db";
import { userSessions, pageViews, events } from "../../db/schema";
import { eq, and, count } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../../config/analytics";
import type { TrackingData, UserSession } from "../../types";

export async function getOrCreateSession(
  websiteId: string,
  visitorId: string,
  sessionId: string,
  data: TrackingData
): Promise<UserSession> {
  /**
   * Fetch an existing session by `(sessionId, websiteId)` or create a new one.
   *
   * When creating a new session, it initializes metadata such as entry page,
   * device, browser, OS, country and referrer based on the provided tracking
   * payload.
   *
   * @param websiteId The website identifier the session belongs to.
   * @param visitorId The stable visitor identifier for this browser/device.
   * @param sessionId The unique session identifier.
   * @param data The tracking payload with context such as path, device, etc.
   * @returns The existing or newly created `UserSession` row.
   */
  const existingSession = await db
    .select()
    .from(userSessions)
    .where(
      and(eq(userSessions.id, sessionId), eq(userSessions.websiteId, websiteId))
    )
    .limit(1);

  if (existingSession.length > 0) {
    return existingSession[0];
  }

  const newSession = await db
    .insert(userSessions)
    .values({
      id: sessionId,
      websiteId,
      visitorId,
      startTime: new Date(data.timestamp || Date.now()),
      entryPage: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
      device:
        (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") ||
        "UNKNOWN",
      browser: data.browser,
      os: data.os,
      country: data.country,
      referrer: data.referrer,
    })
    .returning();

  return newSession[0];
}

export async function updateSessionPageViews(sessionId: string): Promise<void> {
  /**
   * Recalculate and persist the number of page views for a given session by
   * counting related rows in the `pageViews` table.
   *
   * @param sessionId The session whose page view count should be updated.
   * @returns Resolves when the update completes.
   */
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

export async function updateSessionEventCount(
  sessionId: string
): Promise<void> {
  /**
   * Recalculate and persist the number of events for a given session by
   * counting related rows in the `events` table.
   *
   * @param sessionId The session whose event count should be updated.
   * @returns Resolves when the update completes.
   */
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

export async function endSession(
  websiteId: string,
  sessionId: string
): Promise<void> {
  /**
   * Mark a session as ended by setting its `endTime` to now.
   *
   * @param websiteId The website identifier to scope the session.
   * @param sessionId The session identifier to end.
   * @returns Resolves when the session has been updated.
   */
  await db
    .update(userSessions)
    .set({
      endTime: new Date(),
    })
    .where(
      and(eq(userSessions.id, sessionId), eq(userSessions.websiteId, websiteId))
    );
}

export async function updateHeartbeat(
  websiteId: string,
  sessionId: string,
  path: string
): Promise<void> {
  /**
   * Record the latest known path for the session as a heartbeat signal.
   * The path is stored as the `exitPage` until a new heartbeat or session end.
   *
   * @param websiteId The website identifier to scope the session.
   * @param sessionId The session identifier to update.
   * @param path The current path to persist as the exit page.
   * @returns Resolves when the update completes.
   */
  await db
    .update(userSessions)
    .set({
      exitPage: path || ANALYTICS_CONFIG.DEFAULT_PATH,
    })
    .where(
      and(eq(userSessions.id, sessionId), eq(userSessions.websiteId, websiteId))
    );
}

export async function getSession(
  websiteId: string,
  sessionId: string
): Promise<UserSession | null> {
  /**
   * Retrieve a single session by `(websiteId, sessionId)`.
   *
   * @param websiteId The website identifier.
   * @param sessionId The session identifier.
   * @returns The `UserSession` if found; otherwise `null`.
   */
  const session = await db
    .select()
    .from(userSessions)
    .where(
      and(eq(userSessions.id, sessionId), eq(userSessions.websiteId, websiteId))
    )
    .limit(1);

  return session[0] || null;
}
