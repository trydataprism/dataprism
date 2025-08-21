import type { Metadata } from "next";
import "../index.css";
import Providers from "@/components/providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${poppins.className} antialiased`}>
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
