"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, ImageIcon, Scan, BookOpen, Brain, AlertTriangle, Smartphone, Upload, CameraIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CameraProps {
  language: string
  darkMode: boolean
  highContrastMode: boolean
  aiEnabled: boolean
}

export function Camera({ language, darkMode, highContrastMode, aiEnabled }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("")
  const [filter, setFilter] = useState<string>("none")
  const [brightness, setBrightness] = useState<number>(100)
  const [contrast, setContrast] = useState<number>(100)
  const [gridLines, setGridLines] = useState<boolean>(false)
  const [flashMode, setFlashMode] = useState<boolean>(false)
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>("camera")
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [secureMode, setSecureMode] = useState<boolean>(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isCameraAvailable, setIsCameraAvailable] = useState<boolean>(true)
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isIOS, setIsIOS] = useState<boolean>(false)
  const [isAndroid, setIsAndroid] = useState<boolean>(false)
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 })
  const [deviceOrientation, setDeviceOrientation] = useState<string>("unknown")
  const [permissionState, setPermissionState] = useState<string>("prompt")
  const [debugInfo, setDebugInfo] = useState<any>(null)

  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      camera: "Camera",
      gallery: "Gallery",
      capture: "Capture",
      retake: "Retake",
      save: "Save",
      delete: "Delete",
      filters: "Filters",
      settings: "Settings",
      brightness: "Brightness",
      contrast: "Contrast",
      gridLines: "Grid Lines",
      flash: "Flash",
      selectCamera: "Select Camera",
      noDevices: "No devices",
      frontCamera: "Front Camera",
      backCamera: "Back Camera",
      noPermission: "Camera permission denied",
      scanDocument: "Scan Document",
      scanMath: "Scan Math Problem",
      normal: "Normal",
      blackAndWhite: "Black & White",
      sepia: "Sepia",
      invert: "Invert",
      noImages: "No captured images",
      analyzeImage: "Analyze with AI",
      analyzing: "Analyzing...",
      aiResults: "AI Analysis Results",
      secureMode: "Secure Mode",
      enhancedVisibility: "Enhanced Visibility",
      objectDetection: "Object Detection",
      textRecognition: "Text Recognition",
      mathSolver: "Math Problem Solver",
      cameraError: "Camera Error",
      noCameraAvailable: "No camera available",
      tryAgain: "Try Again",
      cameraNotSupported: "Your browser doesn't support camera access",
      cameraInUse: "Camera is in use by another application",
      uploadPhoto: "Upload Photo",
      uploadAlternative: "Or upload an image instead",
      takePicture: "Take Picture",
      permissionRequired: "Camera Permission Required",
      permissionInstructions: "Please allow camera access in your browser settings to use this feature",
      iosInstructions: "On iOS, you may need to enable camera access in Settings > Safari > Camera",
      androidInstructions: "On Android, check your browser settings or app permissions",
      rotateDevice: "Rotate your device for better results",
      portrait: "Portrait",
      landscape: "Landscape",
      debugMode: "Debug Mode",
      deviceInfo: "Device Info",
      browserInfo: "Browser Info",
      copyDebugInfo: "Copy Debug Info",
      showMore: "Show More",
      showLess: "Show Less",
      switchCamera: "Switch Camera",
      mobileOptimized: "Mobile Optimized",
      desktopOptimized: "Desktop Optimized",
      lowLightMode: "Low Light Mode",
      highResMode: "High Resolution Mode",
      standardResMode: "Standard Resolution",
      cameraInitializing: "Camera initializing...",
      tapToFocus: "Tap to focus",
      errorDetails: "Error Details",
      reloadCamera: "Reload Camera",
      useRearCamera: "Use Rear Camera",
      useFrontCamera: "Use Front Camera",
    },
    it: {
      camera: "Fotocamera",
      gallery: "Galleria",
      capture: "Cattura",
      retake: "Riprendi",
      save: "Salva",
      delete: "Elimina",
      filters: "Filtri",
      settings: "Impostazioni",
      brightness: "Luminosità",
      contrast: "Contrasto",
      gridLines: "Griglia",
      flash: "Flash",
      selectCamera: "Seleziona Fotocamera",
      noDevices: "Nessun dispositivo",
      frontCamera: "Fotocamera Frontale",
      backCamera: "Fotocamera Posteriore",
      noPermission: "Permesso fotocamera negato",
      scanDocument: "Scansiona Documento",
      scanMath: "Scansiona Problema Matematico",
      normal: "Normale",
      blackAndWhite: "Bianco e Nero",
      sepia: "Seppia",
      invert: "Inverti",
      noImages: "Nessuna immagine catturata",
      analyzeImage: "Analizza con IA",
      analyzing: "Analisi in corso...",
      aiResults: "Risultati Analisi IA",
      secureMode: "Modalità Sicura",
      enhancedVisibility: "Visibilità Migliorata",
      objectDetection: "Rilevamento Oggetti",
      textRecognition: "Riconoscimento Testo",
      mathSolver: "Risolutore Problemi Matematici",
      cameraError: "Errore Fotocamera",
      noCameraAvailable: "Nessuna fotocamera disponibile",
      tryAgain: "Riprova",
      cameraNotSupported: "Il tuo browser non supporta l'accesso alla fotocamera",
      cameraInUse: "La fotocamera è in uso da un'altra applicazione",
      uploadPhoto: "Carica Foto",
      uploadAlternative: "Oppure carica un'immagine",
      takePicture: "Scatta Foto",
      permissionRequired: "Permesso Fotocamera Richiesto",
      permissionInstructions:
        "Consenti l'accesso alla fotocamera nelle impostazioni del browser per utilizzare questa funzione",
      iosInstructions:
        "Su iOS, potrebbe essere necessario abilitare l'accesso alla fotocamera in Impostazioni > Safari > Fotocamera",
      androidInstructions: "Su Android, controlla le impostazioni del browser o i permessi dell'app",
      rotateDevice: "Ruota il dispositivo per risultati migliori",
      portrait: "Verticale",
      landscape: "Orizzontale",
      debugMode: "Modalità Debug",
      deviceInfo: "Info Dispositivo",
      browserInfo: "Info Browser",
      copyDebugInfo: "Copia Info Debug",
      showMore: "Mostra Altro",
      showLess: "Mostra Meno",
      switchCamera: "Cambia Fotocamera",
      mobileOptimized: "Ottimizzato per Mobile",
      desktopOptimized: "Ottimizzato per Desktop",
      lowLightMode: "Modalità Luce Bassa",
      highResMode: "Alta Risoluzione",
      standardResMode: "Risoluzione Standard",
      cameraInitializing: "Inizializzazione fotocamera...",
      tapToFocus: "Tocca per mettere a fuoco",
      errorDetails: "Dettagli Errore",
      reloadCamera: "Ricarica Fotocamera",
      useRearCamera: "Usa Fotocamera Posteriore",
      useFrontCamera: "Usa Fotocamera Frontale",
    },
  }

  // Default to English if language not available
  const t = translations[language] || translations.en

  // Detect mobile devices and platform
  useEffect(() => {
    const detectMobileDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent)
      const isAndroidDevice = /Android/i.test(userAgent)

      setIsMobile(isMobileDevice)
      setIsIOS(isIOSDevice)
      setIsAndroid(isAndroidDevice)

      // Log device info for debugging
      const deviceInfo = {
        userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          orientation: window.screen.orientation?.type || "unknown",
        },
      }

      setDebugInfo(deviceInfo)
      setDeviceOrientation(
        window.screen.orientation?.type || (window.innerHeight > window.innerWidth ? "portrait" : "landscape"),
      )
    }

    detectMobileDevice()

    // Handle orientation changes
    const handleOrientationChange = () => {
      setDeviceOrientation(
        window.screen.orientation?.type || (window.innerHeight > window.innerWidth ? "portrait" : "landscape"),
      )

      // Restart camera with new dimensions after orientation change on mobile
      if (isMobile && stream) {
        setTimeout(() => {
          const tracks = stream.getVideoTracks()
          if (tracks.length > 0) {
            const track = tracks[0]
            track
              .applyConstraints({
                width: { ideal: window.innerWidth },
                height: { ideal: window.innerHeight },
              })
              .catch((err) => console.error("Error applying constraints after orientation change:", err))
          }
        }, 300)
      }
    }

    // Update video dimensions
    const updateDimensions = () => {
      const containerWidth = document.querySelector(".camera-container")?.clientWidth || window.innerWidth
      setVideoSize({
        width: containerWidth,
        height: containerWidth * (isMobile ? 1.33 : 0.75), // 4:3 aspect ratio for desktop, 3:4 for mobile
      })
    }

    window.addEventListener("resize", updateDimensions)
    window.addEventListener("orientationchange", handleOrientationChange)
    updateDimensions()

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [isMobile, stream])

  // Check camera permissions - fixed to handle unsupported browsers
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // First check if the Permissions API is supported
        if (!navigator.permissions) {
          console.log("Permissions API not supported")
          return
        }

        // Check if the camera permission is supported
        try {
          const result = await navigator.permissions.query({ name: "camera" as any })
          setPermissionState(result.state)

          // Listen for permission changes
          result.addEventListener("change", () => {
            setPermissionState(result.state)
            if (result.state === "granted") {
              getDevices()
            }
          })
        } catch (err) {
          // Camera permission might not be supported in this browser
          console.log("Camera permission query not supported")
        }
      } catch (error) {
        console.error("Error checking permissions:", error)
      }
    }

    checkPermissions()
  }, [])

  // Check if camera is supported
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        if (!navigator.mediaDevices) {
          setIsCameraAvailable(false)
          setCameraError(t.cameraNotSupported)
          setShowFileUpload(true)
          return
        }

        // Try to get devices
        await getDevices()
      } catch (error) {
        console.error("Error checking camera support:", error)
        setIsCameraAvailable(false)
        setCameraError(t.noCameraAvailable)
        setShowFileUpload(true)
      }
    }

    // Wrap in try/catch to prevent any uncaught errors
    try {
      checkCameraSupport()
    } catch (error) {
      console.error("Unexpected error checking camera:", error)
      setIsCameraAvailable(false)
      setCameraError(t.cameraError)
      setShowFileUpload(true)
    }
  }, [t.cameraNotSupported, t.noCameraAvailable, t.cameraError])

  // Load saved images from localStorage
  useEffect(() => {
    try {
      const savedImages = localStorage.getItem("capturedImages")
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages)
        if (Array.isArray(parsedImages)) {
          setCapturedImages(parsedImages)
        }
      }
    } catch (error) {
      console.error("Error loading saved images:", error)
    }
  }, [])

  // Save images to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("capturedImages", JSON.stringify(capturedImages))
    } catch (error) {
      console.error("Error saving images:", error)
    }
  }, [capturedImages])

  // Get available camera devices
  const getDevices = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error("Media devices API not supported in this browser")
      }

      // Get devices first without requesting permissions
      const initialDevices = await navigator.mediaDevices.enumerateDevices()
      const hasVideoInputs = initialDevices.some((device) => device.kind === "videoinput")

      if (!hasVideoInputs) {
        setIsCameraAvailable(false)
        setCameraError(t.noCameraAvailable)
        setShowFileUpload(true)
        return
      }

      // Now try to get permission
      try {
        // Use different constraints for mobile devices
        const constraints = {
          video: isMobile
            ? {
                facingMode: isIOS ? "environment" : { ideal: "environment" }, // Prefer back camera on mobile
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }
            : true,
        }

        await navigator.mediaDevices.getUserMedia(constraints)
      } catch (permissionError) {
        console.error("Permission error:", permissionError)
        if (permissionError instanceof DOMException) {
          if (permissionError.name === "NotAllowedError") {
            setCameraError(t.noPermission)
          } else if (permissionError.name === "NotFoundError") {
            setCameraError(t.noCameraAvailable)
          } else if (permissionError.name === "NotReadableError") {
            setCameraError(t.cameraInUse)
          } else {
            setCameraError(`${t.cameraError}: ${permissionError.message}`)
          }
        } else {
          setCameraError(t.noPermission)
        }
        setIsCameraAvailable(false)
        setShowFileUpload(true)
        return
      }

      // After permission, enumerate devices again to get labels
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === "videoinput")

      setDevices(videoDevices)
      setIsCameraAvailable(videoDevices.length > 0)

      if (videoDevices.length > 0) {
        // For mobile devices, try to select the back camera by default
        if (isMobile) {
          const backCamera = videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear") ||
              device.label.toLowerCase().includes("environment"),
          )

          setSelectedDeviceId(backCamera ? backCamera.deviceId : videoDevices[0].deviceId)
        } else {
          setSelectedDeviceId(videoDevices[0].deviceId)
        }
      } else {
        setCameraError(t.noCameraAvailable)
        setShowFileUpload(true)
      }
    } catch (error) {
      console.error("Error getting devices:", error)

      // Handle specific errors
      setCameraError(error instanceof Error ? error.message : t.cameraError)
      setIsCameraAvailable(false)
      setShowFileUpload(true)
    }
  }

  // Start camera when device is selected
  useEffect(() => {
    async function startCamera() {
      try {
        if (!isCameraAvailable || !selectedDeviceId) return

        // Stop any existing stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }

        // Check if mediaDevices is still available (could have been revoked)
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(t.cameraNotSupported)
        }

        // Use different constraints based on device type
        let constraints: MediaStreamConstraints

        if (isMobile) {
          constraints = {
            video: {
              deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: { ideal: "environment" }, // Prefer back camera on mobile
            },
            audio: false,
          }
        } else {
          constraints = {
            video: {
              deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          }
        }

        try {
          const newStream = await navigator.mediaDevices.getUserMedia(constraints)

          // Check if component is still mounted by verifying videoRef exists
          if (!videoRef.current) return

          setStream(newStream)
          setCameraError(null)

          videoRef.current.srcObject = newStream

          // For iOS Safari, sometimes you need to handle the initial play manually
          if (isIOS) {
            videoRef.current.play().catch((err) => {
              console.error("Error auto-playing video:", err)
              // We'll handle this with a play button if needed
            })
          }
        } catch (error) {
          console.error("Error accessing camera:", error)

          // Handle specific errors
          if (error instanceof DOMException) {
            if (error.name === "NotAllowedError") {
              setCameraError(t.noPermission)
            } else if (error.name === "NotFoundError") {
              setCameraError(t.noCameraAvailable)
            } else if (error.name === "NotReadableError") {
              setCameraError(t.cameraInUse)
            } else {
              setCameraError(error.message)
            }
          } else {
            setCameraError(t.noPermission)
          }
          setShowFileUpload(true)
        }
      } catch (error) {
        console.error("Error in camera setup:", error)
        setCameraError(error instanceof Error ? error.message : t.cameraError)
        setShowFileUpload(true)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [
    selectedDeviceId,
    isCameraAvailable,
    t.noPermission,
    t.noCameraAvailable,
    t.cameraInUse,
    t.cameraError,
    stream,
    isMobile,
    isIOS,
  ])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Apply filters
        context.filter = getFilterStyle()

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Reset filter
        context.filter = "none"

        // Draw grid lines if enabled
        if (gridLines) {
          drawGridLines(context, canvas.width, canvas.height)
        }

        const imageDataUrl = canvas.toDataURL("image/png")
        setCapturedImage(imageDataUrl)
        setActiveTab("preview")
        setAiAnalysisResult(null) // Reset AI analysis when capturing new image
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string
        setCapturedImage(imageDataUrl)
        setActiveTab("preview")
      }
      reader.readAsDataURL(file)
    }
  }

  const saveImage = () => {
    if (capturedImage) {
      // Limit the number of saved images to prevent memory issues
      const maxImages = 20
      const newImages = [capturedImage, ...capturedImages.slice(0, maxImages - 1)]
      setCapturedImages(newImages)
      setCapturedImage(null)
      setActiveTab("gallery")
    }
  }

  const deleteImage = (index: number) => {
    const newImages = [...capturedImages]
    newImages.splice(index, 1)
    setCapturedImages(newImages)
  }

  const retakeImage = () => {
    setCapturedImage(null)
    setActiveTab("camera")
    setAiAnalysisResult(null)
  }

  const getFilterStyle = () => {
    let filterStyle = ""

    switch (filter) {
      case "blackAndWhite":
        filterStyle = "grayscale(100%)"
        break
      case "sepia":
        filterStyle = "sepia(100%)"
        break
      case "invert":
        filterStyle = "invert(100%)"
        break
      default:
        filterStyle = "none"
    }

    // Add brightness and contrast
    if (brightness !== 100) {
      filterStyle += ` brightness(${brightness}%)`
    }

    if (contrast !== 100) {
      filterStyle += ` contrast(${contrast}%)`
    }

    // Add secure mode enhancements
    if (secureMode) {
      filterStyle += " saturate(120%) contrast(110%)"
    }

    return filterStyle
  }

  const drawGridLines = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.strokeStyle = "rgba(255, 255, 255, 0.5)"
    context.lineWidth = 1

    // Draw horizontal lines
    for (let i = 1; i < 3; i++) {
      context.beginPath()
      context.moveTo(0, (height / 3) * i)
      context.lineTo(width, (height / 3) * i)
      context.stroke()
    }

    // Draw vertical lines
    for (let i = 1; i < 3; i++) {
      context.beginPath()
      context.moveTo((width / 3) * i, 0)
      context.lineTo((width / 3) * i, height)
      context.stroke()
    }
  }

  const scanDocument = () => {
    // In a real app, this would use document scanning libraries
    captureImage()
  }

  const scanMathProblem = () => {
    // In a real app, this would use OCR and math recognition
    captureImage()
  }

  const analyzeImageWithAI = () => {
    if (!capturedImage || !aiEnabled) return

    setIsAnalyzing(true)

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Generate random analysis results based on the current filter
      let analysisResult = ""

      if (filter === "blackAndWhite") {
        analysisResult =
          "Document detected. Contains approximately 250 words of text. Main topics: education, mathematics, science."
      } else if (filter === "sepia") {
        analysisResult =
          "Historical document detected. Estimated date: 1950-1970. Contains handwritten notes and diagrams."
      } else {
        // Random analysis for other filters
        const possibleObjects = [
          "book",
          "notebook",
          "calculator",
          "pen",
          "desk",
          "computer",
          "equation",
          "graph",
          "chart",
        ]
        const detectedObjects = []

        // Randomly select 2-4 objects
        const numObjects = Math.floor(Math.random() * 3) + 2
        for (let i = 0; i < numObjects; i++) {
          const randomIndex = Math.floor(Math.random() * possibleObjects.length)
          detectedObjects.push(possibleObjects[randomIndex])
          possibleObjects.splice(randomIndex, 1) // Remove selected object
        }

        // Generate confidence scores
        const confidenceScores = detectedObjects.map(() => Math.floor(Math.random() * 30) + 70 + "%")

        // Format the analysis result
        analysisResult = "Objects detected:\n"
        for (let i = 0; i < detectedObjects.length; i++) {
          analysisResult += `- ${detectedObjects[i]} (${confidenceScores[i]} confidence)\n`
        }

        // Add text recognition if it's a math problem
        if (detectedObjects.includes("equation")) {
          analysisResult += "\nMath equation detected: "
          const equations = ["y = mx + b", "E = mc²", "a² + b² = c²", "F = G(m₁m₂)/r²", "(x - h)² + (y - k)² = r²"]
          analysisResult += equations[Math.floor(Math.random() * equations.length)]
        }
      }

      setAiAnalysisResult(analysisResult)
      setIsAnalyzing(false)
    }, 2000) // Simulate 2 second processing time
  }

  const toggleSecureMode = () => {
    setSecureMode(!secureMode)

    // Adjust contrast and brightness for better visibility in secure mode
    if (!secureMode) {
      setContrast(120)
      setBrightness(110)
    } else {
      setContrast(100)
      setBrightness(100)
    }
  }

  const switchCamera = () => {
    if (devices.length <= 1) return

    // Find the index of the current device
    const currentIndex = devices.findIndex((device) => device.deviceId === selectedDeviceId)
    // Select the next device (or the first one if we're at the end)
    const nextIndex = (currentIndex + 1) % devices.length
    setSelectedDeviceId(devices[nextIndex].deviceId)
  }

  const copyDebugInfoToClipboard = () => {
    if (debugInfo) {
      const debugText = JSON.stringify(debugInfo, null, 2)
      navigator.clipboard
        .writeText(debugText)
        .then(() => alert("Debug info copied to clipboard"))
        .catch((err) => console.error("Failed to copy debug info:", err))
    }
  }

  // Render camera error state with platform-specific instructions
  if (cameraError) {
    return (
      <Card className={`w-full ${darkMode ? "bg-gray-800 text-white border-gray-700" : ""}`}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">{t.cameraError}</h3>
          <p className="mb-4">{cameraError}</p>

          <Alert className="mb-4">
            <AlertTitle>{t.permissionRequired}</AlertTitle>
            <AlertDescription>
              {t.permissionInstructions}
              {isIOS && <p className="mt-2 text-sm">{t.iosInstructions}</p>}
              {isAndroid && <p className="mt-2 text-sm">{t.androidInstructions}</p>}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button onClick={() => getDevices()} className="flex items-center gap-2">
              <CameraIcon size={16} />
              {t.tryAgain}
            </Button>

            {showFileUpload && (
              <>
                <p className="text-sm text-center mt-2">{t.uploadAlternative}</p>
                <label className="w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture={isMobile ? "environment" : undefined}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full cursor-pointer flex items-center gap-2">
                    <Upload size={16} />
                    {t.uploadPhoto}
                  </Button>
                </label>
              </>
            )}

            {isMobile && (
              <Button variant="outline" onClick={switchCamera} className="mt-2" disabled={devices.length <= 1}>
                {t.switchCamera}
              </Button>
            )}
          </div>

          {/* Debug information for troubleshooting */}
          <div className="mt-6 w-full">
            <details className="text-left text-sm">
              <summary className="cursor-pointer">{t.errorDetails}</summary>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-auto">
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                <Button variant="ghost" size="sm" onClick={copyDebugInfoToClipboard} className="mt-2">
                  {t.copyDebugInfo}
                </Button>
              </div>
            </details>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full ${darkMode ? "bg-gray-800 text-white border-gray-700" : ""}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="camera">{t.camera}</TabsTrigger>
          <TabsTrigger value="preview" disabled={!capturedImage}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="gallery">{t.gallery}</TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="space-y-4">
          <CardContent className="p-4">
            <div className="relative camera-container">
              {isMobile && (
                <Badge
                  variant="outline"
                  className={`absolute top-2 left-2 z-10 ${darkMode ? "bg-blue-900 text-white" : "bg-blue-100"}`}
                >
                  <Smartphone size={12} className="mr-1" />
                  {t.mobileOptimized}
                </Badge>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-md"
                style={{
                  filter: getFilterStyle(),
                  maxHeight: "50vh",
                  objectFit: "cover",
                  width: videoSize.width || "100%",
                  height: videoSize.height || "auto",
                }}
              />

              {gridLines && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-r border-b border-white/30"></div>
                  <div className="border-b border-white/30"></div>
                  <div className="border-r border-white/30"></div>
                  <div className="border-r border-white/30"></div>
                  <div></div>
                </div>
              )}

              {flashMode && <div className="absolute inset-0 bg-white/90 pointer-events-none"></div>}

              {secureMode && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="outline"
                    className={`${darkMode ? "bg-green-900 text-white" : "bg-green-100"} flex items-center gap-1`}
                  >
                    <Check size={12} /> {t.secureMode}
                  </Badge>
                </div>
              )}

              {aiEnabled && (
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className={`${darkMode ? "bg-blue-900 text-white" : "bg-blue-100"} flex items-center gap-1`}
                  >
                    <Brain size={12} /> {t.objectDetection}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${darkMode ? "bg-purple-900 text-white" : "bg-purple-100"} flex items-center gap-1`}
                  >
                    <BookOpen size={12} /> {t.textRecognition}
                  </Badge>
                </div>
              )}

              {isMobile && (
                <div className="absolute bottom-2 right-2">
                  <Badge variant="outline" className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
                    {deviceOrientation.includes("portrait") ? t.portrait : t.landscape}
                  </Badge>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="mt-4 space-y-4">
              <div className="flex justify-between gap-2">
                <Button onClick={captureImage} className="flex-1 flex items-center gap-2">
                  <CameraIcon size={16} />
                  {t.capture}
                </Button>

                {isMobile && devices.length > 1 && (
                  <Button onClick={switchCamera} variant="outline" className="flex-1 flex items-center gap-1">
                    <CameraIcon size={16} />
                    {t.switchCamera}
                  </Button>
                )}

                {showFileUpload && (
                  <label className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture={isMobile ? "environment" : undefined}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button variant="outline" className="w-full cursor-pointer flex items-center gap-1">
                      <Upload size={16} />
                      {t.uploadPhoto}
                    </Button>
                  </label>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <Button onClick={scanDocument} variant="outline" className="flex-1 flex items-center gap-1">
                  <Scan size={16} /> {t.scanDocument}
                </Button>
                <Button onClick={scanMathProblem} variant="outline" className="flex-1 flex items-center gap-1">
                  <ImageIcon size={16} /> {t.scanMath}
                </Button>
              </div>

              <Tabs defaultValue="filters" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="filters">{t.filters}</TabsTrigger>
                  <TabsTrigger value="settings">{t.settings}</TabsTrigger>
                </TabsList>

                <TabsContent value="filters" className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant={filter === "none" ? "default" : "outline"}
                      onClick={() => setFilter("none")}
                      className="text-xs"
                    >
                      {t.normal}
                    </Button>
                    <Button
                      variant={filter === "blackAndWhite" ? "default" : "outline"}
                      onClick={() => setFilter("blackAndWhite")}
                      className="text-xs"
                    >
                      {t.blackAndWhite}
                    </Button>
                    <Button
                      variant={filter === "sepia" ? "default" : "outline"}
                      onClick={() => setFilter("sepia")}
                      className="text-xs"
                    >
                      {t.sepia}
                    </Button>
                    <Button
                      variant={filter === "invert" ? "default" : "outline"}
                      onClick={() => setFilter("invert")}
                      className="text-xs"
                    >
                      {t.invert}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{t.brightness}</Label>
                        <span>{brightness}%</span>
                      </div>
                      <Slider
                        value={[brightness]}
                        min={0}
                        max={200}
                        step={5}
                        onValueChange={(value) => setBrightness(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{t.contrast}</Label>
                        <span>{contrast}%</span>
                      </div>
                      <Slider
                        value={[contrast]}
                        min={0}
                        max={200}
                        step={5}
                        onValueChange={(value) => setContrast(value[0])}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="grid-lines">{t.gridLines}</Label>
                      <Switch id="grid-lines" checked={gridLines} onCheckedChange={setGridLines} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="flash-mode">{t.flash}</Label>
                      <Switch id="flash-mode" checked={flashMode} onCheckedChange={setFlashMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="secure-mode">{t.enhancedVisibility}</Label>
                      <Switch id="secure-mode" checked={secureMode} onCheckedChange={toggleSecureMode} />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.selectCamera}</Label>
                      <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectCamera} />
                        </SelectTrigger>
                        <SelectContent>
                          {devices.length === 0 ? (
                            <SelectItem value="none" disabled>
                              {t.noDevices}
                            </SelectItem>
                          ) : (
                            devices.map((device, index) => (
                              <SelectItem key={device.deviceId} value={device.deviceId}>
                                {device.label || (index === 0 ? t.frontCamera : t.backCamera)}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="preview">
          <CardContent className="p-4">
            {capturedImage ? (
              <div className="space-y-4">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured"
                  className="w-full rounded-md"
                  style={{ maxHeight: "50vh", objectFit: "contain" }}
                />

                <div className="flex justify-between gap-2">
                  <Button onClick={retakeImage} variant="outline" className="flex-1">
                    {t.retake}
                  </Button>
                  <Button onClick={saveImage} className="flex-1">
                    {t.save}
                  </Button>
                </div>

                {aiEnabled && (
                  <div className="mt-4">
                    <Button
                      onClick={analyzeImageWithAI}
                      disabled={isAnalyzing}
                      className="w-full"
                      variant={darkMode ? "outline" : "default"}
                    >
                      {isAnalyzing ? t.analyzing : t.analyzeImage}
                    </Button>

                    {aiAnalysisResult && (
                      <div className={`mt-4 p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <h3 className="font-bold mb-2">{t.aiResults}</h3>
                        <pre className="whitespace-pre-wrap text-sm">{aiAnalysisResult}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">{t.noImages}</div>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="gallery">
          <CardContent className="p-4">
            {capturedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {capturedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Captured ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="destructive" size="sm" onClick={() => deleteImage(index)}>
                        {t.delete}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">{t.noImages}</div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
