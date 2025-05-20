"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import TestimonialCarousel from "@/components/testimonial-carousel"
import MapSection from "@/components/map-section"
import { animate, stagger } from "@motionone/dom"
import { useEffect, useRef } from "react"

export default function Home() {
  const backgroundRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // About section refs
  const aboutSectionRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutText1Ref = useRef(null);
  const aboutText2Ref = useRef(null);
  const aboutButtonRef = useRef(null);
  
  // Food categories refs
  const foodSectionRef = useRef(null);
  const foodTitleRef = useRef(null);
  const foodCardRef1 = useRef(null);
  const foodCardRef2 = useRef(null);
  const foodCardRef3 = useRef(null);
  
  // Array of food card refs for easier access in animations
  const foodCardRefs = [foodCardRef1, foodCardRef2, foodCardRef3];

  useEffect(() => {
    // Animate background
    if (backgroundRef.current) {
      animate(backgroundRef.current, 
        { scale: [1.05, 1], opacity: [0.7, 1] },
        { duration: 2, easing: [0.25, 0.1, 0.25, 1] }
      );
    }

    // Animate text elements
    const textElements = [titleRef.current, textRef.current, buttonsRef.current];
    textElements.forEach((el, i) => {
      if (el) {
        animate(el, 
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.7, delay: 0.3 * i, easing: [0.25, 0.1, 0.25, 1] }
        );
      }
    });

    // About section animations with Intersection Observer
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate image
            if (aboutImageRef.current) {
              animate(
                aboutImageRef.current,
                { opacity: [0, 1], y: [50, 0] },
                { duration: 0.9, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            // Staggered animation for text elements
            const aboutElements = [
              aboutTitleRef.current,
              aboutText1Ref.current,
              aboutText2Ref.current,
              aboutButtonRef.current
            ];
            
            aboutElements.forEach((el, i) => {
              if (el) {
                animate(
                  el,
                  { opacity: [0, 1], y: [30, 0] },
                  { 
                    duration: 0.7, 
                    delay: 0.2 * i + 0.3, 
                    easing: [0.25, 0.1, 0.25, 1] 
                  }
                );
              }
            });
            
            // Unobserve after animation is triggered
            aboutObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutSectionRef.current) {
      aboutObserver.observe(aboutSectionRef.current);
    }
    
    // Food categories section animations
    const foodObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (foodTitleRef.current) {
              animate(
                foodTitleRef.current,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.7, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            // Staggered animation for cards
            foodCardRefs.forEach((cardRef, i) => {
              if (cardRef.current) {
                animate(
                  cardRef.current,
                  { opacity: [0, 1], y: [50, 0] },
                  { 
                    duration: 0.8, 
                    delay: 0.2 * i + 0.4, 
                    easing: [0.25, 0.1, 0.25, 1] 
                  }
                );
              }
            });
            
            // Unobserve after animation is triggered
            foodObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (foodSectionRef.current) {
      foodObserver.observe(foodSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) aboutObserver.unobserve(aboutSectionRef.current);
      if (foodSectionRef.current) foodObserver.unobserve(foodSectionRef.current);
    };
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div 
          ref={backgroundRef}
          className="absolute inset-0 z-0 bg-black opacity-0"
        >
          <Image
            src="/main_hero_right.png"
            alt="El Parlamento Coffee Shop"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-white flex items-center justify-end h-full">
          <div className="max-w-2xl text-right">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"
            >
              Historia, Café y Honor
            </h1>
            <p 
              ref={textRef}
              className="text-lg md:text-xl mb-5 pl-8 md:pl-16 lg:pl-24 opacity-0"
            >
              Más que una cafetería, El Parlamento es una celebración de
              la historia, la cultura y la gastronomía boliviana, situada en el corazón de La Paz.
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-end opacity-0"
            >
              <Button asChild size="lg" className="bg-primary-ruby hover:bg-primary-ruby/90">
                <Link href="/menu">Explora nuestro menú</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link href="/events">Reserva un evento</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="py-16 bg-alabaster">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={aboutImageRef} className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden opacity-0">
              <Image src="/about_block.png" alt="El Parlamento Cultural House" fill className="object-cover" />
            </div>
            <div>
              <h2 ref={aboutTitleRef} className="text-3xl md:text-4xl font-bold text-secondary-navy mb-6 opacity-0">En El Parlamento Historia Café</h2>
              <p ref={aboutText1Ref} className="text-lg mb-6 text-muted-teal opacity-0">
                Honramos el legado de Bolivia al fusionar historia y gastronomía en un espacio único. Este café lounge, ubicado en una casa histórica de 1909 en el corazón de La Paz,
                es mucho más que un lugar para disfrutar de una comida; es un homenaje viviente a nuestras raíces, nuestros desafíos y nuestras victorias como nación.
              </p>
              <p ref={aboutText2Ref} className="text-lg mb-6 text-muted-teal opacity-0">
                Con recetas auténticas y sabores revitalizados, buscamos ofrecer a nuestros visitantes experiencias memorables que reflejen la riqueza y diversidad de este maravilloso territorio.
                Aquí no solo se celebra lo que hemos logrado, sino también el aprendizaje de nuestros errores, con la firme convicción de construir un futuro del que podamos estar orgullosos.
              </p>
              <Button 
                ref={aboutButtonRef} 
                asChild 
                className="bg-secondary-navy hover:bg-secondary-navy/90 opacity-0 transition-transform duration-300 hover:scale-105"
              >
                <Link href="/about">Conoce nuestra historia</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section ref={foodSectionRef} className="py-16">
        <div className="container-custom">
          <h2 ref={foodTitleRef} className="text-3xl md:text-4xl font-bold text-center text-secondary-navy mb-12 opacity-0">Descubre nuestro menú</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pasteleria",
                image: "/pasteleria_cat.jpg",
                description:
                  "Opciones para comenzar bien el día; panes artesanales, tostadas especiales y bowls frescos, ideales para un desayuno completo o un brunch relajado.",
                link: "/menu#pasteleria",
              },
              {
                title: "Cocina de Autor",
                image: "/platos_principales_cat.jpg",
                description: (
                  <>
                    Sandwiches y Re<strong>bowl</strong>uciones llenos de sabor, historia y creatividad, con productos locales y recetas que rinden homenaje a Bolivia.
                  </>
                ),
                link: "/menu#autor",
              },
              {
                title: "Cafés y Bebidas",
                image: "/cafes_bebidas_cat.jpg",
                description: 
                  "Desde cafés intensos y tés tradicionales hasta cocteles con historia y bebidas refrescantes, tenemos el acompañamiento perfecto para cualquier momento del día.",
                link: "/menu#cafes y bebidas",
              },
            ].map((category, index) => (
              <Card 
                key={index} 
                ref={foodCardRefs[index]} 
                className="overflow-hidden border-none shadow-lg opacity-0 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-600">{category.title}</h3>
                  <p className="text-black mb-4">{category.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary-ruby text-primary-ruby transition-all duration-300 hover:bg-primary-ruby hover:text-white"
                  >
                    <Link href={category.link}>Ver Menú</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary-navy text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Que dicen nuestros clientes</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Map & Hours */}
      <MapSection />
    </div>
  )
}
