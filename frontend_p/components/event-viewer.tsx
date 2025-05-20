"use client"

import { useEventStore } from "@/lib/store"
import { EventCard } from "@/components/event-card"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"

export function EventViewer() {
  const { selectedDate, selectedEvents } = useEventStore()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Eventos</h2>
        {selectedDate ? (
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {format(selectedDate, "MMMM d, yyyy", { locale: es }).replace(/^./, (c) => c.toUpperCase())}
            </span>
          </div>
        ) : (
          <p className="text-muted-foreground">Selecciona una fecha para ver los eventos</p>
        )}
      </div>

      <div className="space-y-4">
        {selectedDate && selectedEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No hay eventos programados para esta fecha</p>
          </div>
        )}

        {selectedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
