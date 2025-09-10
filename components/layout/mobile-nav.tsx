"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, Heart, User } from "lucide-react"
import { useSession } from "next-auth/react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Don't show on auth pages
  if (pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border"
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isProtected = (item.href === "/favorites" || item.href === "/profile") && !session

          if (isProtected) {
            return (
              <Link
                key={item.href}
                href="/auth/signin"
                className="flex flex-col items-center justify-center p-2 text-muted-foreground/50"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center p-2">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <span className="text-xs mt-1">{item.label}</span>
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 h-0.5 w-8 bg-primary rounded-full"
                  style={{ x: "-50%" }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
