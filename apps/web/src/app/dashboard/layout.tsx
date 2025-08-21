import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${poppins.className}`}>{children}</div>;
}
