"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "@/components/loader";
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
import Silk from "@/components/ui/silk-gradient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GitBranch, Eye, EyeOff, Star } from "lucide-react";
import { useState } from "react";

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      referral: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.email.split("@")[0],
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        }
      );
    },
    validators: {
      onSubmit: z
        .object({
          email: z.email("Invalid email address"),
          password: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string(),
          referral: z.string().min(1, "Please select how you heard about us"),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Card */}
      <div className="w-full lg:flex-1 flex items-center justify-center bg-background">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-start mb-5">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign up to start your journey with Dataprism
            </p>
          </div>
          {/* Register Card */}
          <div className="shadow-lg">
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
                        className="h-10 text-sm border-0 bg-muted"
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
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-10 text-sm pr-10 border-0 bg-muted"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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

              <div>
                <form.Field name="confirmPassword">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Password Again
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-10 text-sm pr-10 border-0 bg-muted"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {/* Real-time password matching validation */}
                      {field.state.value && form.getFieldValue("password") && 
                       field.state.value !== form.getFieldValue("password") && (
                        <p className="text-xs text-destructive font-medium">
                          Passwords don't match
                        </p>
                      )}
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
                <form.Field name="referral">
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        How did you hear about us?
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full h-10 text-sm border-0 bg-muted">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="border-0">
                          <SelectItem value="search-engine">
                            Search Engine
                          </SelectItem>
                          <SelectItem value="social-media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="friend-referral">
                            Friend Referral
                          </SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="online-ad">
                            Advertisement
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
                    className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm mt-2"
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting
                      ? "Creating account..."
                      : "Create account"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>
          {/* Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-background text-muted-foreground text-xs">
                or continue with
              </span>
            </div>
          </div>
          {/* Social Login Buttons  */}
          <div className="space-y-3 mt-6">
            <Button className="w-full h-10 text-sm font-normal border-0 bg-neutral-900 text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Sign up with GitHub</span>
            </Button>
            <Button className="w-full h-10 text-sm font-normal border-0 bg-neutral-900 text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
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
              Sign up with Google
            </Button>
          </div>
          {/* Sign In Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/sign-in")}
              className="text-sm text-muted-foreground hover:text-foreground font-normal transition-colors cursor-pointer"
            >
              Already have an account?{" "}
              <span className="font-medium text-primary hover:text-primary/80 underline underline-offset-2">
                Sign in
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Silk Gradient */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <Silk
          color="#5c5c5c"
          speed={4.3}
          scale={0.9}
          noiseIntensity={0.5}
          rotation={0}
        />
        {/* Logo and Brand */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <Image src="/dark_logo.svg" alt="Dataprism" width={24} height={24} />
          <h1 className="text-2xl font-bold text-white">DATAPRISM</h1>
        </div>

        {/* Right side text */}
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Analytics made effortless
          </h2>
          <p className="text-lg opacity-90">
            Turn your data into actionable insights with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
