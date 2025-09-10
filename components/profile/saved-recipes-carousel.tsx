"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/ui/recipe-card"
import { mealDbApi } from "@/lib/api/mealdb"

export function SavedRecipesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock saved recipes - in real app, fetch from user's saved recipes
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["saved-recipes-carousel"],
    queryFn: () => mealDbApi.getRandomMeals(6),
  })

  if (isLoading) {
    return (
      <div className="flex space-x-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80 animate-pulse">
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
        <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Saved Recipes</h3>
        <p className="text-muted-foreground">Start saving recipes to see them here</p>
      </div>
    )
  }

  const itemsPerView = 3
  const maxIndex = Math.max(0, recipes.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, recipes.length)} of {recipes.length}
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          className="flex space-x-4"
          animate={{
            x: -currentIndex * (320 + 16), // 320px width + 16px gap
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              className="flex-shrink-0 w-80"
              initial={{ opacity: 0, rotateY: -15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                perspective: "1000px",
              }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
