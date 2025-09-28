import { Hono } from "hono";
import { getSession } from "../../lib/auth-utils";
import { withErrorHandling } from "../../utils";
import { corsMiddleware } from "../../lib/middleware";
import { getWebsitesByOrganizationId } from "./service";

const websiteRouter = new Hono();

// Apply CORS middleware to all routes
websiteRouter.use("*", corsMiddleware);

/**
 * Get websites by organization ID
 */
websiteRouter.get(
  "/organization/:organizationId",
  withErrorHandling(async (c) => {
    const session = await getSession(c);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const organizationId = c.req.param("organizationId");
    const websites = await getWebsitesByOrganizationId(organizationId);

    return c.json({ websites });
  })
);

export { websiteRouter };
