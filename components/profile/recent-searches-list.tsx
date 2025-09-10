"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface RecentSearch {
  id: string
  query: string
  timestamp: Date
}

export function RecentSearchesList() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      try {
        const searches = JSON.parse(saved)
        const searchObjects = searches.map((query: string, index: number) => ({
          id: `${index}-${query}`,
          query,
          timestamp: new Date(Date.now() - index * 60000), // Mock timestamps
        }))
        setRecentSearches(searchObjects)
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  const removeSearch = (searchId: string) => {
    const updatedSearches = recentSearches.filter((search) => search.id !== searchId)
    setRecentSearches(updatedSearches)

    // Update localStorage
    const queries = updatedSearches.map((search) => search.query)
    localStorage.setItem("recentSearches", JSON.stringify(queries))
  }

  const clearAllSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const handleSearchClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  if (recentSearches.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-2">No Recent Searches</h3>
        <p className="text-sm text-muted-foreground">Your search history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Recent Searches</h4>
        <Button variant="ghost" size="sm" onClick={clearAllSearches} className="text-xs">
          Clear All
        </Button>
      </div>

      <AnimatePresence>
        {recentSearches.map((search, index) => (
          <motion.div
            key={search.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
          >
            <button
              onClick={() => handleSearchClick(search.query)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{search.query}</div>
                <div className="text-xs text-muted-foreground">{search.timestamp.toLocaleDateString()}</div>
              </div>
            </button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeSearch(search.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
