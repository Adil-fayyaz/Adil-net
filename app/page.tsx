import { Info, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MovieRow } from "@/components/movie-row"
import { Navbar } from "@/components/navbar"
import { HeroBackgroundText } from "@/components/hero-background-text"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Animated Background Text */}
        <HeroBackgroundText />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-16 space-y-4 max-w-3xl z-20">
          <h1 className="text-4xl md:text-6xl font-bold">Stranger Things</h1>
          <p className="text-lg max-w-2xl">Hey Welcome to Adil Net watch any film in your language</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              <Play className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button size="lg" variant="outline" className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60">
              <Info className="mr-2 h-5 w-5" /> More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 -mt-16 pb-16 space-y-8">
        <MovieRow title="Popular on ADIL NET" category="popular" />
        <MovieRow title="Trending Now" category="trending" />
        <MovieRow title="New Releases" category="new" />
        <MovieRow title="Watch Again" category="watch-again" />
        <MovieRow title="My List" category="my-list" />
      </div>
    </div>
  )
}
