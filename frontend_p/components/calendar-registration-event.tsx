"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns"

interface CustomCalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
  disabled?: (date: Date) => boolean
  height?: string
  width?: string
}

export function CustomCalendar({
  selected,
  onSelect,
  className,
  disabled,
  height = "auto",
  width = "100%",
}: CustomCalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today)

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleSelectDate = (date: Date) => {
    if (onSelect) {
      onSelect(date)
    }
  }

  const isDateDisabled = (date: Date) => {
    if (disabled) {
      return disabled(date)
    }
    return false
  }

  // Generate days for the current month view
  const generateDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = monthStart
    const endDate = monthEnd

    const days = []
    const startDay = getDay(startDate)

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    // Add days of the month
    let day = startDate
    while (isBefore(day, endDate) || isSameDay(day, endDate)) {
      days.push(day)
      day = addDays(day, 1)
    }

    return days
  }

  const days = generateDays()
  const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  return (
    <div
      className={cn("custom-calendar", className)}
      style={{
        height,
        width,
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}
    >
      <div className="calendar-header flex justify-between items-center p-4 bg-[#B2042E] text-white">
        <button
          onClick={handlePreviousMonth}
          className="p-2 rounded-full hover:bg-[#8c0325] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy").replace(/^\w/, (c) => c.toUpperCase())}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-[#8c0325] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="calendar-body p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center font-medium text-sm text-[#B2042E] py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-10 w-full" />
            }

            const isSelectedDay = selected && isSameDay(day, selected)
            const isDisabled = isDateDisabled(day)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isTodayDate = isToday(day)

            return (
              <button
                key={day.toString()}
                onClick={() => !isDisabled && handleSelectDate(day)}
                disabled={isDisabled}
                className={cn(
                  "h-10 w-full rounded-full flex items-center justify-center text-sm transition-colors",
                  isCurrentMonth ? "text-gray-800" : "text-[#DBE0E3]",
                  isDisabled && "opacity-50 cursor-not-allowed",
                  isSelectedDay && "bg-[#B2042E] text-white hover:bg-[#B2042E]",
                  !isSelectedDay && !isDisabled && "hover:bg-[#DBE0E3] hover:text-gray-800",
                  isTodayDate && !isSelectedDay && "border-2 border-[#B2042E] bg-[#f8e5e9]",
                )}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
