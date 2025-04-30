"use client"

import { useRgbEffect } from "@/hooks/use-rgb-effect"

export function HeroBackgroundText() {
  // Utilizziamo un offset negativo per rendere questo effetto più veloce rispetto agli altri
  const { getRgbColor } = useRgbEffect(-20)

  const rgbColor = getRgbColor()

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <span
        className="text-7xl md:text-9xl font-bold opacity-30"
        style={{
          color: rgbColor,
          textShadow: `
            0 0 10px ${rgbColor},
            0 0 20px ${rgbColor},
            0 0 30px ${rgbColor},
            0 0 40px ${rgbColor},
            0 0 50px ${rgbColor}
          `,
          transition: "color 0.1s ease, text-shadow 0.1s ease",
        }}
      >
        WELCOME ADIL NET
      </span>
    </div>
  )
}
