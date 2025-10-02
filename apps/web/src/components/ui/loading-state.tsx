"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
  showLogo?: boolean;
}

export function LoadingState({
  message = "Loading...",
  className,
  showLogo = true,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-black relative",
        className
      )}
    >
      {/* Background Light Effects */}
      <div
        aria-hidden
        className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="flex flex-col items-center space-y-6 relative z-10">
        {/* Spinner */}
        <div className="relative">
          <div className="h-8 w-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        </div>

        {/* Logo */}
        {showLogo && (
          <div className="flex items-center gap-3">
            <Image
              src="/dark_logo.svg"
              alt="Dataprism"
              width={20}
              height={20}
              className="opacity-90"
            />
            <h1 className="text-2xl font-bold text-white">DATAPRISM</h1>
          </div>
        )}

        {/* Message */}
        <p className="text-white/70 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
