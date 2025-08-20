import Silk from "@/components/ui/silk-gradient";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: ReactNode;
  heroTitle: string;
  heroSubtitle: string;
  backButton?: ReactNode;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  heroTitle,
  heroSubtitle,
  backButton,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Border Lines and Content Container */}
      <div className="min-h-screen py-16 px-40 flex">
        {/* Border Lines */}
        <div className="absolute inset-0 pointer-events-none py-16 px-40">
          <div className="absolute top-16 left-40 right-40 h-px bg-gray-800"></div>
          <div className="absolute bottom-16 left-40 right-40 h-px bg-gray-800"></div>
          <div className="absolute left-40 top-16 bottom-16 w-px bg-gray-800"></div>
          <div className="absolute right-40 top-16 bottom-16 w-px bg-gray-800"></div>
          {/* Middle vertical divider */}
          <div className="absolute left-1/2 top-16 bottom-16 w-px bg-gray-800"></div>
        </div>

        {/* Corner Plus Signs */}
        <div className="absolute inset-0 pointer-events-none py-16 px-40 z-10">
          {/* Top Left */}
          <div className="absolute top-16 left-40 text-gray-800 text-2xl transform -translate-x-1/2 -translate-y-1/2">
            +
          </div>
          {/* Top Right */}
          <div className="absolute top-16 right-40 text-gray-800 text-2xl transform translate-x-1/2 -translate-y-1/2">
            +
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-16 left-40 text-gray-800 text-2xl transform -translate-x-1/2 translate-y-1/2">
            +
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-16 right-40 text-gray-800 text-2xl transform translate-x-1/2 translate-y-1/2">
            +
          </div>
          {/* Middle Top */}
          <div className="absolute top-16 left-1/2 text-gray-800 text-2xl transform -translate-x-1/2 -translate-y-1/2">
            +
          </div>
          {/* Middle Bottom */}
          <div className="absolute bottom-16 left-1/2 text-gray-800 text-2xl transform -translate-x-1/2 translate-y-1/2">
            +
          </div>
        </div>

        {/* Left Side - Form Card */}
        <div className="w-1/2 flex items-center justify-center relative z-10">
          <div className="w-full max-w-md bg-background rounded-lg p-8">
            {/* Back Button */}
            {backButton && <div className="mb-6 w-full">{backButton}</div>}

            {/* Header */}
            <div className="text-start mb-5 w-full">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>

            {/* Form Content */}
            <div className="shadow-lg w-full">{children}</div>
          </div>
        </div>

        {/* Right Side - Silk Gradient */}
        <div className="w-1/2 flex items-center justify-center relative z-10">
          <div className="w-[650px] h-[800px] relative overflow-hidden rounded-lg">
            <Silk
              color="#5c5c5c"
              speed={4.3}
              scale={0.9}
              noiseIntensity={0.5}
              rotation={0}
            />

            {/* Logo and Brand */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <Image
                src="/dark_logo.svg"
                alt="Dataprism"
                width={24}
                height={24}
              />
              <h1 className="text-2xl font-bold text-white">DATAPRISM</h1>
            </div>

            {/* Right side text */}
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {heroTitle}
              </h2>
              <p className="text-lg opacity-90">{heroSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
