"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  category: "workshop" | "performance" | "meeting" | "exhibition"
  capacity: number
}

// Helper function to convert date string to Date object
const parseDate = (dateStr: string): Date | null => {
  // Handle date ranges like "June 1-15, 2023"
  if (dateStr.includes("-")) {
    return new Date(dateStr.split("-")[0] + ", 2023")
  }

  try {
    return new Date(dateStr)
  } catch (e) {
    return null
  }
}

export default function EventCalendar({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([])

  // Function to handle date selection
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    if (!selectedDate) {
      setSelectedEvents([])
      return
    }

    // Find events on the selected date
    const eventsOnDate = events.filter((event) => {
      const eventDate = parseDate(event.date)
      if (!eventDate) return false

      // Check if the selected date matches the event date
      return (
        selectedDate.getDate() === eventDate.getDate() &&
        selectedDate.getMonth() === eventDate.getMonth() &&
        selectedDate.getFullYear() === eventDate.getFullYear()
      )
    })

    setSelectedEvents(eventsOnDate)
  }

  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    return events.some((event) => {
      const eventDate = parseDate(event.date)
      if (!eventDate) return false

      return (
        day.getDate() === eventDate.getDate() &&
        day.getMonth() === eventDate.getMonth() &&
        day.getFullYear() === eventDate.getFullYear()
      )
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border shadow-md bg-white p-4"
          modifiers={{
            hasEvent: (date) => hasEvents(date),
          }}
          modifiersClassNames={{
            hasEvent: "bg-primary-ruby/20 font-bold text-primary-ruby",
          }}
        />
      </div>
      <div>
        <Card className="h-full">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-secondary-navy mb-4">
              {selectedEvents.length > 0
                ? `Events on ${date?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                : "Select a date to see events"}
            </h3>

            {selectedEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedEvents.map((event) => (
                  <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-medium text-secondary-navy">{event.title}</h4>
                    <p className="text-sm text-muted-teal mb-2">
                      {event.time} • {event.location}
                    </p>
                    <Button asChild variant="link" className="p-0 h-auto text-primary-ruby">
                      <Link href={`/events/${event.id}`} className="flex items-center">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-teal">
                {date ? "No events scheduled for this date." : "Please select a date from the calendar."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
