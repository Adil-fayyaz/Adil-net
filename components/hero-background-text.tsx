"use client"

import { useEffect, useState } from "react"

export function HeroBackgroundText() {
  const [hue, setHue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const rgbColor = `hsl(${hue}, 100%, 50%)`

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <span
        className="text-7xl md:text-9xl font-bold opacity-20"
        style={{
          color: rgbColor,
          textShadow: `
            0 0 10px ${rgbColor},
            0 0 20px ${rgbColor},
            0 0 30px ${rgbColor}
          `,
          transition: "color 0.1s ease, text-shadow 0.1s ease",
        }}
      >
        WELCOME ADIL NET
      </span>
    </div>
  )
}
