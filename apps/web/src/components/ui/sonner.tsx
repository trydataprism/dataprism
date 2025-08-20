"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "rgba(0, 0, 0, 0.3)",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "transparent",
          "--error-bg": "rgba(0, 0, 0, 0.3)",
          "--error-text": "hsl(var(--foreground))",
          "--error-border": "transparent",
          "--success-bg": "rgba(0, 0, 0, 0.3)",
          "--success-text": "hsl(var(--foreground))",
          "--success-border": "transparent",
          "--warning-bg": "rgba(0, 0, 0, 0.3)",
          "--warning-text": "hsl(var(--foreground))",
          "--warning-border": "transparent",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
