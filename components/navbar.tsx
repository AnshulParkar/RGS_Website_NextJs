"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
        : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/favicon.png" alt="Roop Glass Solutions Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              Roop Glass Solutions
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              className="hidden xl:flex text-sm items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors font-medium"
              href="tel:+919320008279"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 9320008279
            </a>
            <ThemeToggle />
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md shadow-blue-500/20">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Toggle navigation" className="rounded-lg">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden py-5 border-t border-slate-200 dark:border-slate-800 space-y-1 animate-fadeInUp" style={{ animationDuration: "0.3s" }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Link href="/contact" onClick={() => setOpen(false)}>Contact us</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
