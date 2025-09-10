"use client"

import { motion } from "framer-motion"
import { SearchX, Loader2 } from "lucide-react"
import { RecipeCard } from "@/components/ui/recipe-card"
import type { Meal } from "@/lib/api/mealdb"

interface SearchResultsProps {
  results: Meal[]
  isLoading: boolean
  error: Error | null
  searchQuery: string
  hasFilters: boolean
}

export function SearchResults({ results, isLoading, error, searchQuery, hasFilters }: SearchResultsProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Searching for delicious recipes...</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg h-64 mb-4" />
              <div className="space-y-2">
                <div className="bg-muted rounded h-4 w-3/4" />
                <div className="bg-muted rounded h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-destructive mb-4">
          <SearchX className="h-12 w-12 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Search Error</h3>
          <p className="text-sm text-muted-foreground">Something went wrong while searching. Please try again.</p>
        </div>
      </div>
    )
  }

  // No search query or filters
  if (!searchQuery && !hasFilters) {
    return (
      <div className="text-center py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-muted-foreground">
          <SearchX className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Start Your Recipe Discovery</h3>
          <p className="text-sm max-w-md mx-auto">
            Search for recipes by name, or use the filters to browse by category, cuisine, or ingredient.
          </p>
        </motion.div>
      </div>
    )
  }

  // No results found
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-muted-foreground"
        >
          <SearchX className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Recipes Found</h3>
          <p className="text-sm max-w-md mx-auto mb-4">
            {searchQuery
              ? `No recipes found for "${searchQuery}". Try different keywords or browse by category.`
              : "No recipes match your current filters. Try adjusting your selection."}
          </p>
        </motion.div>
      </div>
    )
  }

  // Results found
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{searchQuery ? `Results for "${searchQuery}"` : "Filtered Results"}</h2>
          <p className="text-sm text-muted-foreground">
            Found {results.length} recipe{results.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {results.map((recipe) => (
          <motion.div key={recipe.idMeal} variants={itemVariants}>
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
