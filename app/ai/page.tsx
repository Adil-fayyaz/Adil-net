"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Ciao! Sono l'assistente AI di ADIL NET. Posso aiutarti a trovare film e serie TV, rispondere alle tue domande sulla piattaforma, o semplicemente chiacchierare con te. Come posso aiutarti oggi?",
  },
]

// Risposte predefinite per simulare l'AI
const AI_RESPONSES = [
  "Benvenuto su ADIL NET! Sono qui per aiutarti a trovare i migliori film e serie TV.",
  "Posso consigliarti film in base ai tuoi gusti. Quali generi preferisci?",
  "ADIL NET offre una vasta selezione di contenuti in diverse lingue.",
  "Ti consiglio di guardare 'Stranger Things', è una delle serie più popolari sulla nostra piattaforma.",
  "Vuoi scoprire le nuove uscite di questo mese? Abbiamo aggiunto molti nuovi titoli!",
  "Posso aiutarti a trovare contenuti adatti a tutta la famiglia.",
  "Hai problemi con il tuo account? Posso guidarti nella risoluzione.",
  "ADIL NET è disponibile su tutti i tuoi dispositivi: TV, smartphone, tablet e computer.",
  "Ricorda che puoi creare fino a 5 profili diversi con il tuo abbonamento.",
  "I nostri algoritmi personalizzano i consigli in base ai tuoi gusti e alla tua cronologia di visualizzazione.",
]

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { getRgbColor, getRgbShadow } = useRgbEffect()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking and responding
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: `linear-gradient(135deg, #000 0%, ${getRgbColor(180)}20 50%, #000 100%)`,
      }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-20 px-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-white/70 hover:text-white mr-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Torna alla Home
          </Link>
          <h1
            className="text-3xl font-bold"
            style={{
              color: getRgbColor(0),
              textShadow: getRgbShadow(getRgbColor(0)),
            }}
          >
            ADIL NET AI Assistant
          </h1>
        </div>

        <div
          className="flex-1 rounded-lg p-4 mb-4 overflow-y-auto"
          style={{
            background: `linear-gradient(135deg, #00000080, ${getRgbColor(180)}10)`,
            border: `1px solid ${getRgbColor(180)}30`,
            boxShadow: `0 0 20px ${getRgbColor(180)}20`,
          }}
        >
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div
                    className="w-8 h-8 rounded-full mr-2 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
                      boxShadow: `0 0 10px ${getRgbColor(90)}`,
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: "#fff",
                        textShadow: `0 0 5px ${getRgbColor(0)}`,
                      }}
                    >
                      AI
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.role === "user" ? "bg-opacity-70" : "bg-opacity-50"
                  }`}
                  style={{
                    background: message.role === "user" ? `${getRgbColor(270)}50` : `${getRgbColor(180)}30`,
                    border: `1px solid ${message.role === "user" ? getRgbColor(270) : getRgbColor(180)}50`,
                    boxShadow: `0 0 10px ${message.role === "user" ? getRgbColor(270) : getRgbColor(180)}20`,
                  }}
                >
                  <p className="text-white">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div
                    className="w-8 h-8 rounded-full ml-2 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${getRgbColor(240)}, ${getRgbColor(300)})`,
                      boxShadow: `0 0 10px ${getRgbColor(270)}`,
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: "#fff",
                        textShadow: `0 0 5px ${getRgbColor(270)}`,
                      }}
                    >
                      TU
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start">
                <div
                  className="w-8 h-8 rounded-full mr-2 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
                    boxShadow: `0 0 10px ${getRgbColor(90)}`,
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: "#fff",
                      textShadow: `0 0 5px ${getRgbColor(0)}`,
                    }}
                  >
                    AI
                  </span>
                </div>
                <div
                  className="rounded-lg p-3 max-w-[80%] bg-opacity-50"
                  style={{
                    background: `${getRgbColor(180)}30`,
                    border: `1px solid ${getRgbColor(180)}50`,
                  }}
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: getRgbColor(0) }}></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: getRgbColor(120), animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: getRgbColor(240), animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 mb-6"
          style={{
            background: `linear-gradient(135deg, #00000080, ${getRgbColor(180)}10)`,
            border: `1px solid ${getRgbColor(180)}30`,
            boxShadow: `0 0 20px ${getRgbColor(180)}20`,
          }}
        >
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi un messaggio all'AI di ADIL NET..."
              className="resize-none pr-12 bg-black/50 border-gray-700 text-white min-h-[100px]"
              style={{
                borderColor: getRgbColor(180),
                boxShadow: `0 0 5px ${getRgbColor(180)}50`,
              }}
            />
            <Button
              className="absolute right-3 bottom-3 p-2 h-10 w-10 rounded-full"
              onClick={handleSendMessage}
              disabled={!input.trim()}
              style={{
                background: getRgbColor(0),
                opacity: input.trim() ? 1 : 0.5,
                boxShadow: input.trim() ? `0 0 10px ${getRgbColor(0)}` : "none",
              }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          className="rounded-lg p-4 mb-6"
          style={{
            background: `linear-gradient(135deg, #00000080, ${getRgbColor(180)}10)`,
            border: `1px solid ${getRgbColor(180)}30`,
            boxShadow: `0 0 20px ${getRgbColor(180)}20`,
          }}
        >
          <h2
            className="text-xl font-bold mb-3"
            style={{
              color: getRgbColor(60),
              textShadow: `0 0 5px ${getRgbColor(60)}`,
            }}
          >
            Suggerimenti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Consigliami un film d'azione",
              "Quali sono le nuove serie TV?",
              "Voglio vedere una commedia",
              "Come funziona il controllo parentale?",
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-2"
                onClick={() => {
                  setInput(suggestion)
                }}
                style={{
                  background: `${getRgbColor(index * 90)}20`,
                  borderColor: getRgbColor(index * 90),
                  color: "#fff",
                  textShadow: `0 0 5px ${getRgbColor(index * 90)}`,
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
