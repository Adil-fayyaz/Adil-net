"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

interface GoogleLoginButtonProps {
  onSuccess: (user: any) => void
  onError?: (error: Error) => void
}

export function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { getRgbColor } = useRgbEffect()

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      // Simuliamo l'accesso con Google
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Utente di esempio
      const mockUser = {
        id: "google-" + Math.random().toString(36).substr(2, 9),
        email: "user@gmail.com",
        name: "Google User",
        profileImage: "/placeholder.svg?height=200&width=200&text=G",
      }

      onSuccess(mockUser)
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full h-12 relative"
      style={{
        background: "#ffffff",
        color: "#000000",
        boxShadow: `0 0 15px ${getRgbColor(180)}30`,
      }}
    >
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <div className="w-6 h-6 relative">
          <Image
            src="/placeholder.svg?height=24&width=24&text=G"
            alt="Google"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
      <span>{isLoading ? "Accesso in corso..." : "Continua con Google"}</span>
    </Button>
  )
}
