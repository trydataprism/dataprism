"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { AuthLayout, FormField, EmailInput } from "@/components/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.forgetPassword({
          email: value.email,
          redirectTo: "/enter-code",
        });
        setIsSubmitted(true);
        // Store email securely in session storage instead of URL
        sessionStorage.setItem('reset_email', btoa(value.email));
        toast.success("Password reset email sent");
        router.push('/enter-code');
      } catch (error: any) {
        toast.error(error.message || "Failed to send reset email");
      }
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
      }),
    },
  });

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email address and we'll send you a code to reset your password"
      heroTitle="Reset your password"
      heroSubtitle="We'll help you get back to your data insights."
      backButton={
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      }
    >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="email">
            {(field) => (
              <FormField
                label="Email"
                htmlFor={field.name}
                errors={field.state.meta.errors}
              >
                <EmailInput
                  id={field.name}
                  name={field.name}
                  placeholder="you@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitted}
                />
              </FormField>
            )}
          </form.Field>

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm"
                disabled={!state.canSubmit || state.isSubmitting || isSubmitted}
              >
                {state.isSubmitting 
                  ? "Sending reset email..." 
                  : isSubmitted 
                  ? "Email sent!"
                  : "Send reset code"
                }
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/sign-in")}
            className="text-sm text-muted-foreground hover:text-foreground font-normal transition-colors cursor-pointer"
          >
            Remember your password?{" "}
            <span className="font-medium text-primary hover:text-primary/80 underline underline-offset-2">
              Sign in
            </span>
          </button>
        </div>
      </AuthLayout>
  );
}