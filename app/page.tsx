"use client"

import { Camera } from "../components/camera"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Camera language="en" darkMode={false} highContrastMode={false} aiEnabled={true} />
    </main>
  )
}
