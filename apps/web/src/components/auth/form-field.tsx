import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormFieldProps {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  errors?: any;
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
      {errors && Array.isArray(errors) && errors.length > 0 && errors.map((error, index) => (
        <p
          key={index}
          className="text-xs text-destructive font-medium"
        >
          {typeof error === 'string' ? error : error?.message || 'Invalid input'}
        </p>
      ))}
    </div>
  );
}