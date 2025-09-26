import { Hono } from "hono";
import { getSession } from "../../lib/auth-utils";
import {
  createOrganization,
  getOrganizationById,
  getUserOrganizations,
  createDefaultOrganizationForUser,
} from "./service";
import { withErrorHandling } from "../../utils";
import { corsMiddleware } from "../../lib/middleware";

const organizationRouter = new Hono();

/**
 * Apply CORS middleware for all organization endpoints.
 */
organizationRouter.use("*", corsMiddleware);

/**
 * Get user's organizations
 */
organizationRouter.get(
  "/",
  withErrorHandling(async (c) => {
    const session = await getSession(c);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const organizations = await getUserOrganizations(session.user.id);
    return c.json({ organizations });
  })
);

/**
 * Get organization by ID
 */
organizationRouter.get(
  "/:id",
  withErrorHandling(async (c) => {
    const session = await getSession(c);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const organizationId = c.req.param("id");
    const organization = await getOrganizationById(organizationId);

    if (!organization) {
      return c.json({ error: "Organization not found" }, 404);
    }

    // Check if user is a member of this organization
    const isMember = organization.members.some(
      (member) => member.userId === session.user.id && member.isActive
    );

    if (!isMember) {
      return c.json({ error: "Access denied" }, 403);
    }

    return c.json({ organization });
  })
);

/**
 * Create new organization
 */
organizationRouter.post(
  "/",
  withErrorHandling(async (c) => {
    const session = await getSession(c);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { name, description, timezone, currency, language } = body;

    if (!name) {
      return c.json({ error: "Organization name is required" }, 400);
    }

    const organization = await createOrganization({
      name,
      description,
      ownerId: session.user.id,
      timezone,
      currency,
      language,
    });

    return c.json({ organization }, 201);
  })
);

/**
 * Create default organization for current user (if they don't have one)
 */
organizationRouter.post(
  "/default",
  withErrorHandling(async (c) => {
    const session = await getSession(c);
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Check if user already has organizations
    const existingOrgs = await getUserOrganizations(session.user.id);
    if (existingOrgs.length > 0) {
      return c.json({ error: "User already has organizations" }, 400);
    }

    const organization = await createDefaultOrganizationForUser(
      session.user.id,
      session.user.name
    );

    return c.json({ organization }, 201);
  })
);

export { organizationRouter };
