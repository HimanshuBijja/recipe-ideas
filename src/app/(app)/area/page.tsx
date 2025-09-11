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
    <div className="min-h-screen w-full relative flex  flex-col items-center max-lg:py-12  overflow-hidden gap-8 px-2 ">
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

      <div className="w-full ">
        <SearchBar />
      </div>

      <Images />
    </div>
  );
}

function Images() {
  return (
    <div className="absolute inset-0 z-10  ">
      <div className="grid grid-rows-6 grid-cols-8 max-md:grid-rows-10 max-md:grid-cols-8 h-screen ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className=" col-span-2 row-span-2 max-md:col-span-3 relative w-[110%] h-[120%] "
        >
          {" "}
          <Image src="/tl.webp" fill className="object-bottom-right object-cover" alt="Background" />
        </motion.div>
        <div className="col-span-4 max-md:col-span-3 max-md:row-span-2 "></div>
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className=" col-span-1 row-span-1 max-md:col-span-2 max-md:row-span-2 relative"
        >
          {" "}
          <Image src="/tr.webp" fill className="object-bottom-left object-cover " alt="Background" />
        </motion.div>
        <div className="row-span-1 max-md:row-span-5 "></div>
        <div className="row-span-3 max-md:col-span-6 max-md:row-span-4 col-span-4"></div>
        <div className="row-span-2 col-span-2 max-md:col-span-1 max-md:row-span-4 "></div>
        <div className="row-span-2 col-span-2 max-md:row-span-1 max-md:col-span-5 "></div>
       
       
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className=" col-span-2 row-span-3 max-md:row-span-3 max-md:col-span-2 relative"
        >
          {" "}
          <Image src="/br.webp" fill className="object-top-left object-cover" alt="Background" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-2 max-md:row-span-2 max-md:col-span-2 relative "
        >
          {" "}
          <Image
            src="/bl.webp"
            fill
            className="object-top-right object-cover "
            alt="Background"
          />
        </motion.div>
        <div className="col-span-4 max-md:row-span-1 max-md:col-span-4 "></div>

       
        <div></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="col-span-2 row-span-1 max-md:row-span-1 max-md:col-span-2 relative  bottom-0"
        >
          {" "}
          <Image src="/r.webp" fill className="object-top object-cover" alt="Background" />
        </motion.div>
        <div></div>
      </div>{" "}
      // allocate different background color to each grid cell copilot
    </div>
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
