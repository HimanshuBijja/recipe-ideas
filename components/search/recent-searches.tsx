"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RecentSearchesProps {
  onSelectSearch: (query: string) => void
  onClose: () => void
}

export function RecentSearches({ onSelectSearch, onClose }: RecentSearchesProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  const removeSearch = (searchToRemove: string) => {
    const updated = recentSearches.filter((search) => search !== searchToRemove)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  const clearAll = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden"
    >
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Searches
        </span>
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-auto p-1">
          Clear All
        </Button>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {recentSearches.map((search, index) => (
          <motion.div
            key={search}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors group"
          >
            <button
              onClick={() => {
                onSelectSearch(search)
                onClose()
              }}
              className="flex-1 text-left text-sm"
            >
              {search}
            </button>
            <button
              onClick={() => removeSearch(search)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
