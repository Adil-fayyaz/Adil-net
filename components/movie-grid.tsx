"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

interface Movie {
  id: string
  title: string
  genre: string
  rating: number
  year: number
  image: string
}

interface MovieGridProps {
  movies: Movie[]
  isLoading?: boolean
}

export function MovieGrid({ movies, isLoading = false }: MovieGridProps) {
  const { getRgbColor } = useRgbEffect()
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2
          className="h-12 w-12 animate-spin mb-4"
          style={{
            color: getRgbColor(),
            filter: `drop-shadow(0 0 8px ${getRgbColor()})`,
          }}
        />
        <p
          className="text-lg"
          style={{
            color: getRgbColor(180),
            textShadow: `0 0 5px ${getRgbColor(180)}`,
          }}
        >
          Caricamento film...
        </p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p
          className="text-xl mb-4"
          style={{
            color: getRgbColor(),
            textShadow: `0 0 5px ${getRgbColor()}`,
          }}
        >
          Nessun film corrisponde ai filtri selezionati
        </p>
        <p className="text-gray-400">Prova a modificare i filtri per vedere più risultati.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative group"
          onMouseEnter={() => setHoveredMovie(movie.id)}
          onMouseLeave={() => setHoveredMovie(null)}
        >
          <Link href={`/movie/${movie.id}`}>
            <div
              className="relative aspect-[2/3] rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{
                border: `2px solid ${getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36)}`,
                boxShadow: `0 0 15px ${getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36)}`,
                transition: "all 0.3s ease",
              }}
            >
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />

              {/* Overlay con informazioni */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-300 ${
                  hoveredMovie === movie.id ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `linear-gradient(to top, ${getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36)}CC, transparent)`,
                }}
              >
                <div className="flex justify-end">
                  <span
                    className="px-2 py-1 text-xs rounded"
                    style={{
                      background: movie.rating > 13 ? getRgbColor(0) : getRgbColor(120),
                      color: "#fff",
                      boxShadow: `0 0 10px ${movie.rating > 13 ? getRgbColor(0) : getRgbColor(120)}`,
                    }}
                  >
                    {movie.rating}+
                  </span>
                </div>

                <div>
                  <h3
                    className="font-bold text-white mb-1"
                    style={{
                      textShadow: `0 0 10px ${getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36)}`,
                    }}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">{movie.year}</span>
                    <span
                      className="text-xs"
                      style={{
                        color: getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36 + 180),
                        textShadow: `0 0 5px ${getRgbColor(Number.parseInt(movie.id.split("-")[1]) * 36 + 180)}`,
                      }}
                    >
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Pulsanti che appaiono al passaggio del mouse */}
          <div
            className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 transform translate-y-full transition-transform duration-300 ${
              hoveredMovie === movie.id ? "group-hover:-translate-y-2" : ""
            }`}
          >
            <Button
              size="sm"
              className="w-full text-black hover:bg-white/90"
              style={{
                background: getRgbColor(0),
                boxShadow: `0 0 15px ${getRgbColor(0)}`,
              }}
            >
              <Play className="h-4 w-4 mr-1" /> Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full text-white border-none hover:bg-gray-500/60"
              style={{
                background: `${getRgbColor(180)}40`,
                boxShadow: `0 0 15px ${getRgbColor(180)}80`,
              }}
            >
              <Info className="h-4 w-4 mr-1" /> Info
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
