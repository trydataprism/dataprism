import { Poppins } from "next/font/google";
import { AppSidebar } from "@/components/sidebar";
import { BreadcrumbWrapper } from "@/components/breadcrumb-wrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.className}`}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <BreadcrumbWrapper />
            </div>
          </header>
          <div className="flex flex-1 flex-col pt-0 bg-muted/25 rounded-xl border border-muted/60 mb-5 mr-5">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
