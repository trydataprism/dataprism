import { db } from "../db";
import { realTimeVisitors } from "../db/schema";
import { eq, and, sql } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../constants";
import type { TrackingData, RealTimeVisitor } from "../types";

export class RealtimeService {
  async updateRealTimeVisitor(
    websiteId: string,
    visitorId: string,
    sessionId: string,
    data: TrackingData
  ): Promise<void> {
    try {
      const expiresAt = new Date(Date.now() + ANALYTICS_CONFIG.REAL_TIME_EXPIRY_MINUTES * 60 * 1000);

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
    } catch (error) {
      console.error("Error updating real-time visitor:", error);
      // Don't throw here, real-time tracking is not critical
    }
  }

  async updateVisitorActivity(
    websiteId: string,
    sessionId: string,
    path?: string,
    title?: string
  ): Promise<void> {
    const extendedExpiry = new Date(Date.now() + ANALYTICS_CONFIG.REAL_TIME_EXPIRY_MINUTES * 60 * 1000);

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

  async deactivateVisitor(websiteId: string, sessionId: string): Promise<void> {
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

  async getActiveVisitors(websiteId: string): Promise<{ visitors: RealTimeVisitor[]; count: number }> {
    // Clean up expired visitors first
    await db
      .delete(realTimeVisitors)
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          sql`${realTimeVisitors.expiresAt} < NOW()`
        )
      );

    // Get active visitors
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

  async cleanupExpiredVisitors(websiteId: string): Promise<void> {
    await db
      .delete(realTimeVisitors)
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          sql`${realTimeVisitors.expiresAt} < NOW()`
        )
      );
  }
}