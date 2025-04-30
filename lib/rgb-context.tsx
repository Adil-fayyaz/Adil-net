"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type RgbContextType = {
  speed: number
  setSpeed: (speed: number) => void
}

const RgbContext = createContext<RgbContextType | undefined>(undefined)

export function RgbProvider({ children }: { children: ReactNode }) {
  const [speed, setSpeed] = useState(50) // Valore predefinito: 50ms

  return <RgbContext.Provider value={{ speed, setSpeed }}>{children}</RgbContext.Provider>
}

export function useRgbContext() {
  const context = useContext(RgbContext)
  if (context === undefined) {
    throw new Error("useRgbContext deve essere usato all'interno di un RgbProvider")
  }
  return context
}
