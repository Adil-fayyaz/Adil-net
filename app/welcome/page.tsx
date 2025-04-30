"use client"

import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/animated-logo"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 md:p-6">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Scegli il tuo piano</h1>

        <div className="max-w-2xl mx-auto space-y-6 mb-8">
          <div className="flex items-start">
            <Check className="h-6 w-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
            <p className="text-white text-lg md:text-xl text-left">Guarda quanto vuoi. Senza pubblicità.</p>
          </div>

          <div className="flex items-start">
            <Check className="h-6 w-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
            <p className="text-white text-lg md:text-xl text-left">Consigli personalizzati solo per te.</p>
          </div>

          <div className="flex items-start">
            <Check className="h-6 w-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
            <p className="text-white text-lg md:text-xl text-left">
              Cambia o disdici il tuo piano in qualsiasi momento.
            </p>
          </div>
        </div>

        <div className="w-full max-w-xl space-y-4">
          <Button
            onClick={() => router.push("/plans")}
            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg"
          >
            Vedi i piani
          </Button>

          <p className="text-gray-400 text-sm">Solo i nuovi membri possono usufruire di questa offerta.</p>
        </div>
      </div>
    </div>
  )
}
