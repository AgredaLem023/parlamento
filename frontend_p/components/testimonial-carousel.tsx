"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  name: string
  role: string
  content: string
  rating: number
}

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    fetch(`${baseUrl}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch testimonials")
        setLoading(false)
      })
  }, [baseUrl])

  if (loading) return <div>Loading testimonials...</div>
  if (error) return <div>{error}</div>

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - visibleCount + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1))
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif">Reseñas de nuestros clientes</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="bg-gray-200 hover:bg-gray-300 text-black border-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="bg-gray-200 hover:bg-gray-300 text-black border-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-h-5 w-5 text-black" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-none w-full md:w-1/2 lg:w-1/3 px-4">
              <Card className="h-full bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-navy-blue">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-highlight-chartreuse fill-highlight-chartreuse"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-black">{testimonial.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
