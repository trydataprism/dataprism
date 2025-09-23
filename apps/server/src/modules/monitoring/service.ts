import { db } from "../../db";
import { realTimeVisitors } from "../../db/schema";
import { eq, and, sql } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../../config/analytics";
import type { TrackingData, RealTimeVisitor } from "../../types";

export async function updateRealTimeVisitor(
  websiteId: string,
  visitorId: string,
  sessionId: string,
  data: TrackingData
): Promise<void> {
  /**
   * Upsert the current visitor's real-time presence for a given website and session.
   *
   * - Creates a new record if none exists for the `(websiteId, visitorId)` pair.
   * - Updates the existing record with latest activity, path, and title.
   * - Extends the expiry window based on `ANALYTICS_CONFIG.REAL_TIME_EXPIRY_MINUTES`.
   *
   * @param websiteId The unique identifier of the website being tracked.
   * @param visitorId The unique identifier of the visitor (stable per device/browser).
   * @param sessionId The unique session identifier for the visitor.
   * @param data The tracking payload containing path, title, device and contextual info.
   * @returns Resolves when the record has been inserted or updated.
   */
  const expiresAt = new Date(
    Date.now() + ANALYTICS_CONFIG.REAL_TIME_EXPIRY_MINUTES * 60 * 1000
  );

  await db
    .insert(realTimeVisitors)
    .values({
      id: `${websiteId}-${visitorId}`,
      websiteId,
      visitorId,
      sessionId,
      currentPath: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
      currentTitle: data.title,
      entryPath: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
      lastActivity: new Date().toISOString(),
      pageViews: 1,
      device: data.device,
      browser: data.browser,
      country: data.country,
      referrer: data.referrer,
      isActive: true,
      expiresAt: expiresAt.toISOString(),
    })
    .onConflictDoUpdate({
      target: [realTimeVisitors.websiteId, realTimeVisitors.visitorId],
      set: {
        currentPath: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
        currentTitle: data.title,
        lastActivity: new Date().toISOString(),
        pageViews: sql`${realTimeVisitors.pageViews} + 1`,
        isActive: true,
        expiresAt: expiresAt.toISOString(),
      },
    });
}

export async function updateVisitorActivity(
  websiteId: string,
  sessionId: string,
  path?: string,
  title?: string
): Promise<void> {
  /**
   * Update an existing real-time visitor row referenced by `(websiteId, sessionId)`
   * with the latest activity data and extend the expiry time.
   *
   * @param websiteId The website identifier to scope the visitor.
   * @param sessionId The active session identifier for the visitor.
   * @param path Optional current path; defaults to the configured default path.
   * @param title Optional current page title.
   * @returns Resolves when the record has been updated.
   */
  const extendedExpiry = new Date(
    Date.now() + ANALYTICS_CONFIG.REAL_TIME_EXPIRY_MINUTES * 60 * 1000
  );

  await db
    .update(realTimeVisitors)
    .set({
      currentPath: path || ANALYTICS_CONFIG.DEFAULT_PATH,
      currentTitle: title,
      lastActivity: new Date().toISOString(),
      isActive: true,
      expiresAt: extendedExpiry.toISOString(),
    })
    .where(
      and(
        eq(realTimeVisitors.websiteId, websiteId),
        eq(realTimeVisitors.sessionId, sessionId)
      )
    );
}

export async function deactivateVisitor(
  websiteId: string,
  sessionId: string
): Promise<void> {
  /**
   * Soft-deactivate a visitor's real-time presence by marking `isActive = false`.
   * This is typically invoked when a session ends or the user leaves the site.
   *
   * @param websiteId The website identifier to scope the visitor.
   * @param sessionId The session identifier whose visitor should be deactivated.
   * @returns Resolves when the record has been updated.
   */
  await db
    .update(realTimeVisitors)
    .set({
      isActive: false,
      lastActivity: new Date().toISOString(),
    })
    .where(
      and(
        eq(realTimeVisitors.websiteId, websiteId),
        eq(realTimeVisitors.sessionId, sessionId)
      )
    );
}

export async function getActiveVisitors(
  websiteId: string
): Promise<{ visitors: RealTimeVisitor[]; count: number }> {
  /**
   * Return all currently active visitors for a website and a count, after pruning
   * expired rows. Rows whose `expiresAt` is in the past are deleted first.
   *
   * @param websiteId The website whose real-time visitors should be listed.
   * @returns A list of active visitors and the total count.
   */
  await db
    .delete(realTimeVisitors)
    .where(
      and(
        eq(realTimeVisitors.websiteId, websiteId),
        sql`${realTimeVisitors.expiresAt} < NOW()`
      )
    );

  const activeVisitors = await db
    .select()
    .from(realTimeVisitors)
    .where(
      and(
        eq(realTimeVisitors.websiteId, websiteId),
        eq(realTimeVisitors.isActive, true)
      )
    )
    .orderBy(sql`${realTimeVisitors.lastActivity} DESC`);

  return {
    visitors: activeVisitors,
    count: activeVisitors.length,
  };
}
