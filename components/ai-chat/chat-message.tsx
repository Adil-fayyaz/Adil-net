"use client"

import { useRgbEffect } from "@/hooks/use-rgb-effect"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { getRgbColor } = useRgbEffect()
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg p-3 max-w-[80%] ${isUser ? "bg-opacity-70" : "bg-opacity-50"}`}
        style={{
          background: isUser ? `${getRgbColor(270)}50` : `${getRgbColor(180)}30`,
          border: `1px solid ${isUser ? getRgbColor(270) : getRgbColor(180)}50`,
          boxShadow: `0 0 10px ${isUser ? getRgbColor(270) : getRgbColor(180)}20`,
        }}
      >
        <p className="text-white text-sm">{message.content}</p>
      </div>
    </div>
  )
}
