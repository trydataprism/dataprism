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

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
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
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
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
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-muted-foreground">
              Sign up to start your journey with Dataprism
            </p>
          </div>
          <div className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                <GitBranch className="w-4 h-4" />
                <span>Sign up with GitHub</span>
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
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
                <form.Field name="name">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        Name
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Enter your full name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11"
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-sm text-destructive"
                        >
                          {error?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>
              </div>

              <div>
                <form.Field name="email">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
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
                        <p
                          key={error?.message}
                          className="text-sm text-destructive"
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
                        className="text-sm font-medium"
                      >
                        Password
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        placeholder="Create a password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-11"
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-sm text-destructive"
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
                    className="w-full h-11 text-sm font-medium text-white"
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting
                      ? "Creating account..."
                      : "Create Account"}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            <div className="text-center">
              <button
                onClick={onSwitchToSignIn}
                className="text-sm text-primary hover:text-primary/80"
              >
                Already have an account?{" "}
                <span className="font-medium">Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Fluid Gradient */}
      <div className="flex-1 relative overflow-hidden">
        <FluidGradient />
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
