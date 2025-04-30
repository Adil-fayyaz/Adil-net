"use client"

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParentalControl } from "@/lib/parental-control-context"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

export function ParentalControl() {
  const { safeMode, toggleSafeMode, isPinSet, setShowPinDialog } = useParentalControl()
  const { getRgbColor } = useRgbEffect()

  const handleClick = () => {
    if (!isPinSet) {
      setShowPinDialog(true)
    } else {
      toggleSafeMode()
    }
  }

  return (
    <Button
      variant={safeMode ? "default" : "outline"}
      className="flex items-center gap-2"
      onClick={handleClick}
      style={{
        background: safeMode
          ? `linear-gradient(135deg, ${getRgbColor(120)}, ${getRgbColor(180)})`
          : `${getRgbColor(0)}20`,
        borderColor: safeMode ? getRgbColor(120) : getRgbColor(0),
        color: "#fff",
        boxShadow: safeMode ? `0 0 15px ${getRgbColor(150)}` : `0 0 10px ${getRgbColor(0)}40`,
      }}
    >
      {safeMode ? (
        <ShieldCheck className="h-4 w-4" />
      ) : isPinSet ? (
        <ShieldAlert className="h-4 w-4" />
      ) : (
        <Shield className="h-4 w-4" />
      )}
      {safeMode ? "Modalità Sicura: ON" : "Modalità Sicura: OFF"}
    </Button>
  )
}
