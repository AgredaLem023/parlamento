"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Clock, ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "El nombre del evento debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  attendees: z.string().min(1, {
    message: "Por favor, ingresa el número de asistentes.",
  }),
  organizer: z.string().min(2, {
    message: "El nombre del organizador debe tener al menos 2 caracteres.",
  }),
  contactEmail: z.string().email({
    message: "Por favor, ingresa una dirección de correo electrónico válida.",
  }),
})

export default function EventDetailsPage() {
  const [date, setDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      description: "",
      attendees: "",
      organizer: "",
      contactEmail: "",
    },
  })

  useEffect(() => {
    // Retrieve the date and time from localStorage
    const storedDate = localStorage.getItem("eventDate")
    const storedStartTime = localStorage.getItem("eventStartTime")
    const storedEndTime = localStorage.getItem("eventEndTime")

    if (!storedDate || !storedStartTime || !storedEndTime) {
      // If any of the required data is missing, redirect back to the first page
      router.push("/")
      return
    }

    setDate(new Date(storedDate))
    setStartTime(storedStartTime)
    setEndTime(storedEndTime)
  }, [router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    try {
      const response = await fetch(`${baseUrl}/api/book-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          attendees: parseInt(values.attendees, 10),
          date: date?.toISOString(),
          startTime,
          endTime,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to book event");
      }
      
      const data = await response.json();
      setIsLoading(false);
      
      // Show success message
      toast({
        title: "¡Evento Reservado Exitosamente!",
        description: `Tu evento "${values.eventName}" ha sido programado.`,
      });
      
      // Clear localStorage
      localStorage.removeItem("eventDate")
      localStorage.removeItem("eventStartTime")
      localStorage.removeItem("eventEndTime")
      
      // Redirect to events page after a short delay
      setTimeout(() => {
        router.push("/events")
      }, 2000)
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Error al reservar el evento. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto py-10 bg-[#F8F9FA] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#B2042E]">Detalles del Evento</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-[#B2042E] text-white">
            <CardTitle className="text-2xl">Completa tu Reserva</CardTitle>
            <CardDescription className="text-[#F8F9FA] opacity-90">Proporciona detalles sobre tu evento</CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            {date && startTime && endTime ? (
              <div className="mb-6 p-4 bg-[#DBE0E3] rounded-lg">
                <h3 className="font-medium mb-2 text-[#B2042E]">Fecha y Hora Seleccionadas:</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#B2042E]" />
                    <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-[#B2042E]" />
                    <span>
                      {startTime} - {endTime}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center my-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/events/book_events")}
                  className="border-[#B2042E] text-[#B2042E] hover:bg-[#f8e5e9] hover:text-[#B2042E]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Seleccionar Fecha y Hora
                </Button>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B2042E] font-medium">Nombre del Evento</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Reunión de equipo, Fiesta de cumpleaños, etc."
                          {...field}
                          className="border-[#DBE0E3] focus-visible:ring-[#B2042E]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B2042E] font-medium">Descripción del Evento</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Proporciona detalles sobre tu evento..."
                          className="min-h-[120px] border-[#DBE0E3] focus-visible:ring-[#B2042E]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="attendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B2042E] font-medium">Número de Asistentes</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            className="border-[#DBE0E3] focus-visible:ring-[#B2042E]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B2042E] font-medium">Nombre del Organizador</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tu nombre u organización"
                            {...field}
                            className="border-[#DBE0E3] focus-visible:ring-[#B2042E]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B2042E] font-medium">Correo Electrónico de Contacto</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          className="border-[#DBE0E3] focus-visible:ring-[#B2042E]"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Los detalles de confirmación se enviarán a este correo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/events/book_events")}
                    className="border-[#B2042E] text-[#B2042E] hover:bg-[#f8e5e9] hover:text-[#B2042E]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                  </Button>

                  <Button type="submit" disabled={isLoading} className="bg-[#B2042E] hover:bg-[#8c0325] text-white">
                    {isLoading ? (
                      <>Procesando...</>
                    ) : (
                      <>
                        Reservar Evento <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
