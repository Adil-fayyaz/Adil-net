"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedLogo } from "@/components/animated-logo"

export default function PaymentPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simula il processo di pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push("/profiles")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 md:p-6 border-b border-gray-800">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex flex-col items-center p-4 md:p-8 max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">PASSAGGIO 3 DI 3</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Configura il tuo metodo di pagamento</h1>
        </div>

        <div className="w-full bg-gray-900 rounded-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-white font-medium">Carta di credito o debito</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                <Image src="/placeholder.svg?height=24&width=32&text=VISA" alt="Visa" width={32} height={24} />
              </div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                <Image src="/placeholder.svg?height=24&width=32&text=MC" alt="Mastercard" width={32} height={24} />
              </div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=24&width=32&text=AMEX"
                  alt="American Express"
                  width={32}
                  height={24}
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Numero carta"
                required
                className="bg-gray-800 border-gray-700 text-white h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Data di scadenza (MM/AA)"
                required
                className="bg-gray-800 border-gray-700 text-white h-12"
              />
              <Input type="text" placeholder="CVV" required className="bg-gray-800 border-gray-700 text-white h-12" />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Nome sulla carta"
                required
                className="bg-gray-800 border-gray-700 text-white h-12"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
                {loading ? "Elaborazione..." : "Avvia l'abbonamento"}
              </Button>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-400 pt-2">
              <Lock className="h-4 w-4 mr-2" />
              <span>Pagamento sicuro e crittografato</span>
            </div>

            <p className="text-sm text-gray-400 pt-4">
              Cliccando sul pulsante "Avvia l'abbonamento" accetti i nostri Termini di utilizzo e la nostra Informativa
              sulla privacy. Ti addebiteremo l'importo indicato ogni mese fino alla disdetta dell'abbonamento. Puoi
              disdire in qualsiasi momento per evitare addebiti futuri.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
