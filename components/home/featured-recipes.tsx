"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { mealDbApi } from "@/lib/api/mealdb"
import { RecipeCard } from "@/components/ui/recipe-card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function FeaturedRecipes() {
  const {
    data: recipes,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["featured-recipes"],
    queryFn: () => mealDbApi.getRandomMeals(8),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Today's Featured Recipes</h2>
            <p className="text-lg text-muted-foreground">Handpicked delicious recipes to inspire your next meal</p>
          </div>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-4 md:mt-0 flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4" />
                <div className="bg-muted rounded h-4 mb-2" />
                <div className="bg-muted rounded h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {recipes?.map((recipe) => (
              <motion.div key={recipe.idMeal} variants={itemVariants}>
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
