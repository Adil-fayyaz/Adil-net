"use client"

import { useRgbContext } from "@/lib/rgb-context"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { Button } from "@/components/ui/button"

export function RgbPresetButtons() {
  const { setSpeed } = useRgbContext()
  const { getRgbColor } = useRgbEffect()

  const presets = [
    { name: "Frenetico", speed: 10 },
    { name: "Veloce", speed: 30 },
    { name: "Normale", speed: 50 },
    { name: "Lento", speed: 70 },
    { name: "Rilassante", speed: 90 },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center my-4">
      {presets.map((preset, index) => (
        <Button
          key={preset.name}
          onClick={() => setSpeed(preset.speed)}
          className="text-white"
          style={{
            background: `linear-gradient(135deg, ${getRgbColor(index * 72)}, ${getRgbColor(index * 72 + 36)})`,
            boxShadow: `0 0 10px ${getRgbColor(index * 72)}`,
            border: `1px solid ${getRgbColor(index * 72 + 18)}`,
          }}
        >
          {preset.name}
        </Button>
      ))}
    </div>
  )
}
