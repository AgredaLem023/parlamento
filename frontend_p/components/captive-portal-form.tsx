"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Wifi } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre completo debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese una dirección de correo electrónico válida.",
  }),
  uniqueId: z.string().min(1, {
    message: "El ID único es obligatorio.",
  }),
})

export function CaptivePortalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      uniqueId: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your backend
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Acceso concedido",
        description: "Ahora estás conectado a la red.",
      })

      // In a real application, you would redirect the user or update the UI
      // router.push("/connected")
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "Por favor intenta nuevamente más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-secondary-navy">
      <CardHeader className="space-y-1 flex items-center justify-center bg-secondary-navy text-white">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
          <Wifi className="h-6 w-6 text-highlight-chartreuse" />
        </div>
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">Iniciar Sesión</h2>
          <p className="text-sm text-alabaster">Ingresa tus datos para acceder a internet</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-navy">Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} className="border-muted-teal focus-visible:ring-primary-ruby" />
                  </FormControl>
                  <FormMessage className="text-primary-ruby" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-navy">Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="juan.perez@ejemplo.com" {...field} className="border-muted-teal focus-visible:ring-primary-ruby" />
                  </FormControl>
                  <FormMessage className="text-primary-ruby" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uniqueId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-navy">ID Único</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu identificador único" {...field} className="border-muted-teal focus-visible:ring-primary-ruby" />
                  </FormControl>
                  <FormDescription className="text-muted-teal">Este es el ID único que se te proporcionó.</FormDescription>
                  <FormMessage className="text-primary-ruby" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary-ruby hover:bg-primary-ruby/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Conectando..." : "Conectar a la Red"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 bg-alabaster py-3">
        <p className="text-xs text-center text-secondary-navy">
          Al conectarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </CardFooter>
    </Card>
  )
}
