import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Saira,
  Kavoon,
  Italianno,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const kavoon = Kavoon({
  weight: ["400"],
  variable: "--font-kavoon",
  subsets: ["latin"],
});
const italianno = Italianno({
  weight: ["400"],
  variable: "--font-italianno",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  weight: ["400"],
  variable: "--font-marcellus",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Ideas",
  description: "Anonymous messaging platform for secure communication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} ${kavoon.variable} ${italianno.variable} ${marcellus.variable} antialiased relative min-h-screen`}
      >
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
