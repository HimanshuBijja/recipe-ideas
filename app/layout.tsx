import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/providers/auth-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { MainLayout } from "@/components/layout/main-layout"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Recipe Ideas - Discover Your Next Favorite Recipe",
  description: "Explore thousands of delicious recipes from around the world with our modern recipe discovery platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <QueryProvider>
            <AuthProvider>
              <MainLayout>{children}</MainLayout>
            </AuthProvider>
          </QueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
