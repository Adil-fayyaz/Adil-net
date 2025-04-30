"use client"

import Link from "next/link"
import { ArrowLeft, Play, Plus, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { MovieRow } from "@/components/movie-row"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { RatingBadge } from "@/components/rating-badge"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = params
  const { getRgbColor, getRgbShadow } = useRgbEffect()

  // In a real app, you would fetch movie details based on the ID
  const movieTitle = `Movie ${id.split("-")[1] || ""}`
  const genre = id.split("-")[0] || "Action"

  // Generate a random rating for demo purposes
  const rating = Math.floor(Math.random() * 18) + 1

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, #000 0%, ${getRgbColor(180)}20 50%, #000 100%)`,
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-16 h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=${id}')`,
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
            backgroundColor: `${getRgbColor()}40`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, #00000080, transparent), 
                          linear-gradient(to top, #000, transparent), 
                          radial-gradient(circle at center, ${getRgbColor()}30, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative h-full flex flex-col justify-end p-6 md:p-16 space-y-4 max-w-3xl">
          <Link
            href="/movies"
            className="flex items-center hover:text-white mb-4"
            style={{
              color: getRgbColor(270),
              textShadow: `0 0 5px ${getRgbColor(270)}`,
            }}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Torna ai Film
          </Link>

          <h1
            className="text-4xl md:text-6xl font-bold"
            style={{
              color: getRgbColor(90),
              textShadow: `0 0 10px ${getRgbColor(90)}, 0 0 20px ${getRgbColor(90)}`,
              transition: "color 0.1s ease, text-shadow 0.1s ease",
            }}
          >
            {movieTitle}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <span
              className="text-green-500"
              style={{
                color: getRgbColor(120),
                textShadow: `0 0 5px ${getRgbColor(120)}`,
              }}
            >
              98% Match
            </span>
            <span
              style={{
                color: getRgbColor(180),
                textShadow: `0 0 5px ${getRgbColor(180)}`,
              }}
            >
              2023
            </span>
            <RatingBadge rating={rating} />
            <span
              style={{
                color: getRgbColor(300),
                textShadow: `0 0 5px ${getRgbColor(300)}`,
              }}
            >
              2h 15m
            </span>
          </div>

          <p
            className="text-lg max-w-2xl"
            style={{
              color: "#fff",
              textShadow: `0 0 5px ${getRgbColor(45)}`,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
            aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              size="lg"
              className="text-black hover:bg-white/90"
              style={{
                background: getRgbColor(0),
                boxShadow: `0 0 15px ${getRgbColor(0)}`,
                transition: "background 0.1s ease, box-shadow 0.1s ease",
              }}
            >
              <Play className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-none hover:bg-gray-500/60"
              style={{
                background: `${getRgbColor(120)}40`,
                boxShadow: `0 0 15px ${getRgbColor(120)}80`,
                transition: "background 0.1s ease, box-shadow 0.1s ease",
              }}
            >
              <Plus className="mr-2 h-5 w-5" /> My List
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-none hover:bg-gray-500/60"
              style={{
                background: `${getRgbColor(240)}40`,
                boxShadow: `0 0 15px ${getRgbColor(240)}80`,
                transition: "background 0.1s ease, box-shadow 0.1s ease",
              }}
            >
              <ThumbsUp className="mr-2 h-5 w-5" /> Rate
            </Button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 pb-16 space-y-8">
        <div
          className="px-6 md:px-16 py-8"
          style={{
            background: `linear-gradient(to right, ${getRgbColor(180)}10, transparent)`,
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              color: getRgbColor(),
              textShadow: getRgbShadow(getRgbColor()),
            }}
          >
            About {movieTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <p
                className="mb-4"
                style={{
                  color: "#fff",
                  textShadow: `0 0 5px ${getRgbColor(45)}`,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p
                style={{
                  color: "#fff",
                  textShadow: `0 0 5px ${getRgbColor(45)}`,
                }}
              >
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>
            <div>
              <p className="mb-1">
                <span
                  style={{
                    color: getRgbColor(60),
                    textShadow: `0 0 5px ${getRgbColor(60)}`,
                  }}
                >
                  Cast:
                </span>{" "}
                <span
                  style={{
                    color: "#fff",
                    textShadow: `0 0 5px ${getRgbColor(90)}`,
                  }}
                >
                  Actor 1, Actor 2, Actor 3
                </span>
              </p>
              <p className="mb-1">
                <span
                  style={{
                    color: getRgbColor(120),
                    textShadow: `0 0 5px ${getRgbColor(120)}`,
                  }}
                >
                  Genres:
                </span>{" "}
                <span
                  style={{
                    color: "#fff",
                    textShadow: `0 0 5px ${getRgbColor(150)}`,
                  }}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}, Drama, Thriller
                </span>
              </p>
              <p className="mb-1">
                <span
                  style={{
                    color: getRgbColor(180),
                    textShadow: `0 0 5px ${getRgbColor(180)}`,
                  }}
                >
                  This movie is:
                </span>{" "}
                <span
                  style={{
                    color: "#fff",
                    textShadow: `0 0 5px ${getRgbColor(210)}`,
                  }}
                >
                  Suspenseful, Dark
                </span>
              </p>
              <p className="mb-1">
                <span
                  style={{
                    color: getRgbColor(240),
                    textShadow: `0 0 5px ${getRgbColor(240)}`,
                  }}
                >
                  Age rating:
                </span>{" "}
                <span
                  style={{
                    color: "#fff",
                    textShadow: `0 0 5px ${getRgbColor(270)}`,
                  }}
                >
                  <RatingBadge rating={rating} size="sm" /> (Contenuto {rating > 13 ? "non " : ""}adatto a minori)
                </span>
              </p>
            </div>
          </div>
        </div>

        <MovieRow title="More Like This" category="similar" />
        <MovieRow title="Popular on ADIL NET" category="popular" />
      </div>
    </div>
  )
}
