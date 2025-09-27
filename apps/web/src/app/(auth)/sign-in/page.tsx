"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { PasswordInput } from "@/components/auth/password-input";

export default function SignInPage() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: async () => {
            toast.success("Welcome back!");
            router.push("/dashboard");
          },
          onError: (error) => {
            if (error.error.message?.includes("EMAIL_NOT_VERIFIED")) {
              toast.error("Please verify your email before signing in");
              router.push(
                `/enter-code?email=${encodeURIComponent(
                  value.email
                )}&type=verification`
              );
            } else {
              toast.error("Invalid email or password");
            }
          },
        }
      );
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
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
              },
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
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={field.name} className="text-white">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
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

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              className="text-white hover:underline font-medium cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
