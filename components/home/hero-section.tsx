"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularSearches = ["Chicken", "Pasta", "Dessert", "Vegetarian", "Quick meals"]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/20 blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-primary/10 blur-xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Discover Your Next{" "}
              <span className="text-primary relative">
                Favorite Recipe
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty"
          >
            Explore thousands of delicious recipes from around the world, curated just for you
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for recipes, ingredients, or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-24 py-6 text-lg rounded-full border-2 border-border focus:border-primary transition-all duration-300 bg-background/80 backdrop-blur"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                >
                  Search
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <span className="text-sm text-muted-foreground flex items-center gap-2 mr-4">
              <TrendingUp className="h-4 w-4" />
              Popular:
            </span>
            {popularSearches.map((search, index) => (
              <motion.button
                key={search}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/search?q=${encodeURIComponent(search)}`)}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
              >
                {search}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
