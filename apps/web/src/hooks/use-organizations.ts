import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { useOrganizationContext } from "@/contexts/organization-context";
import { config } from "@/lib/config";

// Types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
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
const fetchOrganizations = (): Promise<{ organizations: Organization[] }> =>
  apiRequest("/organizations");

const fetchOrganizationById = (
  id: string
): Promise<{ organization: Organization }> =>
  apiRequest(`/organizations/${id}`);

const createOrganization = (
  data: CreateOrganizationData
): Promise<{ organization: Organization }> =>
  apiRequest("/organizations", {
    method: "POST",
    body: JSON.stringify(data),
  });

const createDefaultOrganization = (): Promise<{ organization: Organization }> =>
  apiRequest("/organizations/default", {
    method: "POST",
  });

// Query keys for consistency
export const organizationKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...organizationKeys.lists(), { filters }] as const,
  details: () => [...organizationKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,
};

// Common query options
const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
};

// Hooks
export function useOrganizations() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: organizationKeys.lists(),
    queryFn: fetchOrganizations,
    enabled: !!session?.user,
    ...defaultQueryOptions,
  });
}

export function useOrganization(id: string) {
  const { data: session } = useSession();

  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => fetchOrganizationById(id),
    enabled: !!session?.user && !!id,
    ...defaultQueryOptions,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}

export function useCreateDefaultOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDefaultOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.all });
    },
  });
}

// Helper hook to get the default organization
export function useDefaultOrganization() {
  const { data: organizationsData, isLoading, error } = useOrganizations();

  const defaultOrganization = organizationsData?.organizations?.[0] || null;

  return {
    organization: defaultOrganization,
    isLoading,
    error,
  };
}

// Hook to get the currently selected organization
export function useCurrentOrganization() {
  const { selectedOrganizationId } = useOrganizationContext();
  const { data: organizationsData } = useOrganizations();

  const currentOrganization =
    organizationsData?.organizations?.find(
      (org) => org.id === selectedOrganizationId
    ) || null;

  return currentOrganization;
}

// Utility hook for organization selection
export function useOrganizationSelection() {
  const { selectedOrganizationId, setSelectedOrganizationId } =
    useOrganizationContext();
  const { data: organizationsData, isLoading } = useOrganizations();

  const organizations = organizationsData?.organizations || [];
  const selectedOrganization = organizations.find(
    (org) => org.id === selectedOrganizationId
  );

  return {
    organizations,
    selectedOrganization,
    selectedOrganizationId,
    setSelectedOrganizationId,
    isLoading,
  };
}
