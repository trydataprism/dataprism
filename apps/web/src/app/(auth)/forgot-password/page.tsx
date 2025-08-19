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
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.forgetPassword({
          email: value.email,
          redirectTo: "/enter-code",
        });
        setIsSubmitted(true);
        toast.success("Password reset email sent");
        router.push(`/enter-code?email=${encodeURIComponent(value.email)}`);
      } catch (error: any) {
        toast.error(error.message || "Failed to send reset email");
      }
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
      }),
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Card */}
      <div className="w-full lg:flex-1 flex items-center justify-center bg-background">
        <div className="w-full max-w-sm">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          {/* Header */}
          <div className="text-start mb-5">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Forgot password?
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address and we'll send you a code to reset your password
            </p>
          </div>

          {/* Form Card */}
          <div className="shadow-lg">
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
                        disabled={isSubmitted}
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

              <form.Subscribe>
                {(state) => (
                  <Button
                    type="submit"
                    className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm"
                    disabled={!state.canSubmit || state.isSubmitting || isSubmitted}
                  >
                    {state.isSubmitting 
                      ? "Sending reset email..." 
                      : isSubmitted 
                      ? "Email sent!"
                      : "Send reset code"
                    }
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/sign-in")}
              className="text-sm text-muted-foreground hover:text-foreground font-normal transition-colors cursor-pointer"
            >
              Remember your password?{" "}
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
            Reset your password
          </h2>
          <p className="text-lg opacity-90">
            We'll help you get back to your data insights.
          </p>
        </div>
      </div>
    </div>
  );
}