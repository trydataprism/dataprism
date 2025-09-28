import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { config } from "@/lib/config";

// Types
export interface Website {
  id: string;
  organizationId: string;
  userId: string;
  domain: string;
  name: string;
  description?: string;
  favicon?: string;
  timezone: string;
  currency: string;
  language: string;
  isPublic: boolean;
  trackingMode: "STANDARD" | "PRIVACY_FOCUSED";
  trackingId: string;
  publicKey: string;
  secretKey: string;
  status: "PENDING_VERIFICATION" | "VERIFIED" | "SUSPENDED" | "DELETED";
  isActive: boolean;
  isVerified: boolean;
  verifiedAt?: string;
  sessionTimeout: number;
  bounceRate: number;
  excludeIps?: string[];
  excludePaths?: string[];
  allowedDomains?: string[];
  botFiltering: boolean;
  spamFiltering: boolean;
  settings?: string;
  metadata?: string;
  lastEventAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// API helper functions
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${config.api.fullUrl}${endpoint}`;

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.json();
};

// API functions
const fetchWebsitesByOrganization = (
  organizationId: string
): Promise<{ websites: Website[] }> =>
  apiRequest(`/websites/organization/${organizationId}`);

// Query keys for consistency
export const websiteKeys = {
  all: ["websites"] as const,
  lists: () => [...websiteKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...websiteKeys.lists(), { filters }] as const,
  byOrganization: (organizationId: string) =>
    [...websiteKeys.all, "organization", organizationId] as const,
};

// Common query options
const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
};

// Hooks
export function useWebsitesByOrganization(organizationId: string | null) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: websiteKeys.byOrganization(organizationId || ""),
    queryFn: () => fetchWebsitesByOrganization(organizationId!),
    enabled: !!session?.user && !!organizationId,
    ...defaultQueryOptions,
  });
}
