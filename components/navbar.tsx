"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedLogo } from "./animated-logo"

export function Navbar() {
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center gap-8">
          <AnimatedLogo />

          {!isMobile && (
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm text-white/90 hover:text-white">
                Home
              </Link>
              <Link href="/tv-shows" className="text-sm text-white/70 hover:text-white">
                TV Shows
              </Link>
              <Link href="/movies" className="text-sm text-white/70 hover:text-white">
                Movies
              </Link>
              <Link href="/new" className="text-sm text-white/70 hover:text-white">
                New & Popular
              </Link>
              <Link href="/my-list" className="text-sm text-white/70 hover:text-white">
                My List
              </Link>
            </nav>
          )}

          {isMobile && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/90">Browse</span>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-red-600">A</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </div>
        </div>
      </div>
    </header>
  )
}
