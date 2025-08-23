"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface DynamicBreadcrumbProps {
  items?: BreadcrumbItemType[];
  showLogo?: boolean;
}

const pathSegmentToLabel = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function DynamicBreadcrumbClient({
  items,
  showLogo = true,
}: DynamicBreadcrumbProps) {
  const pathname = usePathname();

  let breadcrumbItems: BreadcrumbItemType[] = [];

  if (items) {
    breadcrumbItems = items;
  } else {
    const pathSegments = pathname.split("/").filter(Boolean);

    breadcrumbItems = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      return {
        label: pathSegmentToLabel(segment),
        href: isLast ? undefined : href,
      };
    });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showLogo && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/">Dataprism</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {showLogo && index === 0 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
            <BreadcrumbItem className={index > 0 ? "hidden md:block" : ""}>
              {!item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { DynamicBreadcrumbClient as DynamicBreadcrumb };
