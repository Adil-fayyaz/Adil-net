"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ParentalControlContextType = {
  safeMode: boolean
  setSafeMode: (mode: boolean) => void
  toggleSafeMode: () => void
  pin: string | null
  setPin: (pin: string) => void
  verifyPin: (inputPin: string) => boolean
  isPinSet: boolean
  showPinDialog: boolean
  setShowPinDialog: (show: boolean) => void
}

const ParentalControlContext = createContext<ParentalControlContextType | undefined>(undefined)

export function ParentalControlProvider({ children }: { children: ReactNode }) {
  const [safeMode, setSafeMode] = useState(true)
  const [pin, setPin] = useState<string | null>(null)
  const [showPinDialog, setShowPinDialog] = useState(false)

  useEffect(() => {
    // Carica le impostazioni dalle preferenze dell'utente
    const savedSafeMode = localStorage.getItem("adilnet_safemode")
    const savedPin = localStorage.getItem("adilnet_pin")

    if (savedSafeMode !== null) {
      setSafeMode(savedSafeMode === "true")
    }

    if (savedPin) {
      setPin(savedPin)
    }
  }, [])

  const toggleSafeMode = () => {
    // Se il PIN è impostato e si sta disattivando la modalità sicura, mostra il dialogo PIN
    if (pin && safeMode) {
      setShowPinDialog(true)
      return
    }

    // Altrimenti, cambia direttamente la modalità
    const newMode = !safeMode
    setSafeMode(newMode)
    localStorage.setItem("adilnet_safemode", String(newMode))
  }

  const verifyPin = (inputPin: string) => {
    if (inputPin === pin) {
      setSafeMode(false)
      localStorage.setItem("adilnet_safemode", "false")
      setShowPinDialog(false)
      return true
    }
    return false
  }

  const updatePin = (newPin: string) => {
    setPin(newPin)
    localStorage.setItem("adilnet_pin", newPin)
  }

  return (
    <ParentalControlContext.Provider
      value={{
        safeMode,
        setSafeMode: (mode) => {
          setSafeMode(mode)
          localStorage.setItem("adilnet_safemode", String(mode))
        },
        toggleSafeMode,
        pin,
        setPin: updatePin,
        verifyPin,
        isPinSet: !!pin,
        showPinDialog,
        setShowPinDialog,
      }}
    >
      {children}
    </ParentalControlContext.Provider>
  )
}

export function useParentalControl() {
  const context = useContext(ParentalControlContext)
  if (context === undefined) {
    throw new Error("useParentalControl deve essere usato all'interno di un ParentalControlProvider")
  }
  return context
}
