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
  backButton
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Card */}
      <div className="w-full lg:flex-1 flex items-center justify-center bg-background relative">
        <div className="w-full max-w-sm">
          {/* Back Button */}
          {backButton && (
            <div className="mb-6">
              {backButton}
            </div>
          )}
          
          {/* Header */}
          <div className="text-start mb-5">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {subtitle}
            </p>
          </div>
          
          {/* Form Content */}
          <div className="shadow-lg">
            {children}
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
            {heroTitle}
          </h2>
          <p className="text-lg opacity-90">
            {heroSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
}