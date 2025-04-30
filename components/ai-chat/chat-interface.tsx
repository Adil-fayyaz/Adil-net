"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage } from "./chat-message"
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
    content: "Ciao! Sono l'assistente AI di ADIL NET. Come posso aiutarti oggi?",
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

export function AiChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 left-4 z-50 rounded-full w-14 h-14 p-0 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        style={{
          background: `linear-gradient(135deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
          boxShadow: `0 0 15px ${getRgbColor(90)}`,
          border: `2px solid ${getRgbColor(270)}`,
        }}
      >
        <Sparkles
          className="h-6 w-6"
          style={{
            color: "#fff",
            filter: `drop-shadow(0 0 5px ${getRgbColor(0)})`,
          }}
        />
      </Button>
    )
  }

  return (
    <div
      className={`fixed left-4 z-50 rounded-lg overflow-hidden transition-all duration-300 shadow-xl ${
        isMinimized ? "w-64 h-12 bottom-4" : "w-80 md:w-96 h-[500px] bottom-4"
      }`}
      style={{
        background: `linear-gradient(135deg, #000000, ${getRgbColor(180)}20)`,
        boxShadow: `0 0 20px ${getRgbColor(180)}50`,
        border: `1px solid ${getRgbColor(180)}50`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
        style={{
          background: `linear-gradient(90deg, ${getRgbColor(0)}80, ${getRgbColor(180)}80)`,
        }}
      >
        <div className="flex items-center">
          <Sparkles
            className="h-5 w-5 mr-2"
            style={{
              color: "#fff",
              filter: `drop-shadow(0 0 5px ${getRgbColor(0)})`,
            }}
          />
          <h3
            className="font-bold"
            style={{
              color: "#fff",
              textShadow: getRgbShadow("#fff"),
            }}
          >
            ADIL NET AI Assistant
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {isMinimized ? <Maximize2 className="h-4 w-4 text-white" /> : <Minimize2 className="h-4 w-4 text-white" />}
          <X
            className="h-4 w-4 text-white"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          />
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages container */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-start">
                <div
                  className="rounded-lg p-3 max-w-[80%] bg-opacity-50"
                  style={{
                    background: `${getRgbColor(180)}30`,
                    border: `1px solid ${getRgbColor(180)}50`,
                  }}
                >
                  <div className="flex space-x-1">
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

          {/* Input area */}
          <div className="p-3 border-t" style={{ borderColor: `${getRgbColor(180)}50` }}>
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi un messaggio..."
                className="resize-none pr-10 bg-black/50 border-gray-700 text-white"
                rows={2}
                style={{
                  borderColor: getRgbColor(180),
                  boxShadow: `0 0 5px ${getRgbColor(180)}50`,
                }}
              />
              <Button
                className="absolute right-2 bottom-2 p-1 h-8 w-8"
                onClick={handleSendMessage}
                disabled={!input.trim()}
                style={{
                  background: getRgbColor(0),
                  opacity: input.trim() ? 1 : 0.5,
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
