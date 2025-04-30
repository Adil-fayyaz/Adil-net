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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { register, error, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(email, password, name)
    router.push("/profiles")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 md:p-6">
        <AnimatedLogo />
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/80 p-8 rounded-md border border-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-white">Registrati</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 bg-red-900/50 text-red-200 rounded-md text-sm">{error}</div>}

            <div>
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white h-12"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white h-12"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
              {loading ? "Registrazione in corso..." : "Registrati"}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-gray-400">
              Hai già un account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Accedi
              </Link>
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Registrandoti, accetti i nostri Termini di utilizzo e la nostra Informativa sulla privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
