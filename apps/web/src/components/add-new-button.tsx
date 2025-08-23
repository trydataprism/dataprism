"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { z } from "zod";
import { FormField } from "@/components/auth/form-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const websiteSchema = z.object({
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters"),
  domain: z
    .string()
    .min(1, "Domain is required")
    .refine(
      (val) => val.includes("."),
      "Domain must contain a dot (e.g., example.com)"
    ),
});

export function AddNewButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [domain, setDomain] = useState("");
  const [errors, setErrors] = useState<{
    projectName?: string[];
    domain?: string[];
  }>({});

  const validateForm = () => {
    try {
      websiteSchema.parse({ projectName, domain });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: { projectName?: string[]; domain?: string[] } = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as string;
          if (fieldName === "projectName" && !formErrors.projectName) {
            formErrors.projectName = [err.message];
          } else if (fieldName === "domain" && !formErrors.domain) {
            formErrors.domain = [err.message];
          }
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Creating website:", {
        projectName,
        domain: `https://${domain}`,
      });
      setIsOpen(false);
      setProjectName("");
      setDomain("");
      setErrors({});
    }
  };

  return (
    <>
      <Button
        className="bg-white hover:bg-white/90 border border-input text-black/80 shadow-xs h-8 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Create Website
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Website</DialogTitle>
            <DialogDescription>
              Add a new website to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <FormField
              label="Name"
              htmlFor="project-name"
              errors={errors.projectName}
            >
              <Input
                id="project-name"
                placeholder="Enter your project's name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </FormField>

            <FormField label="Domain" htmlFor="domain" errors={errors.domain}>
              <div className="flex items-stretch">
                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted/60 rounded-l-md select-none border-r border-border/50">
                  https://
                </span>
                <Input
                  id="domain"
                  className="rounded-l-none border-l-0"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button className="cursor-pointer" onClick={handleSubmit}>
              Create Website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
