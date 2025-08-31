"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { CodeInput } from "@/components/auth/code-input";

export default function EnterCodePage() {
  const router = useRouter();
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
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const codeString = code.join("");
    setErrors({});
    
    // Basic validation
    if (codeString.length !== 6) {
      setErrors({ code: "Verification code must be 6 digits" });
      return;
    }
    
    if (newPassword.length < 8) {
      setErrors({ newPassword: "Password must be at least 8 characters" });
      return;
    }
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      setErrors({ newPassword: "Password must contain at least one uppercase letter, lowercase letter, and number" });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      return;
    }

    try {
      if (!email) {
        toast.error("Email not found. Please restart the process.");
        router.push("/forgot-password");
        return;
      }
      
      setIsLoading(true);
      
      // Reset password with OTP verification
      const resetResult = await authClient.emailOtp.resetPassword({
        email: email,
        otp: codeString,
        password: newPassword,
      });
      
      if (resetResult.error) {
        if (resetResult.error.message?.includes("invalid") || resetResult.error.message?.includes("expired") || resetResult.error.message?.includes("OTP")) {
          toast.error("The verification code is incorrect or has expired. Please check your email and try again.");
        } else {
          toast.error("Unable to reset password. Please try again or contact support.");
        }
        return;
      }
      // Clear stored email after successful reset
      sessionStorage.removeItem('reset_email');
      toast.success("Password reset successful");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || resendCooldown > 0) return;
    
    try {
      await authClient.forgetPassword.emailOtp({
        email: email,
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
      description={`We sent a verification code to ${email}`}
      testimonial="Almost there. Enter your code and create a new password."
    >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Verification Code</label>
            <CodeInput
              length={6}
              value={code}
              onChange={setCode}
              disabled={isLoading}
            />
            {errors.code && (
              <p className="text-sm text-destructive font-medium">{errors.code}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
            <PasswordInput
              id="newPassword"
              placeholder="Create a new password"
              value={newPassword}
              onChange={(value: string) => setNewPassword(value)}
              disabled={isLoading}
            />
            {errors.newPassword && (
              <p className="text-sm text-destructive font-medium">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(value: string) => setConfirmPassword(value)}
              disabled={isLoading}
            />
            {/* Real-time password matching validation */}
            {confirmPassword && newPassword && confirmPassword !== newPassword && (
              <p className="text-xs text-destructive font-medium">
                Passwords don't match
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-sm text-destructive font-medium">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Resetting password..." : "Reset password"}
          </Button>
        </form>

        {/* Back Button and Resend */}
        <div className="flex items-center justify-between pt-4 border-t border-border/10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className={`font-medium cursor-pointer ${
                  resendCooldown === 0
                    ? "text-white hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                disabled={resendCooldown > 0}
              >
                {resendCooldown === 0 ? "Resend code" : `Resend in ${resendCooldown}s`}
              </button>
            </p>
            <p className="text-sm text-gray-400">
              <button
                onClick={() => router.push("/sign-in")}
                className="text-white hover:underline font-medium cursor-pointer"
              >
                Back to sign in
              </button>
            </p>
          </div>
        </div>
      </AuthLayout>
  );
}