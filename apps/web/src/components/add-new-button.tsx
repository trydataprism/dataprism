"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function AddNewButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        className="bg-white hover:bg-white/90 border border-input text-black/80 shadow-xs"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Add New
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Website</DialogTitle>
            <DialogDescription>
              Add a new website to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {/* Modal content will go here */}
            <p className="text-sm text-muted-foreground">
              Modal content placeholder
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}