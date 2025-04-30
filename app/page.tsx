"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Info, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MovieRow } from "@/components/movie-row"
import { Navbar } from "@/components/navbar"
import { HeroBackgroundText } from "@/components/hero-background-text"
import { useAuth } from "@/lib/auth-context"
import { AnimatedLogo } from "@/components/animated-logo"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { RgbPresetButtons } from "@/components/rgb-preset-buttons"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { getRgbColor } = useRgbEffect()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <AnimatedLogo />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, #000 0%, ${getRgbColor(180)}20 50%, #000 100%)`,
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
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

        {/* Animated Background Text */}
        <HeroBackgroundText />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-16 space-y-4 max-w-3xl z-20">
          <h1
            className="text-4xl md:text-6xl font-bold"
            style={{
              color: getRgbColor(90),
              textShadow: `0 0 10px ${getRgbColor(90)}, 0 0 20px ${getRgbColor(90)}`,
              transition: "color 0.1s ease, text-shadow 0.1s ease",
            }}
          >
            Stranger Things
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{
              color: "#fff",
              textShadow: `0 0 5px ${getRgbColor(45)}`,
            }}
          >
            Hey Welcome to Adil Net watch any film in your language
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
                background: `${getRgbColor(180)}40`,
                boxShadow: `0 0 15px ${getRgbColor(180)}80`,
                transition: "background 0.1s ease, box-shadow 0.1s ease",
              }}
            >
              <Info className="mr-2 h-5 w-5" /> More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 -mt-16 pb-16 space-y-8">
        <div className="px-4 md:px-8 pt-4">
          <RgbPresetButtons />
        </div>
        <MovieRow title="Popular on ADIL NET" category="popular" />
        <MovieRow title="Trending Now" category="trending" />
        <MovieRow title="New Releases" category="new" />
        <MovieRow title="Watch Again" category="watch-again" />
        <MovieRow title="My List" category="my-list" />
      </div>
    </div>
  )
}
