"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

export default function MapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  return (
    <section className="py-16 bg-alabaster">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-navy mb-12">Visitanos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-lg overflow-hidden h-[400px] relative">
            {/* Google Map Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.568703433359!2d-68.13405931796453!3d-16.497362492987826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f2170d917ca4f%3A0x631db9d72299a295!2sEl%20Parlamento%20historia%20caf%C3%A9!5e0!3m2!1sen!2sbo!4v1747064395841!5m2!1sen!2sbo"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              onLoad={() => setIsMapLoaded(true)}
              className={`${isMapLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
            ></iframe>
            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p>Loading map...</p>
              </div>
            )}
          </div>
          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-secondary-navy">Ubicación y Horarios</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-ruby mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-secondary-navy mb-1">Ubicación</h4>
                      <p className="text-muted-teal">Calle Comercio,esquina Colón #1280</p>
                      <p className="text-muted-teal">La Paz, Bolivia</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-ruby mr-3 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-secondary-navy mb-1">Horarios</h4>
                      <p className="text-muted-teal">Lunes a Viernes: 8am - 10pm</p>
                      <p className="text-muted-teal">Sabados: 9am - 9pm</p>
                      <p className="text-muted-teal">Domingos: 10am - 3pm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
