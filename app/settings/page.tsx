"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { useRgbEffect } from "@/hooks/use-rgb-effect"
import { useThemeMode } from "@/lib/theme-context"
import { useParentalControl } from "@/lib/parental-control-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { ParentalControl } from "@/components/parental-control"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useRgbContext } from "@/lib/rgb-context"
import { Check, X } from "lucide-react"

export default function SettingsPage() {
  const { getRgbColor } = useRgbEffect()
  const { theme } = useThemeMode()
  const { safeMode, isPinSet, setShowPinDialog } = useParentalControl()
  const { speed, setSpeed } = useRgbContext()
  const isDark = theme === "dark"
  const [email, setEmail] = useState("user@example.com")
  const [notifications, setNotifications] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  // Invertiamo il valore per l'interfaccia utente (più alto = più lento)
  const displayValue = 110 - speed

  const handleSpeedChange = (value: number[]) => {
    // Invertiamo nuovamente il valore per il sistema (più basso = più veloce)
    setSpeed(110 - value[0])
  }

  const handleSave = () => {
    // Simula il salvataggio
    setSaved(true)
    setError(false)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div
      className={`min-h-screen ${isDark ? "text-white" : "text-gray-800 app-bg"}`}
      style={{
        background: isDark ? `linear-gradient(135deg, #000 0%, ${getRgbColor(180)}20 50%, #000 100%)` : undefined,
      }}
    >
      <Navbar />

      <div className="pt-24 px-4 md:px-8 max-w-4xl mx-auto pb-16">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{
            color: getRgbColor(),
            textShadow: isDark ? getRgbColor() : "none",
          }}
        >
          Impostazioni
        </h1>

        <div className="space-y-8">
          {/* Sezione Tema */}
          <div
            className={`p-6 rounded-lg ${isDark ? "" : "app-card"}`}
            style={{
              background: isDark ? `linear-gradient(135deg, #00000080, ${getRgbColor(180)}20)` : undefined,
              border: isDark ? `1px solid ${getRgbColor(180)}30` : undefined,
              boxShadow: `0 0 20px ${getRgbColor(180)}20`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: getRgbColor(60),
                textShadow: isDark ? `0 0 5px ${getRgbColor(60)}` : "none",
              }}
            >
              Aspetto
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Tema</p>
                <p className="text-sm text-gray-400">Scegli tra tema chiaro e scuro</p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Sezione Controllo Parentale */}
          <div
            className={`p-6 rounded-lg ${isDark ? "" : "app-card"}`}
            style={{
              background: isDark ? `linear-gradient(135deg, #00000080, ${getRgbColor(180)}20)` : undefined,
              border: isDark ? `1px solid ${getRgbColor(180)}30` : undefined,
              boxShadow: `0 0 20px ${getRgbColor(180)}20`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: getRgbColor(120),
                textShadow: isDark ? `0 0 5px ${getRgbColor(120)}` : "none",
              }}
            >
              Controllo Parentale
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">Modalità Sicura</p>
                  <p className="text-sm text-gray-400">
                    Mostra solo contenuti adatti a un pubblico di età inferiore ai 13 anni
                  </p>
                </div>
                <ParentalControl />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">PIN di Protezione</p>
                  <p className="text-sm text-gray-400">
                    {isPinSet ? "Modifica il PIN di protezione" : "Imposta un PIN per proteggere le impostazioni"}
                  </p>
                </div>
                <Button
                  onClick={() => setShowPinDialog(true)}
                  style={{
                    background: `linear-gradient(135deg, ${getRgbColor(240)}, ${getRgbColor(300)})`,
                    boxShadow: `0 0 15px ${getRgbColor(270)}50`,
                  }}
                >
                  {isPinSet ? "Modifica PIN" : "Imposta PIN"}
                </Button>
              </div>
            </div>
          </div>

          {/* Sezione Effetti RGB */}
          <div
            className={`p-6 rounded-lg ${isDark ? "" : "app-card"}`}
            style={{
              background: isDark ? `linear-gradient(135deg, #00000080, ${getRgbColor(180)}20)` : undefined,
              border: isDark ? `1px solid ${getRgbColor(180)}30` : undefined,
              boxShadow: `0 0 20px ${getRgbColor(180)}20`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: getRgbColor(180),
                textShadow: isDark ? `0 0 5px ${getRgbColor(180)}` : "none",
              }}
            >
              Effetti RGB
            </h2>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <span
                    style={{
                      color: getRgbColor(0),
                      textShadow: isDark ? `0 0 5px ${getRgbColor(0)}` : "none",
                    }}
                  >
                    Velocità RGB
                  </span>
                  <span
                    style={{
                      color: getRgbColor(180),
                      textShadow: isDark ? `0 0 5px ${getRgbColor(180)}` : "none",
                    }}
                  >
                    {displayValue}%
                  </span>
                </div>

                <div className="py-4">
                  <Slider
                    defaultValue={[displayValue]}
                    max={100}
                    min={10}
                    step={1}
                    value={[displayValue]}
                    onValueChange={handleSpeedChange}
                    className="w-full"
                    styles={{
                      track: {
                        background: `linear-gradient(to right, ${getRgbColor(0)}, ${getRgbColor(180)})`,
                      },
                      thumb: {
                        background: getRgbColor(270),
                        border: `2px solid #fff`,
                        boxShadow: `0 0 10px ${getRgbColor(270)}`,
                      },
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span
                    style={{
                      color: getRgbColor(0),
                      textShadow: isDark ? `0 0 5px ${getRgbColor(0)}` : "none",
                    }}
                  >
                    Veloce
                  </span>
                  <span
                    style={{
                      color: getRgbColor(180),
                      textShadow: isDark ? `0 0 5px ${getRgbColor(180)}` : "none",
                    }}
                  >
                    Lento
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sezione Account */}
          <div
            className={`p-6 rounded-lg ${isDark ? "" : "app-card"}`}
            style={{
              background: isDark ? `linear-gradient(135deg, #00000080, ${getRgbColor(180)}20)` : undefined,
              border: isDark ? `1px solid ${getRgbColor(180)}30` : undefined,
              boxShadow: `0 0 20px ${getRgbColor(180)}20`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: getRgbColor(240),
                textShadow: isDark ? `0 0 5px ${getRgbColor(240)}` : "none",
              }}
            >
              Account
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${isDark ? "bg-gray-800 border-gray-700 text-white" : "app-input text-black"}`}
                  style={{
                    borderColor: getRgbColor(180),
                    boxShadow: `0 0 5px ${getRgbColor(180)}50`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">Notifiche</p>
                  <p className="text-sm text-gray-400">Ricevi notifiche su nuovi contenuti e aggiornamenti</p>
                </div>
                <Button
                  variant={notifications ? "default" : "outline"}
                  onClick={() => setNotifications(!notifications)}
                  style={{
                    background: notifications
                      ? `linear-gradient(135deg, ${getRgbColor(120)}, ${getRgbColor(180)})`
                      : `${getRgbColor(0)}20`,
                    borderColor: notifications ? getRgbColor(120) : getRgbColor(0),
                    color: "#fff",
                    boxShadow: notifications ? `0 0 15px ${getRgbColor(150)}` : `0 0 10px ${getRgbColor(0)}40`,
                  }}
                >
                  {notifications ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                  {notifications ? "Attive" : "Disattive"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium mb-1">Riproduzione automatica</p>
                  <p className="text-sm text-gray-400">Riproduci automaticamente il prossimo episodio</p>
                </div>
                <Button
                  variant={autoplay ? "default" : "outline"}
                  onClick={() => setAutoplay(!autoplay)}
                  style={{
                    background: autoplay
                      ? `linear-gradient(135deg, ${getRgbColor(120)}, ${getRgbColor(180)})`
                      : `${getRgbColor(0)}20`,
                    borderColor: autoplay ? getRgbColor(120) : getRgbColor(0),
                    color: "#fff",
                    boxShadow: autoplay ? `0 0 15px ${getRgbColor(150)}` : `0 0 10px ${getRgbColor(0)}40`,
                  }}
                >
                  {autoplay ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                  {autoplay ? "Attiva" : "Disattiva"}
                </Button>
              </div>
            </div>
          </div>

          {/* Pulsanti di azione */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              style={{
                borderColor: getRgbColor(0),
                color: getRgbColor(0),
                textShadow: isDark ? `0 0 5px ${getRgbColor(0)}` : "none",
              }}
            >
              Annulla
            </Button>
            <Button
              onClick={handleSave}
              style={{
                background: `linear-gradient(135deg, ${getRgbColor(120)}, ${getRgbColor(180)})`,
                boxShadow: `0 0 15px ${getRgbColor(150)}`,
              }}
            >
              Salva impostazioni
            </Button>
          </div>

          {/* Messaggio di conferma */}
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-md flex items-center gap-2"
              style={{
                background: `${getRgbColor(120)}20`,
                border: `1px solid ${getRgbColor(120)}`,
              }}
            >
              <Check className="h-5 w-5" style={{ color: getRgbColor(120) }} />
              <p style={{ color: getRgbColor(120) }}>Impostazioni salvate con successo!</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-md flex items-center gap-2"
              style={{
                background: `${getRgbColor(0)}20`,
                border: `1px solid ${getRgbColor(0)}`,
              }}
            >
              <X className="h-5 w-5" style={{ color: getRgbColor(0) }} />
              <p style={{ color: getRgbColor(0) }}>Si è verificato un errore. Riprova più tardi.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
