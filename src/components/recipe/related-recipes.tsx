"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"
import { RecipeCard } from "@/components/ui/recipe-card"
import { mealDbApi } from "@/lib/api/mealDbApi"

interface RelatedRecipesProps {
  category: string
  currentRecipeId: string
}

export function RelatedRecipes({ category, currentRecipeId }: RelatedRecipesProps) {
  const { data: relatedRecipes, isLoading } = useQuery({
    queryKey: ["related-recipes", category],
    queryFn: () => mealDbApi.filterByCategory(category),
    enabled: !!category,
  })

  // Filter out current recipe and limit to 4 recipes
  const filteredRecipes = relatedRecipes?.filter((recipe) => recipe.idMeal !== currentRecipeId).slice(0, 4) || []

  if (isLoading || filteredRecipes.length === 0) {
    return null
  }

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

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">More {category} Recipes</h2>
          <p className="text-muted-foreground">Discover other delicious recipes in the same category</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
        >
          {filteredRecipes.map((recipe) => (
            <motion.div key={recipe.idMeal} variants={itemVariants as any} className="h-full">
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
