"use client"

import { motion } from "framer-motion"
import { Heart, Bookmark, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SavedRecipesCarousel } from "./saved-recipes-carousel"
import { FavoritesGrid } from "./favorites-grid"
import { RecentSearchesList } from "./recent-searches-list"

interface UserDashboardProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserDashboard({ user }: UserDashboardProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback className="text-lg">
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.name || "Recipe Enthusiast"}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Recipes</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Saved Recipes Carousel */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Saved Recipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SavedRecipesCarousel />
            </CardContent>
          </Card>
        </motion.div>

        {/* Favorites Grid */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorite Recipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FavoritesGrid limit={6} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Searches */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSearchesList />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
