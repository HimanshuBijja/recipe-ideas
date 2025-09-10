"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { MobileNav } from "./mobile-nav"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  )
}
