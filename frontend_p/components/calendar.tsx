"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { EventType } from "@/lib/types"
import { useEventStore } from "@/lib/store"

interface CalendarProps {
  events: EventType[]
}

export function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { setSelectedDate, setSelectedEvents } = useEventStore()

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Previous month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Month names
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Day names
  const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]

  // Check if date has events
  const hasEvents = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day)
    return events.some((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === dateToCheck.getDate() &&
        eventDate.getMonth() === dateToCheck.getMonth() &&
        eventDate.getFullYear() === dateToCheck.getFullYear()
      )
    })
  }

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(selectedDate)

    // Filter events for the selected date
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      )
    })

    setSelectedEvents(filteredEvents)
  }

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12 border border-transparent"></div>)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEventsForDay = hasEvents(day)
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={cn(
          "h-12 border rounded-md flex items-center justify-center cursor-pointer transition-colors",
          hasEventsForDay ? "bg-[#B2042E]/20 hover:bg-[#B2042E]/50 font-medium" : "hover:bg-muted",
        )}
        onClick={() => handleDateSelect(day)}
      >
        {day}
      </div>,
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <h2 className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-medium text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-primary/10 mr-2"></div>
        <span>Fechas con eventos</span>
      </div>
    </div>
  )
}
