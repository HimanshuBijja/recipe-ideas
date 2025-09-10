"use client"

import { motion } from "framer-motion"
import { Utensils, Globe, Carrot, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const filters = [
  {
    type: "Category",
    icon: Utensils,
    label: "By Category",
    description: "Browse by meal type",
    href: "/categories",
    color: "bg-primary/10 hover:bg-primary/20 text-primary",
  },
  {
    type: "Area",
    icon: Globe,
    label: "By Cuisine",
    description: "Explore world flavors",
    href: "/search?filter=area",
    color: "bg-accent/10 hover:bg-accent/20 text-accent-dark",
  },
  {
    type: "Ingredient",
    icon: Carrot,
    label: "By Ingredient",
    description: "Use what you have",
    href: "/search?filter=ingredient",
    color: "bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground",
  },
  {
    type: "Random",
    icon: ChefHat,
    label: "Surprise Me",
    description: "Random discovery",
    href: "/random",
    color: "bg-muted hover:bg-muted/80 text-muted-foreground",
  },
]

export function QuickFilters() {
  const router = useRouter()

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Filters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're craving with our smart filtering options
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {filters.map((filter, index) => (
            <motion.div
              key={filter.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Button
                variant="ghost"
                onClick={() => router.push(filter.href)}
                className={`h-auto p-6 flex flex-col items-center space-y-3 w-full rounded-xl border-2 border-transparent hover:border-border transition-all duration-300 ${filter.color}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <filter.icon className="h-8 w-8" />
                </motion.div>
                <div className="text-center">
                  <div className="font-semibold text-sm md:text-base">{filter.label}</div>
                  <div className="text-xs opacity-70 mt-1">{filter.description}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
