"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Invalid email address" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await authClient.forgetPassword.emailOtp({
        email: formData.email,
      });
      
      if (result.error) {
        if (result.error.message?.includes("User not found") || result.error.message?.includes("not exist")) {
          toast.error("No account found with this email address. Please check your email or sign up.");
        } else {
          toast.error(result.error.message || "Failed to send reset code");
        }
        return;
      }
      
      // Store email in session storage for enter-code page
      sessionStorage.setItem('reset_email', btoa(formData.email));
      
      toast.success("Password reset code sent to your email.");
      router.push("/enter-code");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      if (error.message?.includes("User not found") || error.message?.includes("not exist")) {
        toast.error("No account found with this email address. Please check your email or sign up.");
      } else {
        toast.error(error.message || "Failed to send reset code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email address to receive a password reset code"
      testimonial="Secure your account with our streamlined password recovery process."
    >
      <div className="space-y-6">
        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@dataprism.app"
              className="h-10 placeholder:text-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Remember your password?{" "}
            <a
              href="/sign-in"
              className="text-white hover:underline font-medium cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}