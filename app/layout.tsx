import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CallPopup } from "@/components/call-popup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Roop Glass Solution - Premium Glass Solutions",
  description: "Professional glass installation, repair, and custom solutions for residential and commercial spaces. Glass Facade, ACP Cladding Work, Glass Work, Glass Railing, Unitized System, and more.",
  keywords: [
    "glass facade",
    "acp cladding work",
    "glass work",
    "glass railing",
    "unitized system",
    "glass partition",
    "glass installation",
    "commercial glass",
    "residential glass",
    "custom glass solutions",
    "roopglass"
  ].join(", ")
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Professional glass installation, repair, and custom solutions for residential and commercial spaces. Glass Facade, ACP Cladding Work, Glass Work, Glass Railing, Unitized System, and more." />
        <meta name="keywords" content="glass facade, acp cladding work, glass work, glass railing, unitized system, glass partition, glass installation, commercial glass, residential glass, custom glass solutions, roopglass" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <CallPopup />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
