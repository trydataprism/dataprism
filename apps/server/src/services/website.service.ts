import { db } from "../db";
import { websites } from "../db/schema";
import { eq, and } from "drizzle-orm";
import type { Website } from "../types";

export class WebsiteService {
  async validateWebsite(websiteId: string, requestOrigin?: string): Promise<Website | null> {
    const website = await db
      .select()
      .from(websites)
      .where(and(eq(websites.id, websiteId), eq(websites.isActive, true)))
      .limit(1);

    if (!website[0]) {
      return null;
    }

    // Domain validation
    if (requestOrigin) {
      const originDomain = new URL(requestOrigin).hostname;
      const allowedDomains = website[0].allowedDomains || [website[0].domain];

      const isDomainAllowed = allowedDomains.some((domain) => {
        // Exact match or subdomain match
        return originDomain === domain || originDomain.endsWith("." + domain);
      });

      if (!isDomainAllowed) {
        return null;
      }
    }

    return website[0];
  }

  async getWebsiteById(websiteId: string): Promise<Website | null> {
    const website = await db
      .select()
      .from(websites)
      .where(eq(websites.id, websiteId))
      .limit(1);

    return website[0] || null;
  }

  async isWebsiteActive(websiteId: string): Promise<boolean> {
    const website = await this.getWebsiteById(websiteId);
    return website?.isActive || false;
  }
}