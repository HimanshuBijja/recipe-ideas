"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { RecipeCard } from "@/components/ui/recipe-card"
import { Button } from "@/components/ui/button"
import { mealDbApi } from "@/lib/api/mealdb"
import Link from "next/link"

interface FavoritesGridProps {
  limit?: number
}

export function FavoritesGrid({ limit }: FavoritesGridProps) {
  // Mock favorites - in real app, fetch from user's favorites
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["favorites-grid"],
    queryFn: () => mealDbApi.getRandomMeals(limit || 8),
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4" />
            <div className="bg-muted rounded h-4 mb-2" />
            <div className="bg-muted rounded h-3 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Favorite Recipes</h3>
        <p className="text-muted-foreground mb-4">Start adding recipes to your favorites to see them here</p>
        <Button asChild>
          <Link href="/search">Discover Recipes</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {recipes.slice(0, limit).map((recipe) => (
          <motion.div
            key={recipe.idMeal}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </motion.div>

      {limit && recipes.length > limit && (
        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <Link href="/favorites">View All Favorites</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
