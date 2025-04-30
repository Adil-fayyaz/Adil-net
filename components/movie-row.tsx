"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

interface MovieRowProps {
  title: string
  category: string
}

export function MovieRow({ title, category }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const isMobile = useMobile()
  const { getRgbColor, getRgbShadow } = useRgbEffect()

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
      <h2
        className="text-xl font-semibold"
        style={{
          color: getRgbColor(),
          textShadow: getRgbShadow(getRgbColor()),
          transition: "color 0.1s ease, text-shadow 0.1s ease",
        }}
      >
        {title}
      </h2>

      <div className="group relative">
        {!isMobile && (
          <>
            <Button
              className={cn(
                "absolute left-0 top-0 bottom-0 z-40 h-full w-12 bg-black/30 hover:bg-black/50",
                !isMoved && "hidden",
              )}
              onClick={() => handleClick("left")}
              style={{
                borderLeft: `2px solid ${getRgbColor(180)}`,
                boxShadow: `inset 0 0 10px ${getRgbColor(180)}`,
              }}
            >
              <ChevronLeft className="h-8 w-8" style={{ color: getRgbColor(180) }} />
            </Button>

            <Button
              className="absolute right-0 top-0 bottom-0 z-40 h-full w-12 bg-black/30 hover:bg-black/50"
              onClick={() => handleClick("right")}
              style={{
                borderRight: `2px solid ${getRgbColor(180)}`,
                boxShadow: `inset 0 0 10px ${getRgbColor(180)}`,
              }}
            >
              <ChevronRight className="h-8 w-8" style={{ color: getRgbColor(180) }} />
            </Button>
          </>
        )}

        <div ref={rowRef} className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="min-w-[180px] md:min-w-[200px] h-28 md:h-32 transition duration-200 ease-out md:hover:scale-105"
            >
              <Link href={`/movie/${movie.id}`}>
                <div
                  className="relative h-28 md:h-32 rounded overflow-hidden"
                  style={{
                    border: `2px solid ${getRgbColor(index * 36)}`,
                    boxShadow: `0 0 15px ${getRgbColor(index * 36)}`,
                    transition: "border 0.1s ease, box-shadow 0.1s ease",
                  }}
                >
                  <div
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, ${getRgbColor(index * 36 + 90)}80, ${getRgbColor(index * 36)}80)`,
                    }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{
                        color: "#fff",
                        textShadow: `0 0 10px ${getRgbColor(index * 36)}, 0 0 20px ${getRgbColor(index * 36)}`,
                      }}
                    >
                      {movie.title}
                    </span>
                  </div>
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
