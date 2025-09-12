"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Bookmark, Share2, Clock, Users, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Meal } from "@/types/Meal";

interface RecipeHeroProps {
  recipe: Meal;
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setIsFavorited(!isFavorited);
    // TODO: Implement API call to save/remove favorite
  };

  const handleSave = () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setIsSaved(!isSaved);
    // TODO: Implement API call to save/remove recipe
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this delicious ${recipe.strMeal} recipe!`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero Image with Ken Burns Effect */}
      <div className="relative  overflow-hidden">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8  justify-between items-center">
          <div className="flex justify-center  items-center max-md:justify-self-center   w-64 sm:w-80 md:w-96 lg:w-[28rem] aspect-square relative">
            <motion.div
              animate={{
                scale: imageLoaded ? [1, 1.05] : 1,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="relative  rounded-full overflow-hidden size-[68%] bg-white outline-white outline-16 shadow-slate-700 shadow-2xl"
            >
              <Image
                src={recipe.strMealThumb || "/placeholder.svg"}
                alt={recipe.strMeal}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </motion.div>
            <div className="absolute aspect-square size-[50%] -z-10 rounded-full bg-secondary bottom-0 left-0" />
            <div className="absolute aspect-square size-[50%] -z-10 rounded-full bg-secondary top-0 right-0" />
          </div>
          {/* Content  */}
          <div className=" ">
            <div className="inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-8 md:pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-4xl"
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-black/12 border-black/32 border-1   "
                    >
                      {recipe.strCategory}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-black/12 border-black/32 border-1   "
                    >
                      {recipe.strArea}
                    </Badge>
                    {recipe.strTags && (
                      <Badge
                        variant="secondary"
                        className="bg-black/12 border-black/32 border-1 
                        
                        "
                      >
                        {recipe.strTags.split(",")[0]}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold  mb-4 text-balance">
                    {recipe.strMeal}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6  mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>45 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>4 servings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5" />
                      <span>Medium</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleFavorite}
                      variant={isFavorited ? "default" : "secondary"}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ scale: isFavorited ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isFavorited ? "fill-current" : ""
                          }`}
                        />
                      </motion.div>
                      {isFavorited ? "Favorited" : "Add to Favorites"}
                    </Button>

                    <Button
                      onClick={handleSave}
                      variant={isSaved ? "default" : "secondary"}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ scale: isSaved ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                        />
                      </motion.div>
                      {isSaved ? "Saved" : "Save Recipe"}
                    </Button>

                    <Button
                      onClick={handleShare}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Gradient Overlay */}

        {/* Content Overlay */}
      </div>
    </section>
  );
}
