"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthLayout, FormField, PasswordInput, VerificationCodeInput } from "@/components/auth";

export default function EnterCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get email from session storage instead of URL parameters
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('reset_email');
    if (storedEmail) {
      setEmail(atob(storedEmail));
    } else {
      // Redirect to forgot-password if no email found
      router.push("/forgot-password");
    }
  }, [router]);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const form = useForm({
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.resetPassword({
          newPassword: value.newPassword,
          token: value.code,
        });
        // Clear stored email after successful reset
        sessionStorage.removeItem('reset_email');
        toast.success("Password reset successful");
        router.push("/sign-in");
      } catch (error: any) {
        toast.error(error.message || "Failed to reset password");
      }
    },
    validators: {
      onSubmit: z
        .object({
          code: z.string().min(1, "Verification code is required"),
          newPassword: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, lowercase letter, and number"),
          confirmPassword: z.string(),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        }),
    },
  });

  const handleResendCode = async () => {
    if (!email || resendCooldown > 0) return;
    
    try {
      await authClient.forgetPassword({
        email: email,
        redirectTo: "/enter-code",
      });
      // Update session storage when resending
      sessionStorage.setItem('reset_email', btoa(email));
      setResendCooldown(60);
      toast.success("Verification code sent again");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code");
    }
  };

  // Show loading while checking for email or redirecting
  if (email === null) {
    return null;
  }

  return (
    <AuthLayout
      title="Enter verification code"
      subtitle={
        <>
          We sent a verification code to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </>
      }
      heroTitle="Almost there"
      heroSubtitle="Enter your code and create a new password."
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
          <form.Field name="code">
            {(field) => (
              <FormField
                label="Verification Code"
                errors={field.state.meta.errors}
              >
                <VerificationCodeInput
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <FormField
                label="New Password"
                htmlFor={field.name}
                errors={field.state.meta.errors}
              >
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  placeholder="Create a new password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <FormField
                label="Confirm New Password"
                htmlFor={field.name}
                errors={field.state.meta.errors}
              >
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  placeholder="Confirm your new password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* Real-time password matching validation */}
                {field.state.value && form.getFieldValue("newPassword") && 
                 field.state.value !== form.getFieldValue("newPassword") && (
                  <p className="text-xs text-destructive font-medium">
                    Passwords don't match
                  </p>
                )}
              </FormField>
            )}
          </form.Field>

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Resetting password..." : "Reset password"}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Bottom Links */}
        <div className="text-center mt-6 space-y-3">
          <button
            onClick={handleResendCode}
            disabled={resendCooldown > 0}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"
            }
          </button>
          
          <div>
            <button
              onClick={() => router.push("/sign-in")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Back to sign in
            </button>
          </div>
        </div>
      </AuthLayout>
  );
}