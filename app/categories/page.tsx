"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { CategoryCard } from "@/components/ui/category-card"
import { mealDbApi } from "@/lib/api/mealdb"

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: mealDbApi.getCategories,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Recipe Categories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our complete collection of recipe categories and find your next favorite dish
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-square mb-3" />
              <div className="bg-muted rounded h-4 mb-2" />
              <div className="bg-muted rounded h-3 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {categories?.map((category) => (
            <motion.div key={category.idCategory} variants={itemVariants}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
