"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { AnimatedLogo } from "@/components/animated-logo"
import { GoogleLoginButton } from "@/components/google-login-button"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { useThemeMode } from "@/lib/theme-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, error, loading } = useAuth()
  const router = useRouter()
  const { getRgbColor } = useRgbEffect()
  const { theme } = useThemeMode()
  const isDark = theme === "dark"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    router.push("/")
  }

  const handleGoogleSuccess = async (user: any) => {
    // In un'app reale, qui gestiresti l'accesso con Google
    await login(user.email, "google-auth-token")
    router.push("/")
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-black" : "app-bg"}`}>
      <header className="p-4 md:p-6">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-md p-8 rounded-md border ${isDark ? "bg-black/80 border-gray-800" : "app-card"}`}
          style={{
            boxShadow: `0 0 30px ${getRgbColor(180)}30`,
          }}
        >
          <h1
            className="text-3xl font-bold mb-6"
            style={{
              color: getRgbColor(0),
              textShadow: `0 0 5px ${getRgbColor(0)}`,
            }}
          >
            Accedi
          </h1>

          <div className="space-y-6">
            <GoogleLoginButton onSuccess={handleGoogleSuccess} />

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm">oppure</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div
                  className="p-3 rounded-md text-sm"
                  style={{
                    background: `${getRgbColor(0)}20`,
                    border: `1px solid ${getRgbColor(0)}`,
                    color: getRgbColor(0),
                  }}
                >
                  {error}
                </div>
              )}

              <div>
                <Input
                  type="email"
                  placeholder="Email o numero di telefono"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`h-12 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "app-input text-black"}`}
                  style={{
                    borderColor: getRgbColor(180),
                    boxShadow: `0 0 5px ${getRgbColor(180)}50`,
                  }}
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`h-12 pr-10 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "app-input text-black"}`}
                  style={{
                    borderColor: getRgbColor(180),
                    boxShadow: `0 0 5px ${getRgbColor(180)}50`,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-white"
                disabled={loading}
                style={{
                  background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(60)})`,
                  boxShadow: `0 0 15px ${getRgbColor(30)}`,
                }}
              >
                {loading ? "Accesso in corso..." : "Accedi"}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className={`w-4 h-4 rounded ${isDark ? "bg-gray-800 border-gray-700" : "app-input"}`}
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-400">
                    Ricordami
                  </label>
                </div>
                <Link href="/help" className="text-gray-400 hover:underline">
                  Serve aiuto?
                </Link>
              </div>
            </form>

            <div className="mt-8">
              <p className="text-gray-400">
                Nuovo su ADIL NET?{" "}
                <Link
                  href="/signup"
                  className="hover:underline"
                  style={{
                    color: getRgbColor(180),
                    textShadow: `0 0 5px ${getRgbColor(180)}`,
                  }}
                >
                  Iscriviti ora
                </Link>
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Questa pagina è protetta da Google reCAPTCHA per garantire che tu non sia un bot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
