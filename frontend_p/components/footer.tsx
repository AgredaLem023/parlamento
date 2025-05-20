import Link from "next/link"
import { Facebook, Instagram, MapPin, Clock, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-secondary-navy text-alabaster pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">El Parlamento</h3>
            <p className="text-sm mb-4">
            Una cafetería y casa cultural única en La Paz, Bolivia, que celebra la historia, la cultura y la gastronomía bolivianas.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contactanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary-ruby shrink-0 mt-0.5" />
                <span>Calle Comercio,esquina Colón #1280</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary-ruby shrink-0" />
                <span>+591 78516505</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary-ruby shrink-0" />
                <span>info@elparlamento.bo</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Horarios</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-primary-ruby shrink-0 mt-0.5" />
                <div>
                  <p>Lunes - Viernes: 8am - 11pm</p>
                  <p>Sabados: 9am - 9pm</p>
                  <p>Domingos: 9am - 3pm</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Encuentranos en</h3>
            <div className="flex space-x-5">
              <Button variant="ghost" size="lg" className="p-2" asChild>
                <Link href="https://www.instagram.com/elparlamento.bo/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="text-alabaster hover:text-primary-ruby"
                  />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="p-2" asChild>
                <Link href="https://www.facebook.com/profile.php?id=61566976663843" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    width={28}
                    height={28}
                    className="text-alabaster hover:text-primary-ruby"
                  />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="p-2" asChild>
                <Link href="https://wa.me/59178516505" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <Image
                    src="/icons/whatsapp-icon-w.svg"
                    alt="WhatsApp"
                    width={28}
                    height={28}
                    className="text-alabaster hover:text-primary-ruby"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} El Parlamento. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
