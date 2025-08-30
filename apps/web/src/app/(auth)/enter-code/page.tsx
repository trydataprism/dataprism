"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function EnterCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  return (
    <div className="dark min-h-screen bg-background">
      <div
        aria-hidden
        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <div className="absolute top-6 left-6">
        <Image
          src="/dark_logo.svg"
          alt="DataPrism Logo"
          width={25}
          height={25}
        />
      </div>
      <div className="flex min-h-screen items-center justify-center gap-32">
        <div className="w-full max-w-md px-4 lg:px-0">
          <Card className="w-full border-0 bg-transparent">
            <CardHeader className="text-left">
              <CardTitle className="text-2xl font-bold">Enter Code</CardTitle>
              <CardDescription>
                Enter the verification code sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>Verification Code</Label>
                  <div className="flex items-center gap-2">
                    {code.map((digit, index) => (
                      <React.Fragment key={index}>
                        <Input
                          type="text"
                          value={digit}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 1 && /^\d*$/.test(value)) {
                              const newCode = [...code];
                              newCode[index] = value;
                              setCode(newCode);
                              
                              if (value && index < 5) {
                                const nextInput = document.getElementById(`code-${index + 1}`);
                                nextInput?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !code[index] && index > 0) {
                              const prevInput = document.getElementById(`code-${index - 1}`);
                              prevInput?.focus();
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData("text");
                            const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");
                            const newCode = ["", "", "", "", "", ""];
                            digits.forEach((digit, i) => {
                              if (i < 6) newCode[i] = digit;
                            });
                            setCode(newCode);
                          }}
                          id={`code-${index}`}
                          className="h-12 flex-1 text-center text-lg font-medium border-border/50 focus:border-primary"
                          maxLength={1}
                          autoComplete="off"
                        />
                        {index === 2 && (
                          <div className="w-4 h-0.5 bg-border flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
                >
                  Verify Code
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium cursor-pointer"
                  >
                    Resend code
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">
                  <a
                    href="/sign-in"
                    className="text-primary hover:underline font-medium cursor-pointer"
                  >
                    Back to sign in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orta çizgi */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent h-96 shadow-sm"></div>

        {/* Sağ taraf - Dataprism Team */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-4">
              <p className="text-2xl leading-relaxed bg-gradient-to-r from-white from-70% to-gray-800 bg-clip-text text-transparent">
                "Verification keeps your data secure and your account protected."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-neutral-950 rounded-md flex items-center justify-center">
                  <Image
                    src="/dark_logo.svg"
                    alt="Dataprism Logo"
                    width={12}
                    height={12}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      Dataprism Team
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Data Intelligence Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Terms and Privacy Policy */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-xs text-muted-foreground/70 text-center">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="text-primary hover:underline cursor-pointer"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary hover:underline cursor-pointer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default EnterCodePage;
