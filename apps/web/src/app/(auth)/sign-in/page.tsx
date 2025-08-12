"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FluidGradient } from "@/components/ui/fluid-gradient";
import { useRouter } from "next/navigation";
import { GitBranch } from "lucide-react";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Brand */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/dark_logo.svg" alt="Data Prism" className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Data Prism</h1>
            <p className="text-gray-600">Welcome back to your analytics platform</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <GitBranch className="w-4 h-4" />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <form.Field name="email">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="Enter your email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11"
                    />
                    {field.state.meta.errors.map((error) => (
                      <p key={error?.message} className="text-sm text-red-600">
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="password">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-11"
                    />
                    {field.state.meta.errors.map((error) => (
                      <p key={error?.message} className="text-sm text-red-600">
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="text-center">
            <button
              onClick={onSwitchToSignUp}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Don't have an account? <span className="font-medium">Sign up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Fluid Gradient */}
      <div className="flex-1 relative overflow-hidden">
        <FluidGradient />
      </div>
    </div>
  );
}
