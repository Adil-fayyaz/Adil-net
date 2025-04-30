"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/animated-logo"

const plans = [
  {
    id: "basic",
    name: "Base",
    price: "7,99",
    features: {
      quality: "Buona",
      resolution: "720p",
      devices: ["Telefono", "Tablet", "Computer", "TV"],
      simultaneous: 1,
      downloads: 1,
    },
  },
  {
    id: "standard",
    name: "Standard",
    price: "12,99",
    features: {
      quality: "Ottima",
      resolution: "1080p",
      devices: ["Telefono", "Tablet", "Computer", "TV"],
      simultaneous: 2,
      downloads: 2,
    },
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "17,99",
    features: {
      quality: "Eccezionale",
      resolution: "4K+HDR",
      devices: ["Telefono", "Tablet", "Computer", "TV"],
      simultaneous: 4,
      downloads: 6,
    },
  },
]

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard")
  const router = useRouter()

  const handleContinue = () => {
    router.push("/payment")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 md:p-6 border-b border-gray-800">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex flex-col items-center p-4 md:p-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">PASSAGGIO 2 DI 3</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Scegli il piano più adatto a te</h1>
          <div className="flex flex-col items-center space-y-4 text-white">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-red-600 mr-2" />
              <span>Guarda tutto ciò che vuoi senza pubblicità.</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-red-600 mr-2" />
              <span>Cambia o disdici il tuo piano in qualsiasi momento.</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-red-600 mr-2" />
              <span>Ogni piano include l'accesso completo al catalogo.</span>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left"></th>
                {plans.map((plan) => (
                  <th key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    <div
                      className={`cursor-pointer p-4 rounded-md ${
                        selectedPlan === plan.id ? "bg-red-600" : "bg-gray-800"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className="font-bold text-lg">{plan.name}</div>
                      {plan.recommended && <div className="text-xs mt-1 text-gray-300">Consigliato</div>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Prezzo mensile</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.price} €
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Qualità video</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.features.quality}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Risoluzione</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.features.resolution}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Dispositivi supportati</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.features.devices.join(", ")}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Visione simultanea</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.features.simultaneous} {plan.features.simultaneous === 1 ? "dispositivo" : "dispositivi"}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-800">
                <td className="p-4 text-left">Download</td>
                {plans.map((plan) => (
                  <td key={plan.id} className={`p-4 text-center ${selectedPlan === plan.id ? "bg-red-900/30" : ""}`}>
                    {plan.features.downloads} {plan.features.downloads === 1 ? "dispositivo" : "dispositivi"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 w-full max-w-md">
          <Button onClick={handleContinue} className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg">
            Continua
          </Button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            La selezione del piano può essere modificata in qualsiasi momento.
          </p>
        </div>
      </div>
    </div>
  )
}
