"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function CallPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm text-center">
        <DialogTitle className="sr-only">Call Now</DialogTitle>
        <DialogDescription className="sr-only">Contact us for immediate assistance</DialogDescription>
        <div className="flex flex-col items-center gap-4 py-4">
          <Phone className="w-12 h-12 text-blue-600 mb-2" />
          <h2 className="text-xl font-bold">Need Help? Call Us Now!</h2>
          <p className="text-slate-600 dark:text-slate-300">Our team is ready to assist you 24/7.</p>
          <a href="tel:+919320008279">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              Call +91 93200 08279
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
