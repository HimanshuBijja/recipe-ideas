"use client"

import { Suspense } from "react"
import { SearchInterface } from "@/components/search/search-interface"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchInterface />
      </Suspense>
    </div>
  )
}
