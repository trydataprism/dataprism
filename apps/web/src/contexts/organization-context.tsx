"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useDefaultOrganization } from "@/hooks/use-organizations";

interface OrganizationContextType {
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (id: string | null) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

interface OrganizationProviderProps {
  children: ReactNode;
}

export function OrganizationProvider({ children }: OrganizationProviderProps) {
  const { organization: defaultOrganization } = useDefaultOrganization();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(null);

  // Set default organization when it loads
  useEffect(() => {
    if (defaultOrganization && !selectedOrganizationId) {
      setSelectedOrganizationId(defaultOrganization.id);
    }
  }, [defaultOrganization, selectedOrganizationId]);

  return (
    <OrganizationContext.Provider
      value={{
        selectedOrganizationId,
        setSelectedOrganizationId,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganizationContext() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationContext must be used within an OrganizationProvider"
    );
  }
  return context;
}
