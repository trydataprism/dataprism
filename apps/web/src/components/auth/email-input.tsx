import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        className="h-10 text-sm border-0 bg-muted"
        {...props}
      />
    );
  }
);