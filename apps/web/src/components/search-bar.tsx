import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List } from "lucide-react";
import { AddNewButton } from "@/components/add-new-button";

export function SearchBar() {
  return (
    <div className="flex justify-center mt-auto mb-6">
      <div className="flex items-center gap-3 w-full max-w-4xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search Projects..." className="pl-10 h-10" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <List className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="h-10 w-10">
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="h-10 w-10">
            <div className="flex flex-col gap-0.5">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </Button>
        </div>

        <AddNewButton />
      </div>
    </div>
  );
}
