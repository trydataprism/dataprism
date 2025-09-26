import { authClient } from "./auth-client";

export interface Organization {
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

export interface CreateOrganizationData {
  name: string;
  description?: string;
  timezone?: string;
  currency?: string;
  language?: string;
}

class OrganizationClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const session = await authClient.getSession();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  async getOrganizations(): Promise<{ organizations: Organization[] }> {
    return this.request("/api/organizations");
  }

  async getOrganization(id: string): Promise<{ organization: Organization }> {
    return this.request(`/api/organizations/${id}`);
  }

  async createOrganization(
    data: CreateOrganizationData
  ): Promise<{ organization: Organization }> {
    return this.request("/api/organizations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createDefaultOrganization(): Promise<{ organization: Organization }> {
    return this.request("/api/organizations/default", {
      method: "POST",
    });
  }
}

export const organizationClient = new OrganizationClient();
