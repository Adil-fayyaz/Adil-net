"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function AnimatedLogo() {
  const [hue, setHue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const rgbColor = `hsl(${hue}, 100%, 50%)`

  return (
    <Link href="/" className="font-bold text-3xl no-underline">
      <span
        style={{
          color: rgbColor,
          textShadow: `
            0 0 10px ${rgbColor},
            0 0 20px ${rgbColor},
            0 0 30px ${rgbColor},
            0 0 40px ${rgbColor}
          `,
          transition: "color 0.1s ease, text-shadow 0.1s ease",
        }}
      >
        WELCOME ADIL NET
      </span>
    </Link>
  )
}
