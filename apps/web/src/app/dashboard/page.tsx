import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col pt-0 bg-muted/25 rounded-xl border border-muted/60 mb-5 mr-5">
      {/* Header Section */}
      <div className="w-full rounded-t-xl p-4 border-b border-muted/60">
        <div className="flex items-center justify-between">
          {/* Left side - Title and description */}
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">Web Analytics</span>
            <span className="text-muted-foreground text-sm">
              Automatically created for your websites
            </span>
          </div>

          {/* Right side - Search and Create Website button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="All Branches..."
                className="pl-10 h-8 w-48 border-muted/60 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
              />
            </div>

            <Button className="bg-white hover:bg-white/90 border border-input text-black/80 shadow-xs h-8">
              <Plus className="h-4 w-4 mr-2" />
              Create Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
