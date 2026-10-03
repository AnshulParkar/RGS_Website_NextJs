"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Loader2, Send, Star } from "lucide-react"

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  role: z.string().trim().max(80).optional(),
  location: z.string().trim().max(80).optional(),
  project: z.string().trim().max(120).optional(),
  rating: z.number().int().min(1, "Please choose a rating").max(5),
  quote: z.string().trim().min(20, "Please write at least 20 characters").max(800, "Please keep your review under 800 characters"),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  consent: z.boolean().refine(Boolean, "Please allow us to show your review"),
  website: z.string().optional(),
})
type ReviewFormData = z.infer<typeof reviewSchema>

const ratingLabels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"]

export function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ name: string; published: boolean } | null>(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<ReviewFormData>({ resolver: zodResolver(reviewSchema), defaultValues: { name: "", role: "", location: "", project: "", rating: 0, quote: "", email: "", consent: false, website: "" } })

  async function onSubmit(data: ReviewFormData) {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      const payload = await response.json().catch(() => null) as { error?: string; published?: boolean } | null
      if (!response.ok) throw new Error(payload?.error || "Unable to submit your review")
      setResult({ name: data.name.split(/\s+/)[0], published: Boolean(payload?.published) })
      form.reset()
    } catch (error) { setSubmitError(error instanceof Error ? error.message : "Unable to submit your review. Please try again.") }
    finally { setIsSubmitting(false) }
  }

  if (result) return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank you, {result.name}!</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
        {result.published
          ? "We really appreciate you taking the time to share your experience. Your review is now live on our website."
          : "We really appreciate you taking the time to share your experience. Your review will appear on our website once our team has reviewed it."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"><Link href="/">Back to home</Link></Button>
        {result.published && <Button asChild variant="outline"><Link href="/#testimonials">See testimonials</Link></Button>}
      </div>
    </div>
  )

  return <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField control={form.control} name="rating" render={({ field }) => {
      const shown = hoverRating || field.value
      return <FormItem><FormLabel>Your rating *</FormLabel><FormControl>
        <div className="flex items-center gap-3" onMouseLeave={() => setHoverRating(0)}>
          <div role="radiogroup" aria-label="Rating" className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button key={value} type="button" role="radio" aria-checked={field.value === value} aria-label={`${value} star${value > 1 ? "s" : ""}`}
                onClick={() => field.onChange(value)} onMouseEnter={() => setHoverRating(value)}
                className="p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <Star className={cn("w-8 h-8 transition-colors", value <= shown ? "text-amber-400 fill-current" : "text-slate-300 dark:text-slate-600")} />
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{ratingLabels[shown]}</span>
        </div>
      </FormControl><FormMessage /></FormItem>
    }} />
    <FormField control={form.control} name="quote" render={({ field }) => <FormItem><FormLabel>Your review *</FormLabel><FormControl><Textarea placeholder="How was your experience working with Roop Glass Solutions?" className="min-h-[140px]" maxLength={800} {...field} /></FormControl><FormMessage /></FormItem>} />
    <div className="grid md:grid-cols-2 gap-6"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name *</FormLabel><FormControl><Input autoComplete="name" placeholder="Your name or company" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role / company</FormLabel><FormControl><Input autoComplete="organization-title" placeholder="Architect, Owner, Project Manager..." {...field} /></FormControl><FormMessage /></FormItem>} /></div>
    <div className="grid md:grid-cols-2 gap-6"><FormField control={form.control} name="location" render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Mumbai, Thane, Pune..." {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="project" render={({ field }) => <FormItem><FormLabel>Project / work done</FormLabel><FormControl><Input placeholder="Glass facade, ACP cladding, partitions..." {...field} /></FormControl><FormMessage /></FormItem>} /></div>
    <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email <span className="font-normal text-slate-500">(optional, not shown publicly)</span></FormLabel><FormControl><Input autoComplete="email" type="email" placeholder="Your email address" {...field} /></FormControl><FormMessage /></FormItem>} />
    <FormField control={form.control} name="website" render={({ field }) => <FormItem className="hidden" aria-hidden="true"><FormControl><Input tabIndex={-1} autoComplete="off" {...field} /></FormControl></FormItem>} />
    <FormField control={form.control} name="consent" render={({ field }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>I allow Roop Glass Solutions to show my review, name, role and location on its website, as described in the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. *</FormLabel><FormMessage /></div></FormItem>} />
    {submitError && <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{submitError}</p>}
    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">{isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting review...</> : <><Send className="mr-2 h-4 w-4" />Submit review</>}</Button>
  </form></Form>
}
