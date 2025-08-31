"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "backdrop-blur-md bg-black border border-white/10 shadow-2xl rounded-xl",
          description: "text-white/80",
          actionButton:
            "bg-white/10 text-white border border-white/20 hover:bg-white/20",
          cancelButton:
            "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10",
        },
      }}
      style={
        {
          "--normal-bg": "rgba(0, 0, 0, 1)",
          "--normal-text": "rgba(255, 255, 255, 0.95)",
          "--normal-border": "rgba(255, 255, 255, 0.1)",
          "--error-bg": "rgba(0, 0, 0, 1)",
          "--error-text": "rgba(255, 255, 255, 0.95)",
          "--error-border": "rgba(255, 255, 255, 0.1)",
          "--success-bg": "rgba(0, 0, 0, 1)",
          "--success-text": "rgba(255, 255, 255, 0.95)",
          "--success-border": "rgba(255, 255, 255, 0.1)",
          "--warning-bg": "rgba(0, 0, 0, 1)",
          "--warning-text": "rgba(255, 255, 255, 0.95)",
          "--warning-border": "rgba(255, 255, 255, 0.1)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
