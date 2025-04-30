"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  const { getRgbColor } = useRgbEffect()

  return (
    <Button
      className="fixed bottom-4 left-4 z-50 rounded-full w-14 h-14 p-0 flex items-center justify-center"
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
        boxShadow: `0 0 15px ${getRgbColor(90)}`,
        border: `2px solid ${getRgbColor(270)}`,
      }}
    >
      <Sparkles
        className="h-6 w-6"
        style={{
          color: "#fff",
          filter: `drop-shadow(0 0 5px ${getRgbColor(0)})`,
        }}
      />
    </Button>
  )
}
