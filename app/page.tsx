"use client"

import { HeroSection } from "@/components/home/hero-section"
import { QuickFilters } from "@/components/home/quick-filters"
import { FeaturedRecipes } from "@/components/home/featured-recipes"
import { CategoriesSection } from "@/components/home/categories-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuickFilters />
      <FeaturedRecipes />
      <CategoriesSection />
    </div>
  )
}
