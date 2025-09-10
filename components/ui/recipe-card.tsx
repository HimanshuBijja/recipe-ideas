"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Meal } from "@/lib/api/mealdb"

interface RecipeCardProps {
  recipe: Meal
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
    >
      <Link href={`/recipe/${recipe.idMeal}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.strMealThumb || "/placeholder.svg"}
            alt={recipe.strMeal}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
            {recipe.strCategory}
          </Badge>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/recipe/${recipe.idMeal}`}>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors">
              {recipe.strMeal}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto shrink-0 ml-2"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={{ scale: isLiked ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                }`}
              />
            </motion.div>
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>4 servings</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {recipe.strArea}
          </Badge>
          <Link href={`/recipe/${recipe.idMeal}`}>
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              View Recipe
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
