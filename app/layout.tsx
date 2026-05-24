import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { G } from "./page";
import { Nav } from "@/components/shared/Nav";
import LayoutContext from "@/components/layouts/LayoutContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Center",
  description: "A team management & ticketing system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: G.fontBody }}>
          <LayoutContext>
            <Nav />
            {children}
          </LayoutContext>
        </div>
      </body>
    </html>
  );
}
