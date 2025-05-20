"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Coffee, BookOpen, Calendar } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { animate } from "@motionone/dom"

type TeamMember = {
  name: string
  role: string
  image: string
  bio: string
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([])

  // Hero section refs
  const heroBackgroundRef = useRef(null);
  const heroTitleRef = useRef(null);
  
  // Story section refs
  const storyRef = useRef(null);
  const storyTitleRef = useRef(null);
  const storyQuoteRef = useRef(null);
  const storyText1Ref = useRef(null);
  const storyText2Ref = useRef(null);
  const storyImageRef = useRef(null);
  
  // Values section refs
  const valuesRef = useRef(null);
  const valuesTitleRef = useRef(null);
  const valueCardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  
  // Spaces section refs
  const spacesRef = useRef(null);
  const spacesTitleRef = useRef(null);
  const spaceImageRefs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const spacesTextRef = useRef(null);
  
  // Team section refs
  const teamSectionRef = useRef(null);
  const teamTitleRef = useRef(null);
  const teamImageRef = useRef(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${baseUrl}/team`)
      .then((res) => res.json())
      .then((data) => setTeam(data))
      
    // Hero animations
    if (heroBackgroundRef.current) {
      animate(
        heroBackgroundRef.current, 
        { scale: [1.05, 1], opacity: [0.7, 1] },
        { duration: 2, easing: [0.25, 0.1, 0.25, 1] }
      );
    }
    
    if (heroTitleRef.current) {
      animate(
        heroTitleRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, delay: 0.3, easing: [0.25, 0.1, 0.25, 1] }
      );
    }
    
    // Story section animations with Intersection Observer
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate elements with staggered delay
            const storyElements = [
              storyTitleRef.current,
              storyQuoteRef.current,
              storyText1Ref.current,
              storyText2Ref.current
            ];
            
            storyElements.forEach((el, i) => {
              if (el) {
                animate(
                  el,
                  { opacity: [0, 1], y: [30, 0] },
                  { 
                    duration: 0.7, 
                    delay: 0.15 * i + 0.2, 
                    easing: [0.25, 0.1, 0.25, 1] 
                  }
                );
              }
            });
            
            // Animate image
            if (storyImageRef.current) {
              animate(
                storyImageRef.current,
                { opacity: [0, 1], x: [50, 0] },
                { duration: 0.9, delay: 0.6, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            storyObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (storyRef.current) {
      storyObserver.observe(storyRef.current);
    }
    
    // Values section animations
    const valuesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (valuesTitleRef.current) {
              animate(
                valuesTitleRef.current,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.7, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            // Animate cards with stagger
            valueCardRefs.forEach((cardRef, i) => {
              if (cardRef.current) {
                animate(
                  cardRef.current,
                  { opacity: [0, 1], y: [40, 0] },
                  { 
                    duration: 0.7, 
                    delay: 0.15 * i + 0.4, 
                    easing: [0.25, 0.1, 0.25, 1] 
                  }
                );
              }
            });
            
            valuesObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (valuesRef.current) {
      valuesObserver.observe(valuesRef.current);
    }
    
    // Spaces section animations
    const spacesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (spacesTitleRef.current) {
              animate(
                spacesTitleRef.current,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.7, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            // Animate images with stagger
            spaceImageRefs.forEach((imageRef, i) => {
              if (imageRef.current) {
                animate(
                  imageRef.current,
                  { opacity: [0, 1], y: [40, 0] },
                  { 
                    duration: 0.8, 
                    delay: 0.2 * i + 0.3, 
                    easing: [0.25, 0.1, 0.25, 1] 
                  }
                );
              }
            });
            
            // Animate text
            if (spacesTextRef.current) {
              animate(
                spacesTextRef.current,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.7, delay: 1.0, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            spacesObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (spacesRef.current) {
      spacesObserver.observe(spacesRef.current);
    }
    
    // Team section animations
    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (teamTitleRef.current) {
              animate(
                teamTitleRef.current,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.7, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            // Animate team image
            if (teamImageRef.current) {
              animate(
                teamImageRef.current,
                { opacity: [0, 1], scale: [0.95, 1] },
                { duration: 1.0, delay: 0.3, easing: [0.25, 0.1, 0.25, 1] }
              );
            }
            
            teamObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (teamSectionRef.current) {
      teamObserver.observe(teamSectionRef.current);
    }
    
    // Cleanup observers
    return () => {
      if (storyRef.current) storyObserver.unobserve(storyRef.current);
      if (valuesRef.current) valuesObserver.unobserve(valuesRef.current);
      if (spacesRef.current) spacesObserver.unobserve(spacesRef.current);
      if (teamSectionRef.current) teamObserver.unobserve(teamSectionRef.current);
    };
  }, []);


  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div ref={heroBackgroundRef} className="absolute inset-0 z-0 opacity-0">
          <Image
            src="/about_hero.jpg"
            alt="El Parlamento Interior"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"> Nuestra Historia </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 ref={storyTitleRef} className="text-3xl md:text-4xl font-bold mb-6 text-secondary-navy opacity-0">Parlamento</h2>
              <p ref={storyQuoteRef} className="text-lg mb-6 text-muted-teal opacity-0">
                "Quienes no conocen su historia, están condenados a repetirla."
              </p>
              <p ref={storyText1Ref} className="text-lg mb-6 text-muted-teal opacity-0">
                El Parlamento de la Ciudad de La Paz, es más que un simple órgano legislativo; es un testigo de la historia y el anhelo de un pueblo.
                Fundado en un contexto de cambio y desafío, este Parlamento ha sido un crisol donde se han forjado las voces de diversos sectores de la sociedad.
                Desde su creación, ha enfrentado las corrientes de la historia boliviana, adaptándose a los vaivenes políticos y sociales que han marcado el rumbo del país.
                En sus salas, resuenan los ecos de luchas pasadas, las aspiraciones de una ciudadanía activa y el deseo de construir un futuro más justo y equitativo para todos.
              </p>
              <p ref={storyText2Ref} className="text-lg text-muted-teal opacity-0">
                La historia del Parlamento de La Paz está entrelazada con los sueños y las realidades de los paceños, reflejando la rica tapestry de su cultura y diversidad.
                Desde los primeros concejos, que surgieron en la época colonial, hasta el moderno cuerpo legislativo que conocemos hoy.
              </p>
            </div>
            <div ref={storyImageRef} className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden opacity-0">
              <Image src="/team_2.jpg" alt="El Parlamento Founders" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-16 bg-alabaster">
        <div className="container-custom">
          <h2 ref={valuesTitleRef} className="text-3xl md:text-4xl font-bold text-center text-secondary-navy mb-12 opacity-0">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Coffee className="h-10 w-10 text-primary-ruby" />,
                title: "Calidad",
                description:
                  "Seleccionamos los mejores granos de café e ingredientes bolivianos, apoyando a productores locales y prácticas sostenibles.",
              },
              {
                icon: <BookOpen className="h-10 w-10 text-primary-ruby" />,
                title: "Autenticidad",
                description:
                  "Creemos en compartir conocimientos sobre la historia, política y tradiciones culinarias de Bolivia con nuestra comunidad.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary-ruby" />,
                title: "Comunidad",
                description:
                  "Creamos un espacio inclusivo donde personas de todos los orígenes pueden conectarse, compartir ideas y sentirse bienvenidas.",
              },
              {
                icon: <Calendar className="h-10 w-10 text-primary-ruby" />,
                title: "Cultura",
                description:
                  "Celebramos y preservamos la cultura boliviana a través de nuestros eventos, menú y los artefactos históricos exhibidos en nuestro espacio.",
              },
            ].map((value, index) => (
                              <Card 
                  key={index} 
                  ref={valueCardRefs[index]} 
                  className="border-none shadow-md opacity-0 transition-all duration-300 hover:shadow-xl hover:scale-[1.07] hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 transition-transform duration-300 hover:scale-110">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-secondary-navy">{value.title}</h3>
                    <p className="text-muted-teal">{value.description}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Space */}
      <section ref={spacesRef} className="py-16">
        <div className="container-custom">
          <h2 ref={spacesTitleRef} className="text-3xl md:text-4xl font-bold text-center text-secondary-navy mb-12 opacity-0">Nuestros Espacios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div ref={spaceImageRefs[0]} className="relative h-[300px] rounded-lg overflow-hidden opacity-0 group">
              <Image 
                src="/space_1.jpg" 
                alt="El Parlamento Restaurant" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div ref={spaceImageRefs[1]} className="relative h-[300px] rounded-lg overflow-hidden opacity-0 group">
              <Image 
                src="/space_2.jpg" 
                alt="El Parlamento eventos" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div ref={spaceImageRefs[2]} className="relative h-[300px] rounded-lg overflow-hidden opacity-0 group">
              <Image 
                src="/space_3.jpg" 
                alt="El Parlamento coworking" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <p ref={spacesTextRef} className="text-lg text-muted-teal max-w-3xl mx-auto opacity-0">
              Ubicado en un edificio colonial declarado patrimonio en pleno corazón de La Paz, El Parlamento te da la bienvenida con una propuesta para todos los gustos.
              Disfruta de nuestra amplia zona de restaurante, relájate o trabaja en las salas de coworking, organiza reuniones y eventos privados en espacios exclusivos,
              o celebra tanto tus momentos personales como encuentros de negocios en nuestro salón para grandes convocatorias.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamSectionRef} className="py-16 bg-gray-200 text-white">
        <div className="container-custom">
          <h2 ref={teamTitleRef} className="text-3xl md:text-4xl font-bold text-center mb-12 text-secondary-navy opacity-0">Nuestro Equipo</h2>
          <div className="flex justify-center">
            <div ref={teamImageRef} className="relative w-full max-w-3xl h-[400px] rounded-lg overflow-hidden shadow-lg opacity-0 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/team_bw.png"
                alt="El Parlamento Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
