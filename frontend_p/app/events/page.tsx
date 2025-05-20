"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import EventCalendar from "@/components/event-calendar-n"
import { animate } from "@motionone/dom"
import { useEffect, useRef, useState } from "react"

// Event type
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

const categoryInfo = {
  workshop: { icon: <Users className="h-5 w-5" />, color: "bg-primary-ruby text-white" },
  performance: { icon: <Users className="h-5 w-5" />, color: "bg-highlight-chartreuse text-secondary-navy" },
  meeting: { icon: <Users className="h-5 w-5" />, color: "bg-secondary-navy text-white" },
  exhibition: { icon: <Users className="h-5 w-5" />, color: "bg-muted-teal text-white" },
}

async function getEvents(): Promise<Event[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${baseUrl}/api/events`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default function EventsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  // Hero section refs
  const heroBackgroundRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroButtonRef = useRef(null);
  
  // State for events
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch events
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Hero section animations
    if (heroBackgroundRef.current) {
      animate(
        heroBackgroundRef.current,
        { scale: [1.05, 1], opacity: [0.8, 1] },
        { duration: 2, easing: [0.25, 0.1, 0.25, 1] }
      );
    }
    
    if (heroOverlayRef.current) {
      animate(
        heroOverlayRef.current,
        { opacity: [0, 0.7] },
        { duration: 1.5, easing: [0.25, 0.1, 0.25, 1] }
      );
    }
    
    // Animate text elements with staggered delay
    const textElements = [
      heroTitleRef.current,
      heroDescriptionRef.current,
      heroButtonRef.current
    ];
    
    textElements.forEach((el, i) => {
      if (el) {
        animate(
          el,
          { opacity: [0, 1], y: [30, 0] },
          { 
            duration: 0.7, 
            delay: 0.2 * i + 0.5, 
            easing: [0.25, 0.1, 0.25, 1] 
          }
        );
      }
    });
  }, []);

  return (
    <div className="pt-24">
        {/* Host an Event */}
        <section className="relative h-[80vh] flex items-center bg-secondary-navy text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0" ref={heroBackgroundRef}>
            <Image
              src="/events_hero.jpg"
              alt="Private Event at El Parlamento"
              fill
              className="object-cover"
              priority
            />
            {/* Optional: Overlay for better text contrast */}
            <div className="absolute inset-0 bg-secondary-navy/70" ref={heroOverlayRef} />
          </div>
          {/* Content */}
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h2 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
                Reserva tu evento en El Parlamento
              </h2>
              <p ref={heroDescriptionRef} className="text-lg mb-6">
                Nuestro espacio cultural está disponible para eventos privados, reuniones, talleres y más. Ofrecemos catering, equipo audiovisual y un equipo dedicado para que tu evento sea un éxito.
              </p>
              <div ref={heroButtonRef}>
                <Button asChild className="bg-primary-ruby hover:bg-primary-ruby/90 transition-transform duration-300 hover:scale-105">
                  <Link href="/events/book_events">Solicita tu reserva</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      {/* Calendar Section */}
      <section className="py-16 bg-alabaster">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-navy mb-8 text-center mr-5">Proximos eventos</h2>
          {isLoading ? (
            <div className="text-center py-10">Loading calendar...</div>
          ) : (
            <EventCalendar events={events} />
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-alabaster">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-navy mb-8 text-center">Eventos pasados</h2>
          {isLoading ? (
            <div className="text-center py-10">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-10">No events found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: Event) => (
                <Card key={event.id} className="overflow-hidden border-none shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:-translate-y-2 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={event.image ? `${baseUrl}${event.image}` : "/placeholder.svg"} 
                      alt={event.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${categoryInfo[event.category as keyof typeof categoryInfo].color}`}
                    >
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-secondary-navy mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-teal">
                        <Calendar className="h-4 w-4 mr-2 text-primary-ruby" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-teal">
                        <Clock className="h-4 w-4 mr-2 text-primary-ruby" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-teal">
                        <MapPin className="h-4 w-4 mr-2 text-primary-ruby" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-teal">
                        <Users className="h-4 w-4 mr-2 text-primary-ruby" />
                        Capacity: {event.capacity} people
                      </div>
                    </div>
                    <p className="text-muted-teal">{event.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button asChild className="w-full transition-colors duration-300 hover:bg-primary-ruby hover:text-white">
                      <Link href={`/events/${event.id}`}>View Details & Register</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
