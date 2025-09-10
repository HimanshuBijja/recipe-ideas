"use client"

import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecipeHero } from "@/components/recipe/recipe-hero"
import { RecipeInfo } from "@/components/recipe/recipe-info"
import { RelatedRecipes } from "@/components/recipe/related-recipes"
import { mealDbApi } from "@/lib/api/mealdb"
import { useRouter } from "next/navigation"

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default function RecipePage({ params }: RecipePageProps) {
  const { id } = use(params)
  const router = useRouter()

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => mealDbApi.getMealById(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Button>
      </div>

      <RecipeHero recipe={recipe} />
      <RecipeInfo recipe={recipe} />
      <RelatedRecipes category={recipe.strCategory} currentRecipeId={recipe.idMeal} />
    </motion.div>
  )
}
