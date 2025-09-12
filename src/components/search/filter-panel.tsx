"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SearchFilters } from "./search-interface"
import { mealDbApi } from "@/lib/api/mealDbApi"

interface FilterPanelProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onClose?: () => void
}

interface FilterSection {
  id: keyof SearchFilters
  title: string
  isOpen: boolean
}

export function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    area: false,
    ingredient: false,
  })

  // Fetch filter options
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: mealDbApi.getCategories,
  })

  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: mealDbApi.getAreas,
  })

  const { data: ingredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: mealDbApi.getIngredients,
  })

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleFilterChange = (filterType: keyof SearchFilters, value: string, checked: boolean) => {
    const newFilters = { ...filters }
    if (checked) {
      newFilters[filterType] = value
    } else {
      delete newFilters[filterType]
    }
    onFiltersChange(newFilters)
  }

  const clearSection = (filterType: keyof SearchFilters) => {
    const newFilters = { ...filters }
    delete newFilters[filterType]
    onFiltersChange(newFilters)
  }

  const filterSections = [
    {
      id: "category" as keyof SearchFilters,
      title: "Categories",
      items: categories?.map((cat) => ({ id: cat.strCategory, name: cat.strCategory })) || [],
    },
    {
      id: "area" as keyof SearchFilters,
      title: "Cuisines",
      items: areas?.map((area) => ({ id: area.strArea, name: area.strArea })) || [],
    },
    {
      id: "ingredient" as keyof SearchFilters,
      title: "Ingredients",
      items: ingredients?.slice(0, 20).map((ing) => ({ id: ing.strIngredient, name: ing.strIngredient })) || [],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Done
          </Button>
        )}
      </div>

      {filterSections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{section.title}</span>
              {filters[section.id] && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">1 selected</span>
              )}
            </div>
            <motion.div animate={{ rotate: openSections[section.id] ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openSections[section.id] && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-4 border-t border-border"> 
                  {filters[section.id] && (
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Selected: {filters[section.id]}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSection(section.id)}
                        className="text-xs h-auto p-1"
                      >
                        Clear
                      </Button>
                    </div>
                  )}

                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${section.id}-${item.id}`}
                            checked={filters[section.id] === item.name}
                            onCheckedChange={(checked: boolean) => handleFilterChange(section.id, item.name, checked)}
                          />
                          <label
                            htmlFor={`${section.id}-${item.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {item.name}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
