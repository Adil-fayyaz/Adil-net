"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeMode = "dark" | "light"

type ThemeContextType = {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark")

  useEffect(() => {
    // Carica il tema dalle preferenze dell'utente
    const savedTheme = localStorage.getItem("adilnet_theme") as ThemeMode | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("light-theme", savedTheme === "light")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("adilnet_theme", newTheme)
    document.documentElement.classList.toggle("light-theme", newTheme === "light")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeMode deve essere usato all'interno di un ThemeModeProvider")
  }
  return context
}
