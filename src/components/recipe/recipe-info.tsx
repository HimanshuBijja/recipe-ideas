"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Progress } from "@/components/ui/progress"
import { Meal } from "@/types/Meal"

interface RecipeInfoProps {
  recipe: Meal
}

type TabType = "ingredients" | "instructions" | "nutrition"

export function RecipeInfo({ recipe }: RecipeInfoProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ingredients")

  // Parse ingredients from the meal object
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "",
      })
    }
  }

  // Parse instructions into steps
  const instructions =
    recipe.strInstructions
      ?.split(/\r?\n/)
      .filter((step) => step.trim())
      .map((step, index) => ({
        number: index + 1,
        text: step.trim(),
      })) || []

  // Mock nutrition data (MealDB doesn't provide this)
  const nutrition = [
    { name: "Calories", value: 450, max: 2000, unit: "kcal" },
    { name: "Protein", value: 25, max: 50, unit: "g" },
    { name: "Carbs", value: 35, max: 300, unit: "g" },
    { name: "Fat", value: 18, max: 65, unit: "g" },
    { name: "Fiber", value: 8, max: 25, unit: "g" },
    { name: "Sugar", value: 12, max: 50, unit: "g" },
  ]

  const tabs = [
    { id: "ingredients" as TabType, label: "Ingredients", count: ingredients.length },
    { id: "instructions" as TabType, label: "Instructions", count: instructions.length },
    { id: "nutrition" as TabType, label: "Nutrition", count: nutrition.length },
  ]

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="relative mb-8">
            <div className="flex space-x-8 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 px-1 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "ingredients" && (
              <motion.div
                key="ingredients"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold mb-6">Ingredients</h3>
                <div className="grid gap-3">
                  {ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants as any}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="font-medium">{ingredient.name}</span>
                      </div>
                      <span className="text-muted-foreground">{ingredient.measure}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "instructions" && (
              <motion.div
                key="instructions"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">Instructions</h3>
                <div className="space-y-6">
                  {instructions.map((step, index) => (
                    <motion.div key={index} variants={itemVariants as any} className="flex gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
                      >
                        {step.number}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="flex-1"
                      >
                        <p className="text-foreground leading-relaxed">{step.text}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "nutrition" && (
              <motion.div
                key="nutrition"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">Nutrition Information</h3>
                <p className="text-muted-foreground mb-6">Estimated nutritional values per serving</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nutrition.map((nutrient, index) => (
                    <motion.div
                      key={nutrient.name}
                      variants={itemVariants as any}
                      className="p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{nutrient.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {nutrient.value}
                          {nutrient.unit}
                        </span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      >
                        <Progress value={(nutrient.value / nutrient.max) * 100} className="h-2" />
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((nutrient.value / nutrient.max) * 100)}% of daily value
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
