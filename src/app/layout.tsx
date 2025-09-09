import type { Metadata } from "next";
import { Geist, Geist_Mono ,Saira } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} antialiased relative min-h-screen`}
        >
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            
          >

          {children}
          <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
