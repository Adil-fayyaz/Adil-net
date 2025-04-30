"use client"

import { useRgbEffect } from "@/hooks/use-rgb-effect"

interface RatingBadgeProps {
  rating: number
  size?: "sm" | "md" | "lg"
}

export function RatingBadge({ rating, size = "md" }: RatingBadgeProps) {
  const { getRgbColor } = useRgbEffect()

  // Determina il colore in base al rating
  const getColorByRating = () => {
    if (rating <= 7) return getRgbColor(120) // Verde per tutti
    if (rating <= 13) return getRgbColor(60) // Giallo per 7+
    if (rating <= 16) return getRgbColor(30) // Arancione per 13+
    return getRgbColor(0) // Rosso per 16+
  }

  // Determina la dimensione
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-sm",
    lg: "px-3 py-1.5 text-base font-bold",
  }

  return (
    <span
      className={`rounded font-medium ${sizeClasses[size]}`}
      style={{
        background: getColorByRating(),
        color: "#fff",
        boxShadow: `0 0 10px ${getColorByRating()}`,
      }}
    >
      {rating}+
    </span>
  )
}
