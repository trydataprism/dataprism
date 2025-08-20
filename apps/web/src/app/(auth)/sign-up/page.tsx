"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  AuthLayout,
  FormField,
  EmailInput,
  PasswordInput,
  SocialLogin,
} from "@/components/auth";

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
      confirmPassword: "",
      referral: "",
    },
    onSubmit: async ({ value }) => {
      // Check if passwords match before submitting
      if (value.password !== value.confirmPassword) {
        return;
      }

      await authClient.signUp.email(
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
        confirmPassword: z.string(),
        referral: z.string().min(1, "Please select how you heard about us"),
      }),
    },
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to start your journey with Dataprism"
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
              label="Password"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              <PasswordInput
                id={field.name}
                name={field.name}
                placeholder="Create a password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <FormField
              label="Confirm Password"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              <PasswordInput
                id={field.name}
                name={field.name}
                placeholder="Confirm your password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {/* Real-time password matching validation */}
              {field.state.value &&
                form.getFieldValue("password") &&
                field.state.value !== form.getFieldValue("password") && (
                  <p className="text-xs text-destructive font-medium">
                    Passwords don't match
                  </p>
                )}
            </FormField>
          )}
        </form.Field>

        <form.Field name="referral">
          {(field) => (
            <FormField
              label="How did you hear about us?"
              errors={field.state.meta.errors}
            >
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger className="w-full h-10 text-sm border-0 bg-muted">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="border-0">
                  <SelectItem value="search-engine">Search Engine</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="friend-referral">
                    Friend Referral
                  </SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="online-ad">Advertisement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => {
            const passwordsMatch =
              state.values.password === state.values.confirmPassword;
            const isDisabled =
              !state.canSubmit ||
              state.isSubmitting ||
              (state.values.password &&
                state.values.confirmPassword &&
                !passwordsMatch) ||
              false;

            return (
              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm mt-2"
                disabled={isDisabled}
              >
                {state.isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>

      <SocialLogin type="signup" />

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
    </AuthLayout>
  );
}
