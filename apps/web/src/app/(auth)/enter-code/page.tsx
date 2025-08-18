"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Silk from "@/components/ui/silk-gradient";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function EnterCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newInputs = [...codeInputs];
    newInputs[index] = value;
    setCodeInputs(newInputs);
    
    // Update form field
    form.setFieldValue("code", newInputs.join(""));
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeInputKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const form = useForm({
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.resetPassword({
          newPassword: value.newPassword,
          token: value.code,
        });
        toast.success("Password reset successful");
        router.push("/sign-in");
      } catch (error: any) {
        toast.error(error.message || "Failed to reset password");
      }
    },
    validators: {
      onSubmit: z
        .object({
          code: z.string().min(1, "Verification code is required"),
          newPassword: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string(),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        }),
    },
  });

  const handleResendCode = async () => {
    if (!email || resendCooldown > 0) return;
    
    try {
      await authClient.forgetPassword({
        email: email,
        redirectTo: "/enter-code",
      });
      setResendCooldown(60);
      toast.success("Verification code sent again");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code");
    }
  };

  if (!email) {
    router.push("/forgot-password");
    return null;
  }

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
              Enter verification code
            </h1>
            <p className="text-muted-foreground text-sm">
              We sent a verification code to{" "}
              <span className="font-medium text-foreground">{email}</span>
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
                <form.Field name="code">
                  {(field) => (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Verification Code
                      </Label>
                      <div className="flex gap-2">
                        {/* First group of 3 */}
                        {codeInputs.slice(0, 3).map((value, index) => (
                          <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={value}
                            onChange={(e) => handleCodeInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeInputKeyDown(index, e)}
                            className="flex-1 h-12 text-center text-lg font-mono border-0 bg-muted"
                            maxLength={1}
                          />
                        ))}
                        {/* Separator */}
                        <div className="flex items-center px-2">
                          <span className="text-muted-foreground">-</span>
                        </div>
                        {/* Second group of 3 */}
                        {codeInputs.slice(3, 6).map((value, index) => (
                          <Input
                            key={index + 3}
                            ref={(el) => (inputRefs.current[index + 3] = el)}
                            type="text"
                            value={value}
                            onChange={(e) => handleCodeInputChange(index + 3, e.target.value)}
                            onKeyDown={(e) => handleCodeInputKeyDown(index + 3, e)}
                            className="flex-1 h-12 text-center text-lg font-mono border-0 bg-muted"
                            maxLength={1}
                          />
                        ))}
                      </div>
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error?.message}
                          className="text-xs text-destructive font-medium text-center"
                        >
                          {error?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>
              </div>

              <div>
                <form.Field name="newPassword">
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a new password"
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
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
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
                      {field.state.value && form.getFieldValue("newPassword") && 
                       field.state.value !== form.getFieldValue("newPassword") && (
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

              <form.Subscribe>
                {(state) => (
                  <Button
                    type="submit"
                    className="w-full h-10 text-sm font-medium bg-gradient-to-b from-white via-gray-100 to-gray-200 hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 text-gray-900 cursor-pointer transition-colors duration-200 shadow-sm"
                    disabled={!state.canSubmit || state.isSubmitting}
                  >
                    {state.isSubmitting ? "Resetting password..." : "Reset password"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>

          {/* Bottom Links */}
          <div className="text-center mt-6 space-y-3">
            <button
              onClick={handleResendCode}
              disabled={resendCooldown > 0}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 
                ? `Resend code in ${resendCooldown}s`
                : "Resend code"
              }
            </button>
            
            <div>
              <button
                onClick={() => router.push("/sign-in")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Back to sign in
              </button>
            </div>
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
            Almost there
          </h2>
          <p className="text-lg opacity-90">
            Enter your code and create a new password.
          </p>
        </div>
      </div>
    </div>
  );
}