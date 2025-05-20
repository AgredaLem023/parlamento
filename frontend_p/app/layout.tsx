import type React from "react"
import type { Metadata } from "next"
import { DM_Sans as Sans } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const sans = Sans({ subsets: ["latin"], variable: "--font-sans" })
const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "El Parlamento | Coffee Shop & Cultural House",
  description:
    "A unique coffee shop and cultural house in La Paz, Bolivia, celebrating Bolivian history, politics, and gastronomy.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "El Parlamento",
              description: "A coffee shop and cultural house in La Paz, Bolivia",
              address: {
                "@type": "PostalAddress",
                addressLocality: "La Paz",
                addressCountry: "Bolivia",
              },
              servesCuisine: "Bolivian",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
