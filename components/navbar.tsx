"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, ChevronDown, Search, Sparkles, Film, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedLogo } from "./animated-logo"
import { useAuth } from "@/lib/auth-context"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { ThemeToggle } from "./theme-toggle"
import { ParentalControl } from "./parental-control"
import { useThemeMode } from "@/lib/theme-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { getRgbColor } = useRgbEffect()
  const { theme } = useThemeMode()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navbarBackground = isScrolled
    ? isDark
      ? `linear-gradient(to bottom, #000000, ${getRgbColor(180)}30)`
      : `linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.8))`
    : "transparent"

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: navbarBackground,
        boxShadow: isScrolled ? `0 4px 15px ${getRgbColor(180)}50` : "none",
      }}
    >
      <div className="flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center gap-8">
          <AnimatedLogo />

          {!isMobile && user && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm hover:text-white"
                style={{
                  color: getRgbColor(0),
                  textShadow: `0 0 5px ${getRgbColor(0)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="text-sm hover:text-white flex items-center"
                style={{
                  color: getRgbColor(60),
                  textShadow: `0 0 5px ${getRgbColor(60)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                <Film className="h-4 w-4 mr-1" /> Film
              </Link>
              <Link
                href="/tv-shows"
                className="text-sm hover:text-white"
                style={{
                  color: getRgbColor(120),
                  textShadow: `0 0 5px ${getRgbColor(120)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                Serie TV
              </Link>
              <Link
                href="/new"
                className="text-sm hover:text-white"
                style={{
                  color: getRgbColor(180),
                  textShadow: `0 0 5px ${getRgbColor(180)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                Nuovi e popolari
              </Link>
              <Link
                href="/my-list"
                className="text-sm hover:text-white"
                style={{
                  color: getRgbColor(240),
                  textShadow: `0 0 5px ${getRgbColor(240)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                La mia lista
              </Link>
              <Link
                href="/ai"
                className="text-sm hover:text-white flex items-center"
                style={{
                  color: getRgbColor(300),
                  textShadow: `0 0 5px ${getRgbColor(300)}`,
                  transition: "color 0.1s ease, text-shadow 0.1s ease",
                }}
              >
                <Sparkles className="h-4 w-4 mr-1" /> AI Assistant
              </Link>
            </nav>
          )}

          {isMobile && user && (
            <div
              className="flex items-center gap-2"
              style={{
                color: getRgbColor(),
                textShadow: `0 0 5px ${getRgbColor()}`,
              }}
            >
              <span className="text-sm">Sfoglia</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && user && (
            <>
              <ThemeToggle />
              <ParentalControl />
            </>
          )}

          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-white"
                style={{
                  color: getRgbColor(60),
                  textShadow: `0 0 5px ${getRgbColor(60)}`,
                }}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:text-white"
                style={{
                  color: getRgbColor(120),
                  textShadow: `0 0 5px ${getRgbColor(120)}`,
                }}
              >
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar
                      className="h-8 w-8"
                      style={{
                        border: `2px solid ${getRgbColor(180)}`,
                        boxShadow: `0 0 10px ${getRgbColor(180)}`,
                      }}
                    >
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback
                        style={{
                          background: `linear-gradient(135deg, ${getRgbColor(180)}, ${getRgbColor(240)})`,
                        }}
                      >
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      className="h-4 w-4"
                      style={{
                        color: getRgbColor(240),
                        textShadow: `0 0 5px ${getRgbColor(240)}`,
                      }}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`border-gray-800 ${isDark ? "text-white" : "text-gray-800"}`}
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, #000000, ${getRgbColor(180)}50)`
                      : `linear-gradient(135deg, #ffffff, ${getRgbColor(180)}20)`,
                    boxShadow: `0 0 20px ${getRgbColor(180)}50`,
                    border: `1px solid ${getRgbColor(180)}50`,
                  }}
                >
                  <DropdownMenuItem
                    className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                    style={{
                      color: getRgbColor(0),
                      textShadow: `0 0 5px ${getRgbColor(0)}`,
                    }}
                  >
                    <Link href="/profiles" className="flex items-center w-full">
                      Profili
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                    style={{
                      color: getRgbColor(60),
                      textShadow: `0 0 5px ${getRgbColor(60)}`,
                    }}
                  >
                    <Link href="/account" className="flex items-center w-full">
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                    style={{
                      color: getRgbColor(120),
                      textShadow: `0 0 5px ${getRgbColor(120)}`,
                    }}
                  >
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings className="h-4 w-4 mr-2" /> Impostazioni
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                    style={{
                      color: getRgbColor(180),
                      textShadow: `0 0 5px ${getRgbColor(180)}`,
                    }}
                  >
                    <Link href="/help" className="flex items-center w-full">
                      Centro assistenza
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator
                    className="bg-gray-800"
                    style={{
                      background: getRgbColor(180),
                      boxShadow: `0 0 5px ${getRgbColor(180)}`,
                    }}
                  />
                  {isMobile && (
                    <>
                      <DropdownMenuItem
                        className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                        style={{
                          color: getRgbColor(240),
                          textShadow: `0 0 5px ${getRgbColor(240)}`,
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>Tema</span>
                          <ThemeToggle />
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                        style={{
                          color: getRgbColor(300),
                          textShadow: `0 0 5px ${getRgbColor(300)}`,
                        }}
                      >
                        <div className="w-full">
                          <ParentalControl />
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator
                        className="bg-gray-800"
                        style={{
                          background: getRgbColor(180),
                          boxShadow: `0 0 5px ${getRgbColor(180)}`,
                        }}
                      />
                    </>
                  )}
                  <DropdownMenuItem
                    className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                    onClick={handleLogout}
                    style={{
                      color: getRgbColor(240),
                      textShadow: `0 0 5px ${getRgbColor(240)}`,
                    }}
                  >
                    Esci da ADIL NET
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              className="text-white"
              style={{
                background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(60)})`,
                boxShadow: `0 0 15px ${getRgbColor(30)}`,
                border: `1px solid ${getRgbColor(30)}`,
                transition: "all 0.1s ease",
              }}
            >
              Accedi
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
