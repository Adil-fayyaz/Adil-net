"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PlusCircle } from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { AnimatedLogo } from "@/components/animated-logo"

const profileImages = [
  "/placeholder.svg?height=150&width=150&text=1",
  "/placeholder.svg?height=150&width=150&text=2",
  "/placeholder.svg?height=150&width=150&text=3",
  "/placeholder.svg?height=150&width=150&text=4",
  "/placeholder.svg?height=150&width=150&text=5",
]

export default function ProfilesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profiles] = useState([
    { id: 1, name: user?.name || "Utente", image: profileImages[0] },
    { id: 2, name: "Bambini", image: profileImages[1] },
  ])

  const handleProfileSelect = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 md:p-6 flex justify-center">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl md:text-4xl text-white mb-8">Chi sta guardando?</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {profiles.map((profile) => (
            <button key={profile.id} onClick={handleProfileSelect} className="group flex flex-col items-center">
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-md overflow-hidden mb-2 group-hover:border-2 group-hover:border-white">
                <Image src={profile.image || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
              </div>
              <span className="text-gray-400 group-hover:text-white">{profile.name}</span>
            </button>
          ))}

          <button className="flex flex-col items-center">
            <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-md flex items-center justify-center border-2 border-gray-600 hover:border-white mb-2">
              <PlusCircle className="h-16 w-16 text-gray-600 hover:text-white" />
            </div>
            <span className="text-gray-400 hover:text-white">Aggiungi profilo</span>
          </button>
        </div>

        <button className="mt-12 px-6 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white">
          Gestisci profili
        </button>
      </div>
    </div>
  )
}
