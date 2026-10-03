import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CallPopup } from "@/components/call-popup"
import { company, siteUrl } from "@/lib/company"
import { jsonLd, siteGraph } from "@/lib/schema"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

// Google Analytics 4 (restored from the committed layout). Override or disable with NEXT_PUBLIC_GA_ID ("" disables).
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-7CBBF8YY45"

const defaultTitle = "Roop Glass Solutions – Facade, Glazing & Roofing Contractor, Mumbai"
const defaultDescription =
  "Mumbai contractor with 20+ years in Maharashtra: structural glazing, curtain walls, ACP & stone cladding, glass railings, polycarbonate domes and metal roofing."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s | Roop Glass Solutions" },
  description: defaultDescription,
  applicationName: company.name,
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  publisher: company.name,
  keywords: [
    "glass facade contractor Mumbai",
    "structural glazing Mumbai",
    "curtain wall contractor",
    "ACP cladding Mumbai",
    "dry stone cladding",
    "glass railing contractor",
    "polycarbonate dome",
    "skylight dome contractor",
    "metal roofing sheets Mumbai",
    "roofing contractor Navi Mumbai",
    "Roop Glass Solutions",
  ],
  alternates: { canonical: "/" },
  category: "Construction",
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg", width: 832, height: 464, alt: "Glass entrance facade by Roop Glass Solutions at ARH, Airoli" }],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription, images: ["/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg"] },
  verification: {
    // Set these env vars after verifying the domain in Google Search Console / Bing Webmaster Tools.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteGraph())} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-slate-50 light-canvas dark:bg-slate-950">
            <CallPopup />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
