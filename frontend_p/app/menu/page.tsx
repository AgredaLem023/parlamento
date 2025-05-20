"use client"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { animate } from "@motionone/dom"
import { useEffect, useRef, useState } from "react"

// Menu item type
type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  image: string
  tags?: string[]
  historical?: string
}

type MenuCategory = {
  title: string;
  items: MenuItem[];
};

type MenuData = {
  "cafes y bebidas": MenuCategory;
  "autor": MenuCategory;
  "pasteleria": MenuCategory;
  [key: string]: MenuCategory; // Optional for flexibility
};


async function getMenuData(): Promise<MenuData> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${baseUrl}/api/menu`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch menu data");
    return res.json();
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return {
      "cafes y bebidas": { title: "Cafés & Bebidas", items: [] },
      "autor": { title: "Cocina de Autor", items: [] },
      "pasteleria": { title: "Pasteleria", items: [] }
    };
  }
}

export default function MenuPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  // Hero section refs
  const heroBackgroundRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  
  // Menu data state
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch menu data
    const fetchData = async () => {
      try {
        const data = await getMenuData();
        setMenuData(data);
      } catch (err) {
        console.error("Error fetching menu data:", err);
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
    
    // Animate text elements with staggered delay
    const textElements = [
      heroTitleRef.current,
      heroDescriptionRef.current
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

  if (isLoading) {
    return <div className="pt-24 text-center">Loading menu...</div>;
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0" ref={heroBackgroundRef}>
          <Image src="/menu_hero.png" alt="El Parlamento Menu" fill className="object-cover brightness-75" priority />
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Nuestro Menú</h1>
          <p ref={heroDescriptionRef} className="text-lg md:text-xl max-w-2xl">
            Descubre nuestros platos y bebidas emblemáticos, cada uno inspirado en la historia y la cultura de Bolivia.
          </p>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-16">
        <div className="container-custom">
          {menuData && (
            <Tabs defaultValue="cafes y bebidas" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="cafes y bebidas" id="cafes y bebidas">
                  Cafés & Bebidas
                </TabsTrigger>
                <TabsTrigger value="autor" id="autor">
                  Cocina de Autor
                </TabsTrigger>
                <TabsTrigger value="pasteleria" id="pasteleria">
                  Pasteleria
                </TabsTrigger>
              </TabsList>

              {Object.entries(menuData).map(([category, { title, items }]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <h2 className="text-3xl font-bold text-secondary-navy mb-8 text-center">{title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((item: MenuItem) => (
                      <Card 
                        key={item.id} 
                        className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 group"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="relative h-[200px] md:h-full overflow-hidden">
                          <Image
                            src={item.image ? `${baseUrl}${item.image}` : "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          </div>
                          <CardContent className="p-6 md:col-span-2">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-secondary-navy">{item.name}</h3>
                              <span className="text-lg font-bold text-primary-ruby">{item.price}</span>
                            </div>
                            <p className="text-muted-teal mb-3">{item.description}</p>
                            {Array.isArray(item.tags) && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="bg-alabaster transition-colors duration-300 hover:bg-primary-ruby/10">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {item.historical && (
                              <p className="text-sm italic text-primary-ruby">
                                <span className="font-medium">Nota Histórica:</span> {item.historical}
                              </p>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Special Diets */}
      <section className="py-12 bg-alabaster">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-secondary-navy mb-6 text-center">Información Dietética</h2>
          <p className="text-center text-muted-teal max-w-3xl mx-auto">
            Atendemos diversas necesidades dietéticas. Por favor, informe a nuestro personal sobre cualquier alergia o restricción. 
            {/* Opciones vegetarianas, veganas y sin gluten disponibles a solicitud. */}
          </p>
        </div>
      </section>
    </div>
  )
}
