"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { Search, X, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterPanel } from "./filter-panel"
import { SearchResults } from "./search-results"
import { RecentSearches } from "./recent-searches"
import { mealDbApi } from "@/lib/api/mealdb"
import { useDebounce } from "@/hooks/use-debounce"

export interface SearchFilters {
  category?: string
  area?: string
  ingredient?: string
}

export function SearchInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get("category") || undefined,
    area: searchParams.get("area") || undefined,
    ingredient: searchParams.get("ingredient") || undefined,
  })
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Search results query
  const {
    data: searchResults,
    isLoading: isSearching,
    error,
  } = useQuery({
    queryKey: ["search", debouncedSearchQuery, filters],
    queryFn: async () => {
      if (!debouncedSearchQuery && !filters.category && !filters.area && !filters.ingredient) {
        return []
      }

      // Priority: direct search > category filter > area filter > ingredient filter
      if (debouncedSearchQuery) {
        return await mealDbApi.searchByName(debouncedSearchQuery)
      } else if (filters.category) {
        return await mealDbApi.filterByCategory(filters.category)
      } else if (filters.area) {
        return await mealDbApi.filterByArea(filters.area)
      } else if (filters.ingredient) {
        return await mealDbApi.filterByIngredient(filters.ingredient)
      }

      return []
    },
    enabled: !!(debouncedSearchQuery || filters.category || filters.area || filters.ingredient),
  })

  // Update URL when search or filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearchQuery) params.set("q", debouncedSearchQuery)
    if (filters.category) params.set("category", filters.category)
    if (filters.area) params.set("area", filters.area)
    if (filters.ingredient) params.set("ingredient", filters.ingredient)

    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search"
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearchQuery, filters, router])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setShowRecentSearches(false)
      // Clear filters when doing text search
      setFilters({})
    }
  }, [])

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters)
    // Clear search query when using filters
    if (Object.values(newFilters).some(Boolean)) {
      setSearchQuery("")
    }
  }, [])

  const clearAllFilters = () => {
    setSearchQuery("")
    setFilters({})
    setShowRecentSearches(false)
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length
  const hasActiveSearch = debouncedSearchQuery || activeFiltersCount > 0

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Sticky Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search recipes, ingredients, or cuisines..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowRecentSearches(true)}
                className="pl-12 pr-12 py-3 text-base rounded-full border-2 focus:border-primary transition-all duration-300"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => handleSearch("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Recent Searches Dropdown */}
            <AnimatePresence>
              {showRecentSearches && !searchQuery && (
                <RecentSearches onSelectSearch={handleSearch} onClose={() => setShowRecentSearches(false)} />
              )}
            </AnimatePresence>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-2">
            {/* Desktop Filter Toggle */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Filter Sheet */}
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filter Recipes</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={handleFilterChange}
                    onClose={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Clear All */}
            {hasActiveSearch && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {filters.category}
                  <button
                    onClick={() => handleFilterChange({ ...filters, category: undefined })}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.area && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Cuisine: {filters.area}
                  <button
                    onClick={() => handleFilterChange({ ...filters, area: undefined })}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.ingredient && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Ingredient: {filters.ingredient}
                  <button
                    onClick={() => handleFilterChange({ ...filters, ingredient: undefined })}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-32">
            <FilterPanel filters={filters} onFiltersChange={handleFilterChange} />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1">
          <SearchResults
            results={searchResults || []}
            isLoading={isSearching}
            error={error}
            searchQuery={debouncedSearchQuery}
            hasFilters={activeFiltersCount > 0}
          />
        </div>
      </div>
    </div>
  )
}
