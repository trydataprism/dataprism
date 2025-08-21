import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List } from "lucide-react";
import { AddNewButton } from "@/components/add-new-button";

export function SearchBar() {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-3 w-full max-w-3xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search websites..." className="pl-10" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="h-9 w-9">
            <List className="h-4 w-4" />
          </Button>
        </div>

        <AddNewButton />
      </div>
    </div>
  );
}
