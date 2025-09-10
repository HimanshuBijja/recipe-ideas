"use client";

import { Background } from "@/components/background";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <BackgroundImage />

      {/* <section className="py-32 flex justify-center items-center flex-col gap-6 px-6 ">
        
      </section> */}
      <div className="h-screen"></div>
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="min-h-screen w-full relative flex  flex-col items-center max-lg:py-12  overflow-hidden gap-8 px-2">
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
        <div className="pt-48 text-center font-marcellus relative text-7xl max-md:text-4xl text-primary">
          Discover Your Next
          <br />
          Favorite
          <span className="font-italianno text-8xl max-md:text-5xl text-secondary">
            {" "}
            Recipe
          </span>
        </div>
      </motion.div>

      <div className="w-full ">
        <SearchBar />
      </div>

      <Images />
    </div>
  );
}

function Images() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className=" absolute bottom-0 left-0 max-md:-bottom-10 max-md:-left-10 max-md:size-70"
      >
        {" "}
        <Image src="/bl.webp" height={350} width={350} alt="Background" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className=" absolute -bottom-20 right-0 max-md:hidden"
      >
        {" "}
        <Image src="/br.webp" width={450} height={450} alt="Background" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className=" absolute -top-20 right-50 max-md:-top-10 max-md:-right-2 max-md:size-40"
      >
        {" "}
        <Image src="/tr.webp" width={250} height={250} alt="Background" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className=" absolute -top-30 -left-10 max-md:-top-30 max-md:-left-20 max-md:size-70"
      >
        {" "}
        <Image src="/tl.webp" width={400} height={350} alt="Background" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className=" absolute -bottom-30 left-1/2 -translate-x-1/2 max-md:hidden"
      >
        {" "}
        <Image src="/r.webp" width={400} height={350} alt="Background" />
      </motion.div>
    </>
  );
}

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleSearch} className="relative group">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-24 py-6 text-lg max-md:text-sm rounded-full border-2 border-border focus:border-primary transition-all duration-300 bg-background/80 backdrop-blur"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-8 py-[22px] rounded-l-none"
            >
              Search
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
