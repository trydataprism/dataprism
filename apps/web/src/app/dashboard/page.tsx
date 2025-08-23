import { DashboardHeader } from "@/components/dashboard-header";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col pt-0 bg-muted/25 rounded-xl border border-muted/60 mb-5 mr-5">
      <DashboardHeader />
    </div>
  );
}
