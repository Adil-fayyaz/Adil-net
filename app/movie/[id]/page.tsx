import Link from "next/link"
import { ArrowLeft, Play, Plus, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { MovieRow } from "@/components/movie-row"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = params

  // In a real app, you would fetch movie details based on the ID
  const movieTitle = `Movie ${id.split("-")[1] || ""}`

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-16 h-[70vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=${id}')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-6 md:p-16 space-y-4 max-w-3xl">
          <Link href="/" className="flex items-center text-white/70 hover:text-white mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold">{movieTitle}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500">98% Match</span>
            <span>2023</span>
            <span className="border border-white/40 px-1">TV-MA</span>
            <span>3 Seasons</span>
          </div>

          <p className="text-lg max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
            aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              <Play className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button size="lg" variant="outline" className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60">
              <Plus className="mr-2 h-5 w-5" /> My List
            </Button>
            <Button size="lg" variant="outline" className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60">
              <ThumbsUp className="mr-2 h-5 w-5" /> Rate
            </Button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 pb-16 space-y-8">
        <div className="px-6 md:px-16 py-8">
          <h2 className="text-xl font-semibold mb-4">About {movieTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <p className="text-white/80 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p className="text-white/80">
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>
            <div>
              <p className="text-white/60 mb-1">
                Cast: <span className="text-white/90">Actor 1, Actor 2, Actor 3</span>
              </p>
              <p className="text-white/60 mb-1">
                Genres: <span className="text-white/90">Drama, Sci-Fi, Thriller</span>
              </p>
              <p className="text-white/60 mb-1">
                This show is: <span className="text-white/90">Suspenseful, Dark</span>
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
