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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Github, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function SignUpPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          alt="Dataprism Logo"
          width={25}
          height={25}
        />
      </div>
      <div className="flex min-h-screen items-center justify-center gap-32">
        <div className="w-full max-w-md px-4 lg:px-0">
          <Card className="w-full border-0 bg-transparent">
            <CardHeader className="text-left">
              <CardTitle className="text-2xl font-bold">
                Create account
              </CardTitle>
              <CardDescription>
                Sign up to get started with Dataprism
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social media buttons - moved to top */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-10 border-0 cursor-pointer hover:!bg-white hover:!text-black transition-all duration-300 font-medium"
                >
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24">
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
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-10 border-0 cursor-pointer hover:!bg-white hover:!text-black transition-all duration-300 font-medium"
                >
                  <Github className="mr-1 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/70" />
                </div>
                <div className="relative flex justify-center text-xs lowercase">
                  <span className="bg-background px-4 text-muted-foreground/70">
                    Or continue with
                  </span>
                </div>
              </div>

              <form className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@dataprism.app"
                    className="h-10 placeholder:text-md"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="•••••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10"
                      required
                    />
                    <AnimatePresence>
                      {password && (
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <motion.div
                            animate={{ scale: showPassword ? 1 : 1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.1 }}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </motion.div>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="•••••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10"
                      required
                    />
                    <AnimatePresence>
                      {confirmPassword && (
                        <motion.button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <motion.div
                            animate={{ scale: showConfirmPassword ? 1 : 1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.1 }}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </motion.div>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="howDidYouHear">
                    How did you hear about us?
                  </Label>
                  <Select>
                    <SelectTrigger className="h-10 w-full border-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search-engine">
                        Search Engine
                      </SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend-colleague">
                        Friend/Colleague
                      </SelectItem>
                      <SelectItem value="advertisement">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="blog-article">Blog/Article</SelectItem>
                      <SelectItem value="conference-event">
                        Conference/Event
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
                >
                  Create account
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="text-primary hover:underline font-medium cursor-pointer"
                  >
                    Sign in
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
                "Discover hidden patterns in your web traffic analytics and optimize your strategy for growth."
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
          By signing up, you agree to our{" "}
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

export default SignUpPage;
