"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRgbEffect } from "@/hooks/use-rgb-effect"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { getRgbColor } = useRgbEffect(-30) // Effetto RGB più veloce
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative mb-12"
      >
        <motion.span
          className="text-6xl md:text-8xl font-bold"
          style={{
            color: getRgbColor(),
            textShadow: `
              0 0 10px ${getRgbColor()},
              0 0 20px ${getRgbColor()},
              0 0 30px ${getRgbColor()},
              0 0 40px ${getRgbColor()},
              0 0 50px ${getRgbColor()}
            `,
            transition: "color 0.1s ease, text-shadow 0.1s ease",
          }}
        >
          ADIL NET
        </motion.span>
        <motion.div
          className="absolute -bottom-4 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span
            className="text-sm"
            style={{
              color: getRgbColor(180),
              textShadow: `0 0 5px ${getRgbColor(180)}`,
            }}
          >
            L'intrattenimento senza limiti
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "16rem", opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${getRgbColor(0)}, ${getRgbColor(180)})`,
            boxShadow: `0 0 10px ${getRgbColor(90)}`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        />
      </motion.div>

      <motion.div
        className="mt-8 flex space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: getRgbColor(i * 120),
              boxShadow: `0 0 10px ${getRgbColor(i * 120)}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
