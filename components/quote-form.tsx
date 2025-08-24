"use client"

import type React from "react"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Calculator, Upload, CheckCircle, X } from "lucide-react"

const quoteSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  projectType: z.enum(["residential", "commercial", "repair", "custom"]),
  glassType: z.enum(["tempered", "laminated", "insulated", "decorative", "smart", "other"]),
  serviceNeeded: z.array(z.string()).min(1, "Please select at least one service"),
  projectLocation: z.string().min(5, "Please provide a valid location"),
  dimensions: z.object({
    length: z.string().min(1, "Length is required"),
    width: z.string().min(1, "Width is required"),
    height: z.string().optional(),
    unit: z.enum(["feet", "meters", "inches"]),
  }),
  urgency: z.enum(["standard", "urgent", "emergency"]),
  budget: z.enum(["under-50k", "50k-100k", "100k-200k", "200k-500k", "above-500k"]),
  projectDescription: z.string().min(20, "Please provide a detailed description"),
  preferredDate: z.string().optional(),
  hasSketch: z.boolean(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const services = [
  { id: "installation", label: "Installation" },
  { id: "repair", label: "Repair" },
  { id: "replacement", label: "Replacement" },
  { id: "maintenance", label: "Maintenance" },
  { id: "consultation", label: "Consultation" },
  { id: "design", label: "Custom Design" },
]

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "residential",
      glassType: "tempered",
      serviceNeeded: [],
      projectLocation: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
        unit: "feet",
      },
      urgency: "standard",
      budget: "under-50k",
      projectDescription: "",
      preferredDate: "",
      hasSketch: false,
      agreeToTerms: false,
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFiles(Array.from(files))
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("quoteData", JSON.stringify(data))

      uploadedFiles.forEach((file) => {
        formData.append("files", file)
      })

      // Update the fetch URL to your AWS API Gateway endpoint
      const response = await fetch("https://crgqmss1uc.execute-api.us-east-1.amazonaws.com/new_stage/quote", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
        setUploadedFiles([])
        toast({
          title: "Quote request submitted!",
          description: "We'll send you a detailed quote within 24-48 hours.",
        })
      } else {
        throw new Error("Failed to submit quote request")
      }
    } catch (error) {
      toast({
        title: "Error submitting quote request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Quote Request Submitted!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Thank you for your quote request. Our team will review your requirements and send you a detailed quote within
          24-48 hours.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Submit Another Quote Request
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="custom">Custom Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="glassType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glass Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tempered">Tempered Glass</SelectItem>
                      <SelectItem value="laminated">Laminated Glass</SelectItem>
                      <SelectItem value="insulated">Insulated Glass</SelectItem>
                      <SelectItem value="decorative">Decorative Glass</SelectItem>
                      <SelectItem value="smart">Smart Glass</SelectItem>
                      <SelectItem value="other">Other (specify in description)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="projectLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Location *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the project address or area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceNeeded"
            render={() => (
              <FormItem>
                <FormLabel>Services Needed *</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <FormField
                      key={service.id}
                      control={form.control}
                      name="serviceNeeded"
                      render={({ field }) => {
                        return (
                          <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, service.id])
                                    : field.onChange(field.value?.filter((value) => value !== service.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{service.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dimensions */}
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Dimensions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="dimensions.length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="inches">Inches</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Project Preferences */}
        <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Project Urgency *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard (2-4 weeks)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent">Urgent (1-2 weeks)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="emergency" id="emergency" />
                        <Label htmlFor="emergency">Emergency (within 1 week)</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (INR) *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                      <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                      <SelectItem value="200k-500k">₹2,00,000 - ₹5,00,000</SelectItem>
                      <SelectItem value="above-500k">Above ₹5,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Project Description and Files */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide detailed information about your project, including specific requirements, design preferences, and any special considerations..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="file-upload" className="text-sm font-medium">
              Upload Sketches or Reference Images
            </Label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-slate-500 dark:text-slate-400" />
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, PDF up to 10MB each</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-100 dark:bg-slate-700 p-2 rounded"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Quote Request...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Submit Quote Request
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
