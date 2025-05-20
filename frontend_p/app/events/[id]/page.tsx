import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { notFound } from "next/navigation";
import EventRegistrationForm from "@/components/event-registration-form"

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
  longDescription?: string
  presenter?: string
  price?: string
}


export default async function EventDetailPage({ params }: { params: { id: string } }) {
  // Fetch the main event
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${baseUrl}/api/events/${resolvedParams.id}`, { cache: "no-store" });
  if (!res.ok) {
    notFound();
  }
  const event: Event = await res.json();

  // Fetch all events for related events
  const allRes = await fetch(`${baseUrl}/api/events`, { cache: "no-store" });
  const events: Event[] = await allRes.json();

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-primary-ruby rounded-full text-sm font-medium mb-4">
              {event.category ? (
                event.category.charAt(0).toUpperCase() + event.category.slice(1)
              ) : (
                "Sin categoría"
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Capacity: {event.capacity} people
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-secondary-navy mb-6">About This Event</h2>

              {event.presenter && <p className="text-primary-ruby font-medium mb-4">Presented by: {event.presenter}</p>}

              <div className="prose max-w-none text-muted-teal mb-8">
                {event.longDescription?.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="bg-alabaster p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-secondary-navy mb-4">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-secondary-navy">Date & Time</h4>
                    <p className="text-muted-teal">
                      {event.date}, {event.time}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-navy">Location</h4>
                    <p className="text-muted-teal">El Parlamento - {event.location}</p>
                    <p className="text-muted-teal">123 Calle Principal, La Paz, Bolivia</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-navy">Price</h4>
                    <p className="text-muted-teal">{event.price || "Free"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-navy">Capacity</h4>
                    <p className="text-muted-teal">{event.capacity} people</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div>
              <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-secondary-navy mb-6">Register for This Event</h3>
                <EventRegistrationForm eventId={event.id} eventTitle={event.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16 bg-alabaster">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-navy mb-8 text-center">You Might Also Be Interested In</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events
              .filter((e) => e.id !== event.id && e.category === event.category)
              .slice(0, 3)
              .map((relatedEvent) => (
                <div key={relatedEvent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={relatedEvent.image || "/placeholder.svg"}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-secondary-navy mb-2">{relatedEvent.title}</h3>
                    <p className="text-sm text-muted-teal mb-4">
                      {relatedEvent.date} • {relatedEvent.time}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/events/${relatedEvent.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
