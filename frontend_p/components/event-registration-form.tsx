"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface EventRegistrationFormProps {
  eventId: string
  eventTitle: string
}

export default function EventRegistrationForm({ eventId, eventTitle }: EventRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: "1",
    specialRequirements: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real application, you would send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      toast({
        title: "Registration successful!",
        description: `You have successfully registered for "${eventTitle}". We've sent a confirmation email with details.`,
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-secondary-navy mb-2">Registration Complete!</h3>
        <p className="text-muted-teal mb-6">
          Thank you for registering for this event. We've sent a confirmation email with all the details.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false)
            setFormData({
              name: "",
              email: "",
              phone: "",
              numberOfGuests: "1",
              specialRequirements: "",
              agreeToTerms: false,
            })
          }}
        >
          Register Another Person
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
      </div>

      <div>
        <Label htmlFor="numberOfGuests">Number of Guests</Label>
        <Input
          id="numberOfGuests"
          name="numberOfGuests"
          type="number"
          min="1"
          max="10"
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="specialRequirements">Special Requirements</Label>
        <Textarea
          id="specialRequirements"
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          placeholder="Any dietary restrictions, accessibility needs, or other requirements"
          rows={3}
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} />
        <Label htmlFor="agreeToTerms" className="text-sm font-normal">
          I agree to the terms and conditions, including the privacy policy and event cancellation policy.
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Now"}
      </Button>

      <p className="text-xs text-center text-muted-teal">
        Registration is free but required for capacity planning. Please cancel if you can't attend.
      </p>
    </form>
  )
}
