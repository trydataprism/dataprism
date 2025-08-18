"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Silk from "@/components/ui/silk-gradient";
import { useRouter } from "next/navigation";
import { GitBranch, Eye, EyeOff, Star, Github } from "lucide-react";
import { useState } from "react";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Left Side - Form Card */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to continue your journey with Dataprism
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-11 text-sm font-medium relative group"
              >
                <Github className="w-4 h-4 mr-3" />
                <span>Sign in with GitHub</span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-card text-muted-foreground font-medium">
                  or continue with
                </span>
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
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11 text-sm"
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-xs text-destructive font-medium"
                        >
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
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={field.name}
                          className="text-sm font-medium text-foreground"
                        >
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-sm text-gray-500 hover:text-gray-400 font-medium transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-11 text-sm pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-xs text-destructive font-medium"
                        >
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
                    className="w-full h-11 text-sm font-semibold bg-foreground hover:bg-foreground/90 text-background mt-6"
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <button
              onClick={onSwitchToSignUp}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Don't have an account?{" "}
              <span className="font-semibold text-gray-500 hover:text-gray-600 underline underline-offset-2">
                Sign up
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Silk Gradient */}
      <div className="flex-1 relative overflow-hidden">
        <Silk
          color="#5c5c5c"
          speed={4.3}
          scale={0.9}
          noiseIntensity={0.5}
          rotation={0}
        />
        {/* Back Button */}
        <Button
          variant="ghost"
          className="absolute top-6 left-6 bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white hover:cursor-pointer transition-all duration-200"
          onClick={() => router.push("/")}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>
        {/* Logo and Brand */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <img src="/dark_logo.svg" alt="Dataprism" className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-white">DATAPRISM</h1>
        </div>
        {/* Right side text */}
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="text-4xl font-bold mb-2">Smart data</h2>
          <h2 className="text-4xl font-bold mb-2">powerful analytics</h2>
          <h2 className="text-4xl font-bold mb-4">simplified</h2>
          <p className="text-lg opacity-90">
            Connect, analyze, and share powerful insights with your team.
          </p>
        </div>
      </div>
    </div>
  );
}
