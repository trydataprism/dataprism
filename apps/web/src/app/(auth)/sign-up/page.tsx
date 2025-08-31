"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { PasswordInput } from "@/components/auth/password-input";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpFormData } from "@/lib/auth-schemas";
import { toast } from "sonner";

function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    referralSource: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = signUpSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<SignUpFormData> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof SignUpFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: "", // Default empty name since we're not collecting it
        callbackURL: "/dashboard",
      });

      if (result.error) {
        if (result.error.message?.includes("already exists")) {
          toast.error("An account with this email already exists");
        } else {
          toast.error(result.error.message || "Failed to create account");
        }
      } else {
        toast.success(
          "Account created! Please check your email to verify your account."
        );
        router.push(
          `/enter-code?email=${encodeURIComponent(formData.email)}&type=verification`
        );
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      description="Sign up to get started with Dataprism"
    >
      <div className="space-y-6">
        {/* Social Login */}
        <SocialLoginButtons />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/70" />
          </div>
          <div className="relative flex justify-center text-xs lowercase">
            <span className="bg-background px-4 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <PasswordInput
              id="password"
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
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
              value={formData.confirmPassword}
              onChange={(value) =>
                setFormData({ ...formData, confirmPassword: value })
              }
              disabled={isLoading}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="referralSource" className="text-white">
              How did you hear about us?
            </Label>
            <Select
              value={formData.referralSource}
              onValueChange={(value) =>
                setFormData({ ...formData, referralSource: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger className="h-10 w-full border-0">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search-engine">Search Engine</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="friend-colleague">
                  Friend/Colleague
                </SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="blog-article">Blog/Article</SelectItem>
                <SelectItem value="conference-event">
                  Conference/Event
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.referralSource && (
              <p className="text-sm text-red-500">{errors.referralSource}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
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

export default SignUpPage;
