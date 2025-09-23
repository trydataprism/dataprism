import { db } from "../../db";
import { websites } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import type { Website } from "../../types";

export async function validateWebsite(
  websiteId: string,
  requestOrigin?: string
): Promise<Website | null> {
  /**
   * Validate that a website exists, is active, and optionally that the
   * `requestOrigin` domain is allowed for this website.
   *
   * The origin hostname must either match the primary domain or one of the
   * `allowedDomains` entries (including subdomain matches).
   *
   * @param websiteId The unique website identifier.
   * @param requestOrigin Optional Origin/Referer URL string to validate domain.
   * @returns The website row when valid; otherwise `null`.
   */
  const website = await db
    .select()
    .from(websites)
    .where(and(eq(websites.id, websiteId), eq(websites.isActive, true)))
    .limit(1);

  if (!website[0]) {
    return null;
  }

  if (requestOrigin) {
    const originDomain = new URL(requestOrigin).hostname;
    const allowedDomains = website[0].allowedDomains || [website[0].domain];

    const isDomainAllowed = allowedDomains.some((domain) => {
      return originDomain === domain || originDomain.endsWith("." + domain);
    });

    if (!isDomainAllowed) {
      return null;
    }
  }

  return website[0];
}

export async function getWebsiteById(
  websiteId: string
): Promise<Website | null> {
  /**
   * Retrieve a website by its identifier.
   *
   * @param websiteId The website identifier to look up.
   * @returns The website when found; otherwise `null`.
   */
  const website = await db
    .select()
    .from(websites)
    .where(eq(websites.id, websiteId))
    .limit(1);

  return website[0] || null;
}

export async function isWebsiteActive(websiteId: string): Promise<boolean> {
  /**
   * Determine whether a website is active.
   *
   * @param websiteId The website identifier.
   * @returns `true` if active; otherwise `false`.
   */
  const website = await getWebsiteById(websiteId);
  return website?.isActive || false;
}
