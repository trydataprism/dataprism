"use client";

import dynamic from "next/dynamic";

const DynamicBreadcrumb = dynamic(
  () => import("@/components/dynamic-breadcrumb").then((mod) => ({
    default: mod.DynamicBreadcrumb,
  })),
  { ssr: false }
);

export function BreadcrumbWrapper() {
  return <DynamicBreadcrumb />;
}