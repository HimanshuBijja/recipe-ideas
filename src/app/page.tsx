"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center max-lg:py-12 overflow-hidden gap-8 px-2">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="pt-48 max-md:pt-40 text-center font-marcellus relative text-7xl max-md:text-4xl text-primary">
          Discover Your Next
          <br />
          Favorite
          <span className="font-italianno text-8xl max-md:text-5xl text-secondary">
            {" "}
            Recipe
          </span>
        </div>
      </motion.div>

      <div className="w-full relative z-20">
        <SearchBar />
      </div>
      <div className="relative max-md:hidden z-20">
        <PopularSearches/>
        <Stats/>
      </div>

      <Images />
    </div>
  );
}

function Images() {
  return (
    <div className="absolute inset-0 z-10">
      <div className="grid grid-rows-6 grid-cols-8 max-md:grid-rows-10 max-md:grid-cols-8 h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-2 max-md:col-span-3 relative w-[110%] h-[120%]"
        >
          <Image src="/tl.webp" fill className="object-bottom-right object-cover" alt="Background" />
        </motion.div>
        <div className="col-span-4 max-md:col-span-3 max-md:row-span-2"></div>
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-1 row-span-1 max-md:col-span-2 max-md:row-span-2 relative"
        >
          <Image src="/tr.webp" fill className="object-bottom-left object-cover" alt="Background" />
        </motion.div>
        <div className="row-span-1 max-md:row-span-5"></div>
        <div className="row-span-3 max-md:col-span-6 max-md:row-span-4 col-span-4"></div>
        <div className="row-span-2 col-span-2 max-md:col-span-1 max-md:row-span-4"></div>
        <div className="row-span-2 col-span-2 max-md:row-span-1 max-md:col-span-5"></div>
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-3 max-md:row-span-3 max-md:col-span-2 relative"
        >
          <Image src="/br.webp" fill className="object-top-left object-cover" alt="Background" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-2 max-md:row-span-2 max-md:col-span-2 relative"
        >
          <Image
            src="/bl.webp"
            fill
            className="object-top-right object-cover"
            alt="Background"
          />
        </motion.div>
        <div className="col-span-4 max-md:row-span-1 max-md:col-span-4"></div>

        <div></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-1 max-md:row-span-1 max-md:col-span-2 relative bottom-0"
        >
          <Image src="/r.webp" fill className="object-top object-cover" alt="Background" />
        </motion.div>
        <div></div>
      </div>
    </div>
  );
}

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search triggered with query:", searchQuery); // Debug log
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      console.log("Navigating to:", searchUrl); // Debug log
      router.push(searchUrl);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Button clicked with query:", searchQuery); // Debug log
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      console.log("Navigating to:", searchUrl); // Debug log
      router.push(searchUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="max-w-2xl mx-auto mb-0"
    >
      <form onSubmit={handleSearch} className="relative group">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
          <Input
            type="text"
            placeholder="Search for recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-24 py-6 text-lg max-md:text-sm rounded-full border-2 border-border focus:border-primary transition-all duration-300 bg-background/80 backdrop-blur"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleButtonClick}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-8 py-[22px] rounded-l-none z-10"
          >
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function PopularSearches() {
  const popularSearches = ["Chicken", "Pasta", "Dessert", "Vegetarian", "Quick meals"];
  const router = useRouter();

  const handlePopularSearch = (search: string) => {
    console.log("Popular search clicked:", search); // Debug log
    const searchUrl = `/search?q=${encodeURIComponent(search)}`;
    console.log("Navigating to:", searchUrl); // Debug log
    router.push(searchUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      <span className="text-sm text-muted-foreground flex items-center gap-2 mr-4">
        <TrendingUp className="h-4 w-4" />
        Popular:
      </span>
      {popularSearches.map((search, index) => (
        <motion.button
          key={search}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePopularSearch(search)}
          className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
        >
          {search}
        </motion.button>
      ))}
    </motion.div>
  );
}

function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="grid grid-cols-3 gap-8 max-w-md mx-auto"
    >
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
        <div className="text-sm text-muted-foreground">Recipes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
        <div className="text-sm text-muted-foreground">Countries</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">25+</div>
        <div className="text-sm text-muted-foreground">Categories</div>
      </div>
    </motion.div>
  );
}