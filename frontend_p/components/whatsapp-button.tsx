"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WhatsAppButton() {
  // Replace with your WhatsApp business number
  const whatsappNumber = "59178516505"
  const defaultMessage = "Hola, estoy interesado en reservar un evento en El Parlamento."
  
  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`, "_blank")
  }
  
  return (
    <Button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 rounded-full w-20 h-20 bg-green-500 hover:bg-green-600 shadow-lg z-50 flex items-center justify-center"
      aria-label="Chat por WhatsApp"
    >
      <Image
        src="/icons/whatsapp-icon-w.svg" 
        alt="WhatsApp Icon"
        width={45}
        height={45}
        priority
      />
    </Button>
  )
}
