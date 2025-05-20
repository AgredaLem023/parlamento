"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomCalendar } from "@/components/calendar-registration-event"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function DateTimePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState<string | undefined>(undefined)
  const [endTime, setEndTime] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleContinue = () => {
    if (date && startTime && endTime) {
      // Store the selected date and time in localStorage
      localStorage.setItem("eventDate", date.toISOString())
      localStorage.setItem("eventStartTime", startTime)
      localStorage.setItem("eventEndTime", endTime)

      // Navigate to the event details page
      router.push("/events/book_events/event_details")
    }
  }

  // Generate time options (30-minute intervals)
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      const time = `${formattedHour}:${formattedMinute}`
      timeOptions.push(time)
    }
  }

  return (
    <div className="container mx-auto pt-28 pb-10 bg-[#F8F9FA] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#B2042E]">Reserva tu Evento</h1>

      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-[#B2042E] hover:bg-[#F8F9FA]/80 flex items-center text-lg px-4 py-2"
          onClick={() => router.push("/events")}
          >
            <ArrowLeft className="mr-2 h-6 w-6" />
            Volver
        </Button>
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-[#B2042E] text-white">
            <CardTitle className="text-2xl">Seleccionar Fecha y Hora</CardTitle>
            <CardDescription className="text-[#F8F9FA] opacity-90">
              Elige cuándo te gustaría programar tu evento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 bg-white">
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="flex-1 space-y-4">
                <Label htmlFor="date" className="text-lg font-medium text-[#B2042E]">
                  Fecha
                </Label>
                <CustomCalendar
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  height="auto"
                  width="100%"
                />
                {date && (
                  <div className="flex items-center text-sm text-[#B2042E] mt-2 bg-[#DBE0E3] p-3 rounded-lg">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span className="font-medium">Seleccionado: {format(date, "EEEE, d 'de' MMMM 'de' yyyy")}</span>
                  </div>
                )}
              </div>

              {date && (
                <div className="md:w-96 space-y-4 mt-4 md:mt-12 md:pl-4 transition-all duration-300 ease-in-out transform opacity-100 translate-x-0 animate-in fade-in slide-in-from-right-5">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-lg font-medium text-[#B2042E]">
                      Hora de Inicio
                    </Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger
                        id="start-time"
                        className={cn(
                          "border-[#DBE0E3] rounded-lg h-11 shadow-sm",
                          startTime ? "text-[#B2042E]" : "text-gray-500",
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4 text-[#B2042E]" />
                        <SelectValue placeholder="Seleccionar hora de inicio" />
                      </SelectTrigger>
                      <SelectContent className="border-[#DBE0E3] rounded-lg">
                        {timeOptions.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-lg font-medium text-[#B2042E]">
                      Hora de Finalización
                    </Label>
                    <Select value={endTime} onValueChange={setEndTime} disabled={!startTime}>
                      <SelectTrigger
                        id="end-time"
                        className={cn(
                          "border-[#DBE0E3] rounded-lg h-11 shadow-sm",
                          endTime ? "text-[#B2042E]" : "text-gray-500",
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4 text-[#B2042E]" />
                        <SelectValue placeholder="Seleccionar hora de finalización" />
                      </SelectTrigger>
                      <SelectContent className="border-[#DBE0E3] rounded-lg">
                        {timeOptions
                          .filter((time) => !startTime || time > startTime)
                          .map((time) => (
                            <SelectItem key={`end-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-[#DBE0E3] p-6">
            <Button
              className="w-full bg-[#B2042E] hover:bg-[#8c0325] text-white h-12 rounded-lg text-lg font-medium shadow-md transition-all hover:shadow-lg border-0"
              onClick={handleContinue}
              disabled={!date || !startTime || !endTime}
            >
              Continuar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
