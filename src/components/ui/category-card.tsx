"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Category } from "@/types/Category"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link href={`/search?category=${encodeURIComponent(category.strCategory)}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.strCategoryThumb || "/placeholder.svg"}
            alt={category.strCategory}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-xl mb-1">{category.strCategory}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{category.strCategoryDescription}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
