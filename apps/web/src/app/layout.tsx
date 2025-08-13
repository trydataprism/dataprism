import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dataprism",
  description: "dataprism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh">
            {/* <Header /> */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
