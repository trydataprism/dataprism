"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { PasswordInput } from "@/components/auth/password-input";

export default function SignUpPage() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      referralSource: "",
    },
    onSubmit: async ({ value }) => {
      const result = await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.email.split("@")[0],
        },
        {
          onSuccess: (data) => {
            console.log("Sign up success:", data);
            router.push("/sign-in");
            toast.success(
              "Account created! Please check your email for verification link."
            );
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText || "An error occurred");
          },
        }
      );
    },
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field 
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Email is required";
                if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-white">
                  Email
                </Label>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="hello@dataprism.app"
                  className="h-10 placeholder:text-md"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={form.state.isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field 
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Password is required";
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                  return "Password must contain at least one uppercase letter, lowercase letter, and number";
                }
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-white">
                  Password
                </Label>
                <PasswordInput
                  id={field.name}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={form.state.isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field 
            name="confirmPassword"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (!value) return "Please confirm your password";
                if (value !== fieldApi.form.getFieldValue('password')) {
                  return "Passwords don't match";
                }
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-white">
                  Confirm Password
                </Label>
                <PasswordInput
                  id={field.name}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={form.state.isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field 
            name="referralSource"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Please select how you heard about us";
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-white">
                  How did you hear about us?
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  disabled={form.state.isSubmitting}
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
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/sign-in")}
              className="text-white hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
