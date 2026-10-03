"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"

export function CallPopup() {
  const [open, setOpen] = useState(false)
  // Don't interrupt visitors leaving a review or admins managing content.
  const suppressed = /^\/(review|admin)(\/|$)/.test(usePathname() || "")

  useEffect(() => {
    if (suppressed) { setOpen(false); return }
    const dismissed = sessionStorage.getItem("rgs_call_dismissed")
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [suppressed])

  function handleClose() {
    setOpen(false)
    sessionStorage.setItem("rgs_call_dismissed", "1")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogTitle className="sr-only">Contact Roop Glass Solutions</DialogTitle>
        <DialogDescription className="sr-only">Reach us for commercial glass and facade inquiries</DialogDescription>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold">Have a project to discuss?</h2>
          <p className="text-slate-600 dark:text-slate-300">We are available 24 hours a day, 7 days a week for commercial glass, facade and roofing inquiries.</p>
          <a href="tel:+919320008279" className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              Call +91 93200 08279
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
