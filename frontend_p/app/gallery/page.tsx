import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Gallery image type
type GalleryImage = {
  id: string
  src: string
  alt: string
  category: "space" | "events" | "food" | "people"
  width: number
  height: number
}

// Sample gallery images
const galleryImages: GalleryImage[] = [
  // Space images
  {
    id: "s1",
    src: "/gallery/space-1.jpg",
    alt: "El Parlamento main café area with traditional Bolivian decor",
    category: "space",
    width: 800,
    height: 600,
  },
  {
    id: "s2",
    src: "/gallery/space-2.jpg",
    alt: "Library corner with books about Bolivian history and culture",
    category: "space",
    width: 600,
    height: 800,
  },
  {
    id: "s3",
    src: "/gallery/space-3.jpg",
    alt: "Outdoor patio with view of La Paz",
    category: "space",
    width: 800,
    height: 600,
  },
  {
    id: "s4",
    src: "/gallery/space-4.jpg",
    alt: "Gallery wall featuring local Bolivian artists",
    category: "space",
    width: 800,
    height: 800,
  },
  {
    id: "s5",
    src: "/gallery/space-5.jpg",
    alt: "Coffee bar with traditional Bolivian textiles",
    category: "space",
    width: 800,
    height: 600,
  },

  // Events images
  {
    id: "e1",
    src: "/gallery/event-1.jpg",
    alt: "Coffee tasting workshop with local beans",
    category: "events",
    width: 800,
    height: 600,
  },
  {
    id: "e2",
    src: "/gallery/event-2.jpg",
    alt: "Traditional Bolivian music performance",
    category: "events",
    width: 800,
    height: 600,
  },
  {
    id: "e3",
    src: "/gallery/event-3.jpg",
    alt: "Book club discussion about Bolivian literature",
    category: "events",
    width: 600,
    height: 800,
  },
  {
    id: "e4",
    src: "/gallery/event-4.jpg",
    alt: "Traditional weaving demonstration",
    category: "events",
    width: 800,
    height: 600,
  },
  {
    id: "e5",
    src: "/gallery/event-5.jpg",
    alt: "Political discussion panel about Bolivia's future",
    category: "events",
    width: 800,
    height: 600,
  },
  {
    id: "e6",
    src: "/gallery/event-6.jpg",
    alt: "Cooking class making traditional Bolivian salteñas",
    category: "events",
    width: 800,
    height: 600,
  },

  // Food images
  {
    id: "f1",
    src: "/gallery/food-1.jpg",
    alt: "Traditional Bolivian salteñas served at El Parlamento",
    category: "food",
    width: 800,
    height: 600,
  },
  {
    id: "f2",
    src: "/gallery/food-2.jpg",
    alt: "Signature coffee drinks with Bolivian beans",
    category: "food",
    width: 600,
    height: 800,
  },
  {
    id: "f3",
    src: "/gallery/food-3.jpg",
    alt: "Chairo soup, a traditional Bolivian dish",
    category: "food",
    width: 800,
    height: 600,
  },
  {
    id: "f4",
    src: "/gallery/food-4.jpg",
    alt: "Pique Macho, a popular Bolivian dish",
    category: "food",
    width: 800,
    height: 600,
  },
  {
    id: "f5",
    src: "/gallery/food-5.jpg",
    alt: "Traditional Bolivian pastries and desserts",
    category: "food",
    width: 800,
    height: 600,
  },

  // People images
  {
    id: "p1",
    src: "/gallery/people-1.jpg",
    alt: "El Parlamento's team of baristas and chefs",
    category: "people",
    width: 800,
    height: 600,
  },
  {
    id: "p2",
    src: "/gallery/people-2.jpg",
    alt: "Customers enjoying coffee and conversation",
    category: "people",
    width: 800,
    height: 600,
  },
  {
    id: "p3",
    src: "/gallery/people-3.jpg",
    alt: "Local artists showcasing their work",
    category: "people",
    width: 600,
    height: 800,
  },
  {
    id: "p4",
    src: "/gallery/people-4.jpg",
    alt: "Community gathering at El Parlamento",
    category: "people",
    width: 800,
    height: 600,
  },
]

export default function GalleryPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery-hero.jpg"
            alt="El Parlamento Gallery"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Explore El Parlamento through our collection of images showcasing our space, events, food, and community.
          </p>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16">
        <div className="container-custom">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="space">Our Space</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="food">Food & Drinks</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>

            {/* All Images */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative overflow-hidden rounded-lg"
                    style={{
                      height: `${image.height > image.width ? "400px" : "300px"}`,
                    }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Filtered Categories */}
            {["space", "events", "food", "people"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages
                    .filter((image) => image.category === category)
                    .map((image) => (
                      <div
                        key={image.id}
                        className="relative overflow-hidden rounded-lg"
                        style={{
                          height: `${image.height > image.width ? "400px" : "300px"}`,
                        }}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-alabaster">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-navy mb-8 text-center">Follow Us on Instagram</h2>
          <p className="text-center text-muted-teal max-w-3xl mx-auto mb-8">
            Stay updated with our latest events, menu items, and cultural activities by following us on Instagram.
          </p>
          <div className="flex justify-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-ruby text-white rounded-lg hover:bg-primary-ruby/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @ElParlamentoLaPaz
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
