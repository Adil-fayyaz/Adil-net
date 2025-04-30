"use client"

import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useThemeMode } from "@/lib/theme-context"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode()
  const { getRgbColor } = useRgbEffect()
  const isDark = theme === "dark"

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative h-8 w-16 rounded-full p-1 transition-colors duration-200"
      style={{
        background: isDark
          ? `linear-gradient(135deg, #000, ${getRgbColor(240)}50)`
          : `linear-gradient(135deg, ${getRgbColor(60)}50, #fff)`,
        boxShadow: `0 0 10px ${isDark ? getRgbColor(240) : getRgbColor(60)}50`,
        border: `1px solid ${isDark ? getRgbColor(240) : getRgbColor(60)}50`,
      }}
    >
      <span className="sr-only">{isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}</span>
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        animate={{ x: isDark ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${getRgbColor(180)}, ${getRgbColor(240)})`
            : `linear-gradient(135deg, ${getRgbColor(30)}, ${getRgbColor(60)})`,
          boxShadow: `0 0 10px ${isDark ? getRgbColor(210) : getRgbColor(45)}`,
        }}
      >
        {isDark ? <Moon className="h-4 w-4 text-white" /> : <Sun className="h-4 w-4 text-white" />}
      </motion.div>
    </motion.button>
  )
}
