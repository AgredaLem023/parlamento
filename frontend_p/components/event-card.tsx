"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EventType } from "@/lib/types"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"

interface EventCardProps {
  event: EventType
}

export function EventCard({ event }: EventCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden shrink-0">
            <Image
              src={event.image || "/placeholder.svg?height=96&width=96"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <Badge variant="outline" className="ml-2">
                {event.category}
              </Badge>
            </div>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
      <Button asChild variant="outline" className="w-full">
        <Link href={`/events/${event.id}`}>Ver más</Link>
      </Button>
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{event.title}</DialogTitle>
              <DialogDescription>
                {format(new Date(event.date), "MMMM d, yyyy")} at {event.time}
              </DialogDescription>
            </DialogHeader>
            <div className="relative w-full h-48 rounded-md overflow-hidden my-4">
              <Image
                src={event.image || "/placeholder.svg?height=192&width=468"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                {event.capacity && (
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Capacity: {event.capacity}</span>
                  </div>
                )}
              </div>
              <p>{event.description}</p>
              <div className="flex justify-end">
                <Badge>{event.category}</Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog> */}
      </CardFooter>
    </Card>
  )
}
