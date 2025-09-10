"use client"

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <BackgroundImage />

      <section className="py-32 flex justify-center items-center flex-col gap-6 px-6 ">
        
      </section>
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="min-h-[20rem] w-full fixed top-[20rem] -z-10">
      <div className="min-h-[20rem] w-full bg-background relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "hsl(var(--background))",
            backgroundImage: `
              linear-gradient(to right, rgba(75, 85, 99, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(75, 85, 99, 0.2) 1px, transparent 1px)
              `,

            backgroundSize: "40px 40px",
            backgroundPosition: "10px 20px",
          }}
        />
        {/* Your Content/Components */}
      </div>
    </div>
  );
}
