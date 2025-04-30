"use client"

import { useState, useEffect } from "react"
import { Filter, Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { MovieGrid } from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Generi di film
const genres = [
  "Azione",
  "Avventura",
  "Commedia",
  "Drammatico",
  "Horror",
  "Fantascienza",
  "Romantico",
  "Thriller",
  "Documentario",
  "Animazione",
]

export default function MoviesPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [clearMode, setClearMode] = useState(false)
  const { getRgbColor, getRgbShadow } = useRgbEffect()
  const [isLoading, setIsLoading] = useState(true)

  // Simula il caricamento dei film
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Genera film di esempio per ogni genere
  const generateMovies = () => {
    const allMovies = []

    // Film per ogni genere
    for (let i = 0; i < genres.length; i++) {
      const genreMovies = Array.from({ length: 8 }, (_, j) => ({
        id: `${genres[i].toLowerCase()}-${j}`,
        title: `${genres[i]} ${j + 1}`,
        genre: genres[i],
        rating: Math.floor(Math.random() * 18) + 1, // Rating da 1 a 18
        year: 2010 + Math.floor(Math.random() * 14), // Anno tra 2010 e 2023
        image: `/placeholder.svg?height=400&width=300&text=${genres[i]}-${j + 1}`,
      }))
      allMovies.push(...genreMovies)
    }

    return allMovies
  }

  const allMovies = generateMovies()

  // Filtra i film in base ai generi selezionati e alla modalità chiaro sicuro
  const filteredMovies = allMovies.filter((movie) => {
    // Filtra per genere se ci sono generi selezionati
    const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(movie.genre)

    // Filtra per modalità chiaro sicuro (rating <= 13)
    const ratingMatch = !clearMode || movie.rating <= 13

    return genreMatch && ratingMatch
  })

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, #000 0%, ${getRgbColor(180)}20 50%, #000 100%)`,
      }}
    >
      <Navbar />

      <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: getRgbColor(),
              textShadow: getRgbShadow(getRgbColor()),
            }}
          >
            Tutti i Film
          </h1>

          <div className="flex items-center gap-4">
            {/* Filtro per genere */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{
                    background: `${getRgbColor(60)}20`,
                    borderColor: getRgbColor(60),
                    color: "#fff",
                    boxShadow: `0 0 10px ${getRgbColor(60)}40`,
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Generi
                  {selectedGenres.length > 0 && (
                    <span
                      className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{
                        background: getRgbColor(60),
                        color: "#fff",
                        boxShadow: `0 0 5px ${getRgbColor(60)}`,
                      }}
                    >
                      {selectedGenres.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 border-gray-800"
                style={{
                  background: `linear-gradient(135deg, #000000, ${getRgbColor(180)}30)`,
                  boxShadow: `0 0 20px ${getRgbColor(180)}40`,
                  border: `1px solid ${getRgbColor(180)}50`,
                }}
              >
                <DropdownMenuLabel
                  style={{
                    color: getRgbColor(0),
                    textShadow: `0 0 5px ${getRgbColor(0)}`,
                  }}
                >
                  Filtra per genere
                </DropdownMenuLabel>
                <DropdownMenuSeparator
                  style={{
                    background: getRgbColor(180),
                    boxShadow: `0 0 5px ${getRgbColor(180)}`,
                  }}
                />
                {genres.map((genre) => (
                  <DropdownMenuCheckboxItem
                    key={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() => toggleGenre(genre)}
                    style={{
                      color: selectedGenres.includes(genre) ? getRgbColor(240) : "#fff",
                      textShadow: selectedGenres.includes(genre) ? `0 0 5px ${getRgbColor(240)}` : "none",
                    }}
                  >
                    {genre}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Opzione Chiaro Sicuro */}
            <Button
              variant={clearMode ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setClearMode(!clearMode)}
              style={{
                background: clearMode
                  ? `linear-gradient(135deg, ${getRgbColor(120)}, ${getRgbColor(180)})`
                  : `${getRgbColor(120)}20`,
                borderColor: getRgbColor(120),
                color: "#fff",
                boxShadow: clearMode ? `0 0 15px ${getRgbColor(150)}` : `0 0 10px ${getRgbColor(120)}40`,
              }}
            >
              {clearMode && <Check className="h-4 w-4" />}
              Chiaro Sicuro
            </Button>
          </div>
        </div>

        {/* Informazioni sulla modalità Chiaro Sicuro */}
        {clearMode && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${getRgbColor(120)}20, ${getRgbColor(180)}20)`,
              border: `1px solid ${getRgbColor(150)}50`,
              boxShadow: `0 0 15px ${getRgbColor(150)}30`,
            }}
          >
            <p
              className="text-sm"
              style={{
                color: "#fff",
                textShadow: `0 0 5px ${getRgbColor(150)}`,
              }}
            >
              <span className="font-bold">Modalità Chiaro Sicuro attiva:</span> Vengono mostrati solo contenuti adatti a
              un pubblico di età inferiore ai 13 anni.
            </p>
          </div>
        )}

        {/* Griglia dei film */}
        <MovieGrid movies={filteredMovies} isLoading={isLoading} />
      </div>
    </div>
  )
}
