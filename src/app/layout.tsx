import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEGO SPIKE Prime Programming for Kids",
  description: "Learn Python programming with LEGO SPIKE Prime! Fun, interactive lessons designed for 10-year-old kids.",
  keywords: ["LEGO", "SPIKE Prime", "Python", "Programming", "Kids", "Education", "Robotics"],
  authors: [{ name: "LEGO Learning Platform" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 min-h-screen`}
      >
        <SessionProvider>
          <ToastProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
