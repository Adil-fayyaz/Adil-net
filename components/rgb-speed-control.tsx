"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { useRgbContext } from "@/lib/rgb-context"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

export function RgbSpeedControl() {
  const { speed, setSpeed } = useRgbContext()
  const { getRgbColor, getRgbShadow } = useRgbEffect()
  const [isOpen, setIsOpen] = useState(false)

  // Invertiamo il valore per l'interfaccia utente (più alto = più lento)
  const displayValue = 110 - speed

  const handleSpeedChange = (value: number[]) => {
    // Invertiamo nuovamente il valore per il sistema (più basso = più veloce)
    setSpeed(110 - value[0])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
          boxShadow: `0 0 15px ${getRgbColor(90)}`,
          border: `2px solid ${getRgbColor(270)}`,
        }}
      >
        <span
          className="text-xl font-bold"
          style={{
            color: "#fff",
            textShadow: getRgbShadow("#fff"),
          }}
        >
          RGB
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute bottom-16 right-0 p-4 rounded-lg w-64"
          style={{
            background: `linear-gradient(135deg, #000000, ${getRgbColor(180)}50)`,
            boxShadow: `0 0 20px ${getRgbColor(180)}50`,
            border: `1px solid ${getRgbColor(180)}50`,
          }}
        >
          <div className="mb-2 flex justify-between">
            <span
              style={{
                color: getRgbColor(0),
                textShadow: `0 0 5px ${getRgbColor(0)}`,
              }}
            >
              Velocità RGB
            </span>
            <span
              style={{
                color: getRgbColor(180),
                textShadow: `0 0 5px ${getRgbColor(180)}`,
              }}
            >
              {displayValue}%
            </span>
          </div>

          <div className="py-4">
            <Slider
              defaultValue={[displayValue]}
              max={100}
              min={10}
              step={1}
              value={[displayValue]}
              onValueChange={handleSpeedChange}
              className="w-full"
              styles={{
                track: {
                  background: `linear-gradient(to right, ${getRgbColor(0)}, ${getRgbColor(180)})`,
                },
                thumb: {
                  background: getRgbColor(270),
                  border: `2px solid #fff`,
                  boxShadow: `0 0 10px ${getRgbColor(270)}`,
                },
              }}
            />
          </div>

          <div className="flex justify-between text-xs">
            <span
              style={{
                color: getRgbColor(0),
                textShadow: `0 0 5px ${getRgbColor(0)}`,
              }}
            >
              Veloce
            </span>
            <span
              style={{
                color: getRgbColor(180),
                textShadow: `0 0 5px ${getRgbColor(180)}`,
              }}
            >
              Lento
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
