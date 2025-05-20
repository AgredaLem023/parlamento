"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const inquiryType = searchParams.get("inquiry")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: inquiryType === "event" ? "Organización de Evento" : "",
    message:
      inquiryType === "event" ? "Estoy interesado en organizar un evento en El Parlamento. Aquí están los detalles:" : "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real application, you would send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error al enviar el mensaje",
        description: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      {/* <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-hero.jpg"
            alt="Contacto El Parlamento"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contáctanos</h1>
          <p className="text-lg md:text-xl max-w-2xl">¿Tienes preguntas o comentarios? Nos encantaría escucharte.</p>
        </div>
      </section> */}

      {/* Contact Form and Info */}
      <section className="py-16 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sofa.png" 
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h1 className="text-4xl font-bold text-gray-300 mb-8 text-center">Contáctanos</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-secondary-navy mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu.correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Select value={formData.subject} onValueChange={handleSelectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consulta General">Consulta General</SelectItem>
                        <SelectItem value="Reserva">Reserva</SelectItem>
                        <SelectItem value="Organización de Evento">Organización de Evento</SelectItem>
                        <SelectItem value="Comentarios">Comentarios</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="¿Cómo podemos ayudarte?"
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>

                {isSuccess && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-md">
                    ¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo lo antes posible.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-secondary-navy mb-6">Información de Contacto</h2>

              <div className="bg-alabaster p-6 rounded-lg mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary-ruby mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-secondary-navy mb-1">Dirección</h3>
                      <p className="text-muted-teal">Calle Comercio, esquina Colón #1280</p>
                      <p className="text-muted-teal">La Paz, Bolivia</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary-ruby mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-secondary-navy mb-1">Teléfono</h3>
                      <p className="text-muted-teal">+591 78516505</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary-ruby mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-secondary-navy mb-1">Correo Electrónico</h3>
                      <p className="text-muted-teal">info@elparlamento.bo</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-primary-ruby mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-secondary-navy mb-1">Horarios de Atención</h3>
                      <p className="text-muted-teal">Lunes - Viernes: 8am - 11pm</p>
                      <p className="text-muted-teal">Sábados: 9am - 9pm</p>
                      <p className="text-muted-teal">Domingos: 9am - 3pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden h-[300px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.568703433359!2d-68.13405931796453!3d-16.497362492987826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f2170d917ca4f%3A0x631db9d72299a295!2sEl%20Parlamento%20historia%20caf%C3%A9!5e0!3m2!1sen!2sbo!4v1747064395841!5m2!1sen!2sbo"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-secondary-navy text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Contactate con Nosotros</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Síguenos en redes sociales para estar al día con nuestros eventos, menús y actividades culturales.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/elparlamento.bo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center hover:text-primary-ruby transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61566976663843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center hover:text-primary-ruby transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://wa.me/59178516505"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center hover:text-primary-ruby transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M9.5 13.5c.5 1.5 2.5 2 4 1" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
