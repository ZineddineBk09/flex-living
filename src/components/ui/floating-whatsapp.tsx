'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FloatingWhatsApp() {
  const handleClick = () => {
    // Open WhatsApp with a predefined message
    const message = "Hi! I'm interested in your property. Can you help me with more information?"
    const phoneNumber = "+447723745646" // UK number from the footer
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg z-50"
      size="icon"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  )
}
