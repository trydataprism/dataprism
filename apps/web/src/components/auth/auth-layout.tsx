import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  testimonial?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  testimonial,
}: AuthLayoutProps) {
  const defaultTestimonial =
    "Discover hidden patterns in your web traffic analytics and optimize your strategy for growth.";

  return (
    <div className="dark min-h-screen bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Image
          src="/dark_logo.svg"
          alt="Dataprism Logo"
          width={25}
          height={25}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center gap-32">
        {/* Left Side - Auth Form */}
        <div className="w-full max-w-md px-4 lg:px-0">
          <div className="w-full border-0 bg-transparent">
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold mb-2 text-white">{title}</h1>
              <p className="text-gray-400">{description}</p>
            </div>
            {children}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent h-96 shadow-sm"></div>

        {/* Right Side - Testimonial */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-4">
              <p className="text-2xl leading-relaxed bg-gradient-to-r from-white from-70% to-gray-800 bg-clip-text text-transparent">
                &ldquo;{testimonial || defaultTestimonial}&rdquo;
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
                    <p className="text-sm font-medium text-white">
                      Dataprism Team
                    </p>
                    <p className="text-xs text-gray-400">
                      Data Intelligence Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-xs text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="text-white hover:underline cursor-pointer"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-white hover:underline cursor-pointer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
