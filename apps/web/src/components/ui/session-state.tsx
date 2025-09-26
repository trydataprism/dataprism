"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface SessionStateProps {
  message?: string;
  redirectTo?: string;
  showToast?: boolean;
  className?: string;
  showLogo?: boolean;
}

export function SessionState({
  message = "Please sign in to access the dashboard",
  redirectTo = "/sign-in",
  showToast = true,
  className,
  showLogo = true,
}: SessionStateProps) {
  const router = useRouter();

  useEffect(() => {
    if (showToast) {
      toast.error("Please sign in to access the dashboard", {
        duration: 4000,
      });
    }
  }, [showToast]);

  const handleSignIn = () => {
    router.push(redirectTo);
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-black p-8 relative",
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

      <div className="flex flex-col items-center space-y-8 max-w-md text-center relative z-10">
        {/* Logo */}
        {showLogo && (
          <div className="flex items-center gap-3">
            <Image
              src="/dark_logo.svg"
              alt="Dataprism"
              width={28}
              height={28}
              className="opacity-90"
            />
            <h1 className="text-xl font-bold text-white">DATAPRISM</h1>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          <p className="text-white/70 text-sm">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full max-w-xs">
          <Button
            onClick={handleBackHome}
            variant="outline"
            className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 cursor-pointer"
          >
            Back Home
          </Button>
          <Button
            onClick={handleSignIn}
            variant="default"
            className="flex-1 bg-white text-black hover:bg-white/90 cursor-pointer"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
