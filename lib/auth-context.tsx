"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  profileImage?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simula il caricamento dell'utente all'avvio
  useEffect(() => {
    const storedUser = localStorage.getItem("adilnet_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user")
      }
    }
    setLoading(false)
  }, [])

  // Funzione di login
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simula una chiamata API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In un'app reale, qui faresti una chiamata API
      if (email && password) {
        // Utente di esempio
        const mockUser: User = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
        }

        setUser(mockUser)
        localStorage.setItem("adilnet_user", JSON.stringify(mockUser))
      } else {
        throw new Error("Email e password sono richiesti")
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante il login")
    } finally {
      setLoading(false)
    }
  }

  // Funzione di registrazione
  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simula una chiamata API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In un'app reale, qui faresti una chiamata API
      if (email && password && name) {
        // Utente di esempio
        const mockUser: User = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          email,
          name,
        }

        setUser(mockUser)
        localStorage.setItem("adilnet_user", JSON.stringify(mockUser))
      } else {
        throw new Error("Tutti i campi sono richiesti")
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante la registrazione")
    } finally {
      setLoading(false)
    }
  }

  // Funzione di logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("adilnet_user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve essere usato all'interno di un AuthProvider")
  }
  return context
}
