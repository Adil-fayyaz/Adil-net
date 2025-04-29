"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface MovieRowProps {
  title: string
  category: string
}

export function MovieRow({ title, category }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const isMobile = useMobile()

  // Generate movie data based on category
  const movies = Array.from({ length: 10 }, (_, i) => ({
    id: `${category}-${i}`,
    title: `Movie ${i + 1}`,
    image: `/placeholder.svg?height=400&width=300&text=${category}-${i + 1}`,
  }))

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-2 px-4 md:px-8">
      <h2 className="text-xl font-semibold text-white/90">{title}</h2>

      <div className="group relative">
        {!isMobile && (
          <>
            <Button
              className={cn(
                "absolute left-0 top-0 bottom-0 z-40 h-full w-12 bg-black/30 hover:bg-black/50",
                !isMoved && "hidden",
              )}
              onClick={() => handleClick("left")}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              className="absolute right-0 top-0 bottom-0 z-40 h-full w-12 bg-black/30 hover:bg-black/50"
              onClick={() => handleClick("right")}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}

        <div ref={rowRef} className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[180px] md:min-w-[200px] h-28 md:h-32 transition duration-200 ease-out md:hover:scale-105"
            >
              <Link href={`/movie/${movie.id}`}>
                <div className="relative h-28 md:h-32 rounded overflow-hidden">
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
