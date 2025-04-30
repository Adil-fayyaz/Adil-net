"use client"

import { useState, useEffect } from "react"
import { useRgbContext } from "@/lib/rgb-context"

export function useRgbEffect(speedOffset = 0) {
  const [hue, setHue] = useState(0)
  const { speed } = useRgbContext()

  // Calcola la velocità effettiva considerando l'offset
  const effectiveSpeed = Math.max(10, speed + speedOffset)

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360)
    }, effectiveSpeed)

    return () => clearInterval(interval)
  }, [effectiveSpeed])

  const getRgbColor = (offset = 0) => {
    const adjustedHue = (hue + offset) % 360
    return `hsl(${adjustedHue}, 100%, 50%)`
  }

  const getRgbShadow = (color: string) => {
    return `
      0 0 10px ${color},
      0 0 20px ${color},
      0 0 30px ${color}
    `
  }

  return { hue, getRgbColor, getRgbShadow }
}
