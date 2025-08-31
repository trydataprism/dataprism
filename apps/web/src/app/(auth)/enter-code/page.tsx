"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { CodeInput } from "@/components/auth/code-input";
import {
  verifyEmail,
  resetPassword,
  sendVerificationEmail,
} from "@/lib/auth-client";
import { verifyEmailSchema, resetPasswordSchema } from "@/lib/auth-schemas";
import { PasswordInput } from "@/components/auth/password-input";
import { toast } from "sonner";

function EnterCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "verification"; // 'verification' | 'password-reset'

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeString = code.join("");

    if (type === "verification") {
      // Email verification
      const validation = verifyEmailSchema.safeParse({ code: codeString });
      if (!validation.success) {
        setErrors({
          code: validation.error.issues[0]?.message || "Invalid code",
        });
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        const result = await verifyEmail({
          query: { token: codeString },
        });

        if (result.error) {
          toast.error("Invalid or expired verification code");
        } else {
          toast.success("Email verified successfully!");
          router.push("/sign-in?verified=true");
        }
      } catch (error) {
        console.error("Email verification error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    } else if (type === "password-reset") {
      // Password reset
      const validation = resetPasswordSchema.safeParse({
        code: codeString,
        password,
        confirmPassword,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        const result = await resetPassword({
          newPassword: password,
          token: codeString,
        });

        if (result.error) {
          toast.error("Invalid or expired reset code");
        } else {
          toast.success("Password reset successfully!");
          router.push("/sign-in?reset=true");
        }
      } catch (error) {
        console.error("Password reset error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      if (type === "verification") {
        await sendVerificationEmail({ email });
        toast.success("Verification code sent!");
      } else {
        // For password reset, we'd need to call forgot password again
        // This would be handled by the forgot password API
        toast.success("Reset code sent!");
      }

      setCanResend(false);
      setResendCountdown(60);
    } catch {
      toast.error("Failed to resend code");
    }
  };

  const title = type === "verification" ? "Verify Email" : "Reset Password";
  const description =
    type === "verification"
      ? "Enter the verification code sent to your email"
      : "Enter the reset code and your new password";

  return (
    <AuthLayout
      title={title}
      description={description}
      testimonial="Verification keeps your data secure and your account protected."
    >
      <div className="space-y-6">
        {/* Code Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label className="text-white">
              {type === "verification" ? "Verification Code" : "Reset Code"}
            </Label>
            <CodeInput
              length={6}
              value={code}
              onChange={setCode}
              disabled={isLoading}
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code}</p>
            )}
          </div>

          {/* Password fields for reset */}
          {type === "password-reset" && (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-white">
                  New Password
                </Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={setPassword}
                  disabled={isLoading}
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <PasswordInput
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  disabled={isLoading}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading
              ? type === "verification"
                ? "Verifying..."
                : "Resetting..."
              : type === "verification"
                ? "Verify Code"
                : "Reset Password"}
          </Button>
        </form>

        {/* Resend and Navigation */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className={`font-medium cursor-pointer ${
                canResend
                  ? "text-white hover:underline"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canResend}
            >
              {canResend ? "Resend code" : `Resend in ${resendCountdown}s`}
            </button>
          </p>
          <p className="text-sm text-gray-400">
            <a
              href="/sign-in"
              className="text-white hover:underline font-medium cursor-pointer"
            >
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default EnterCodePage;
