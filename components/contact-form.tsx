"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Loader2, Send } from "lucide-react"

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  projectLocation: z.string().trim().max(150).optional(),
  serviceInterest: z.string().min(1, "Please select an inquiry type"),
  message: z.string().trim().min(10, "Please share a little more detail").max(4000),
  preferredContact: z.enum(["phone", "email", "either"]),
  agreeToTerms: z.boolean().refine(Boolean, "Please accept the privacy policy"),
  website: z.string().optional(),
})
type ContactFormData = z.infer<typeof contactSchema>
const inquiryTypes = ["Glass facade systems", "ACP & aluminium cladding", "Commercial glass work", "Glass or structural railings", "Roofing or framework", "Project discussion", "Other inquiry"]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", company: "", email: "", phone: "", projectLocation: "", serviceInterest: "", message: "", preferredContact: "phone", agreeToTerms: false, website: "" } })
  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      const payload = await response.json().catch(() => null) as { error?: string } | null
      if (!response.ok) throw new Error(payload?.error || "Unable to send your inquiry")
      setIsSubmitted(true); form.reset()
    } catch (error) { toast({ title: "Inquiry not sent", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" }) }
    finally { setIsSubmitting(false) }
  }
  if (isSubmitted) return <div className="text-center py-12"><CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /><h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Inquiry received</h3><p className="text-slate-600 dark:text-slate-400 mb-6">Thank you. Our team will review your message.</p><Button onClick={() => setIsSubmitted(false)} variant="outline">Send another inquiry</Button></div>
  return <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name *</FormLabel><FormControl><Input autoComplete="name" placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="company" render={({ field }) => <FormItem><FormLabel>Company</FormLabel><FormControl><Input autoComplete="organization" placeholder="Company name, if applicable" {...field} /></FormControl><FormMessage /></FormItem>} /></div>
    <div className="grid md:grid-cols-2 gap-6"><FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input autoComplete="tel" type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input autoComplete="email" type="email" placeholder="Your email address" {...field} /></FormControl><FormMessage /></FormItem>} /></div>
    <div className="grid md:grid-cols-2 gap-6"><FormField control={form.control} name="serviceInterest" render={({ field }) => <FormItem><FormLabel>Inquiry type *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Choose a service or inquiry" /></SelectTrigger></FormControl><SelectContent>{inquiryTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} /><FormField control={form.control} name="projectLocation" render={({ field }) => <FormItem><FormLabel>Project location</FormLabel><FormControl><Input placeholder="Mumbai, Navi Mumbai, Pune..." {...field} /></FormControl><FormMessage /></FormItem>} /></div>
    <FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel>How can we help? *</FormLabel><FormControl><Textarea placeholder="Share your requirement or question" className="min-h-[130px]" {...field} /></FormControl><FormMessage /></FormItem>} />
    <FormField control={form.control} name="preferredContact" render={({ field }) => <FormItem><FormLabel>Preferred contact method</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="phone">Phone</SelectItem><SelectItem value="email">Email</SelectItem><SelectItem value="either">Either</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
    <FormField control={form.control} name="website" render={({ field }) => <FormItem className="hidden" aria-hidden="true"><FormControl><Input tabIndex={-1} autoComplete="off" {...field} /></FormControl></FormItem>} />
    <FormField control={form.control} name="agreeToTerms" render={({ field }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>I agree to the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and allow Roop Glass Solutions to contact me about this inquiry. *</FormLabel><FormMessage /></div></FormItem>} />
    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">{isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending inquiry...</> : <><Send className="mr-2 h-4 w-4" />Send inquiry</>}</Button>
  </form></Form>
}
