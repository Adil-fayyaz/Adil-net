"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { RgbProvider } from "@/lib/rgb-context"
import { ThemeModeProvider } from "@/lib/theme-context"
import { ParentalControlProvider } from "@/lib/parental-control-context"
import { RgbSpeedControl } from "@/components/rgb-speed-control"
import { AiChat } from "@/components/ai-chat"
import { SplashScreen } from "@/components/splash-screen"
import { PinDialog } from "@/components/pin-dialog"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Controlla se è la prima visita o se è passato abbastanza tempo dall'ultima visita
    const lastVisit = localStorage.getItem("adilnet_last_visit")
    const now = Date.now()
    const showSplashScreen = !lastVisit || now - Number.parseInt(lastVisit) > 1000 * 60 * 60 // 1 ora

    if (!showSplashScreen) {
      setShowSplash(false)
    }

    // Aggiorna il timestamp dell'ultima visita
    localStorage.setItem("adilnet_last_visit", now.toString())
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ThemeModeProvider>
        <AuthProvider>
          <RgbProvider>
            <ParentalControlProvider>
              {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              ) : (
                <>
                  {children}
                  <RgbSpeedControl />
                  <AiChat />
                  <PinDialog />
                </>
              )}
            </ParentalControlProvider>
          </RgbProvider>
        </AuthProvider>
      </ThemeModeProvider>
    </ThemeProvider>
  )
}
