import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormFieldProps {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  errors?: Array<{ message?: string }>;
}

export function FormField({ label, htmlFor, required, children, errors }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {typeof label === "string" ? (
        <Label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      ) : (
        <div className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </div>
      )}
      {children}
      {errors?.map((error) => (
        <p
          key={error?.message}
          className="text-xs text-destructive font-medium"
        >
          {error?.message}
        </p>
      ))}
    </div>
  );
}