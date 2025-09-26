import { db } from "../../db";
import {
  organizations,
  organizationMembers,
} from "../../db/schema/organization";
import { user } from "../../db/schema/auth";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Organization service for managing organizations and members
 */

export interface CreateOrganizationData {
  name: string;
  description?: string;
  ownerId: string;
  timezone?: string;
  currency?: string;
  language?: string;
}

export interface OrganizationWithMembers {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  ownerId: string;
  timezone: string;
  currency: string;
  language: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  members: Array<{
    id: string;
    userId: string;
    role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
    isActive: boolean;
    joinedAt: string;
  }>;
}

/**
 * Create a new organization with the user as owner
 */
export async function createOrganization(
  data: CreateOrganizationData
): Promise<OrganizationWithMembers> {
  const organizationId = nanoid();
  const slug = generateSlug(data.name);

  // Create organization
  const [newOrganization] = await db
    .insert(organizations)
    .values({
      id: organizationId,
      name: data.name,
      slug,
      description: data.description || null,
      ownerId: data.ownerId,
      timezone: data.timezone || "UTC",
      currency: data.currency || "USD",
      language: data.language || "en",
    })
    .returning();

  // Add owner as organization member
  const memberId = nanoid();
  await db.insert(organizationMembers).values({
    id: memberId,
    organizationId,
    userId: data.ownerId,
    role: "OWNER",
    isActive: true,
  });

  // Update user's default organization
  await db
    .update(user)
    .set({
      defaultOrganizationId: organizationId,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(user.id, data.ownerId));

  // Return organization with members
  return {
    ...newOrganization,
    members: [
      {
        id: memberId,
        userId: data.ownerId,
        role: "OWNER",
        isActive: true,
        joinedAt: newOrganization.createdAt,
      },
    ],
  };
}

/**
 * Get organization by ID with members
 */
export async function getOrganizationById(
  organizationId: string
): Promise<OrganizationWithMembers | null> {
  // Get organization
  const org = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  if (org.length === 0) return null;

  // Get members
  const members = await db
    .select()
    .from(organizationMembers)
    .where(
      and(
        eq(organizationMembers.organizationId, organizationId),
        eq(organizationMembers.isActive, true)
      )
    );

  return {
    ...org[0],
    members: members.map((member) => ({
      id: member.id,
      userId: member.userId,
      role: member.role,
      isActive: member.isActive,
      joinedAt: member.joinedAt,
    })),
  };
}

/**
 * Get user's organizations
 */
export async function getUserOrganizations(
  userId: string
): Promise<OrganizationWithMembers[]> {
  // Get user's organization memberships
  const userMemberships = await db
    .select()
    .from(organizationMembers)
    .where(eq(organizationMembers.userId, userId));

  const userOrganizations: OrganizationWithMembers[] = [];

  for (const membership of userMemberships) {
    // Get organization details
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, membership.organizationId))
      .limit(1);

    if (org.length === 0) continue;

    // Get all members of this organization
    const members = await db
      .select()
      .from(organizationMembers)
      .where(
        and(
          eq(organizationMembers.organizationId, membership.organizationId),
          eq(organizationMembers.isActive, true)
        )
      );

    userOrganizations.push({
      ...org[0],
      members: members.map((member) => ({
        id: member.id,
        userId: member.userId,
        role: member.role,
        isActive: member.isActive,
        joinedAt: member.joinedAt,
      })),
    });
  }

  return userOrganizations;
}

/**
 * Generate URL-friendly slug from organization name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

/**
 * Create default organization for new user
 */
export async function createDefaultOrganizationForUser(
  userId: string,
  userName: string
): Promise<OrganizationWithMembers> {
  const defaultName = `${userName}'s Organization`;

  return createOrganization({
    name: defaultName,
    description: `Personal organization for ${userName}`,
    ownerId: userId,
  });
}
