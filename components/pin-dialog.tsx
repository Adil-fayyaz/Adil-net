"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { useParentalControl } from "@/lib/parental-control-context"

export function PinDialog() {
  const { showPinDialog, setShowPinDialog, verifyPin, isPinSet, setPin } = useParentalControl()
  const [inputPin, setInputPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSettingPin, setIsSettingPin] = useState(!isPinSet)
  const inputRef = useRef<HTMLInputElement>(null)
  const { getRgbColor } = useRgbEffect()

  useEffect(() => {
    if (showPinDialog && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPinDialog])

  const handleClose = () => {
    setShowPinDialog(false)
    setInputPin("")
    setConfirmPin("")
    setError("")
    setSuccess("")
  }

  const handleVerifyPin = () => {
    if (inputPin.length < 4) {
      setError("Il PIN deve essere di almeno 4 cifre")
      return
    }

    if (isSettingPin) {
      if (inputPin !== confirmPin) {
        setError("I PIN non corrispondono")
        return
      }

      setPin(inputPin)
      setSuccess("PIN impostato con successo")
      setTimeout(() => {
        handleClose()
      }, 1500)
    } else {
      const isValid = verifyPin(inputPin)
      if (!isValid) {
        setError("PIN non valido")
        setInputPin("")
      } else {
        setSuccess("PIN corretto")
        setTimeout(() => {
          handleClose()
        }, 1500)
      }
    }
  }

  if (!showPinDialog) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-md p-6 rounded-lg"
          style={{
            background: `linear-gradient(135deg, #000000, ${getRgbColor(180)}30)`,
            boxShadow: `0 0 30px ${getRgbColor(180)}40`,
            border: `1px solid ${getRgbColor(180)}50`,
          }}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleClose}
            style={{
              color: getRgbColor(0),
            }}
          >
            <X className="h-5 w-5" />
          </Button>

          <h2
            className="text-xl font-bold mb-4"
            style={{
              color: getRgbColor(60),
              textShadow: `0 0 5px ${getRgbColor(60)}`,
            }}
          >
            {isSettingPin ? "Imposta il PIN di controllo parentale" : "Inserisci il PIN"}
          </h2>

          <p className="text-gray-300 mb-6">
            {isSettingPin
              ? "Crea un PIN di almeno 4 cifre per proteggere le impostazioni di controllo parentale."
              : "Inserisci il PIN per disattivare la modalità sicura."}
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium mb-1"
                style={{
                  color: getRgbColor(120),
                }}
              >
                {isSettingPin ? "Nuovo PIN" : "PIN"}
              </label>
              <Input
                ref={inputRef}
                id="pin"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value.replace(/[^0-9]/g, ""))
                  setError("")
                }}
                className="bg-gray-800 border-gray-700 text-white"
                style={{
                  borderColor: error ? getRgbColor(0) : getRgbColor(180),
                  boxShadow: `0 0 5px ${error ? getRgbColor(0) : getRgbColor(180)}50`,
                }}
              />
            </div>

            {isSettingPin && (
              <div>
                <label
                  htmlFor="confirmPin"
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: getRgbColor(120),
                  }}
                >
                  Conferma PIN
                </label>
                <Input
                  id="confirmPin"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))
                    setError("")
                  }}
                  className="bg-gray-800 border-gray-700 text-white"
                  style={{
                    borderColor: error ? getRgbColor(0) : getRgbColor(180),
                    boxShadow: `0 0 5px ${error ? getRgbColor(0) : getRgbColor(180)}50`,
                  }}
                />
              </div>
            )}

            {error && (
              <div
                className="p-3 rounded-md flex items-start gap-2"
                style={{
                  background: `${getRgbColor(0)}20`,
                  border: `1px solid ${getRgbColor(0)}`,
                }}
              >
                <AlertTriangle className="h-5 w-5 flex-shrink-0" style={{ color: getRgbColor(0) }} />
                <p className="text-sm" style={{ color: getRgbColor(0) }}>
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div
                className="p-3 rounded-md flex items-start gap-2"
                style={{
                  background: `${getRgbColor(120)}20`,
                  border: `1px solid ${getRgbColor(120)}`,
                }}
              >
                <Check className="h-5 w-5 flex-shrink-0" style={{ color: getRgbColor(120) }} />
                <p className="text-sm" style={{ color: getRgbColor(120) }}>
                  {success}
                </p>
              </div>
            )}

            <Button
              onClick={handleVerifyPin}
              className="w-full"
              style={{
                background: `linear-gradient(135deg, ${getRgbColor(240)}, ${getRgbColor(300)})`,
                boxShadow: `0 0 15px ${getRgbColor(270)}50`,
              }}
            >
              {isSettingPin ? "Imposta PIN" : "Conferma"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
