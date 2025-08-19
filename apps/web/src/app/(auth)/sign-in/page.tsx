"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AuthLayout,
  FormField,
  EmailInput,
  PasswordInput,
  SocialLogin,
} from "@/components/auth";

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
        password: z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, lowercase letter, and number"
          ),
      }),
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue with Dataprism"
      heroTitle="Analytics made effortless"
      heroSubtitle="Turn your data into actionable insights with ease."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="email">
          {(field) => (
            <FormField
              label="Email"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              <EmailInput
                id={field.name}
                name={field.name}
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormField
              label={
                <div className="flex items-center justify-between w-full">
                  <span>Password</span>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              }
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              <PasswordInput
                id={field.name}
                name={field.name}
                placeholder="Enter your password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <SocialLogin type="signin" />

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/sign-up")}
          className="text-sm text-muted-foreground hover:text-foreground font-normal transition-colors cursor-pointer"
        >
          Don't have an account?{" "}
          <span className="font-medium text-primary hover:text-primary/80 underline underline-offset-2">
            Sign up
          </span>
        </button>
      </div>
    </AuthLayout>
  );
}
