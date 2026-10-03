import type { Metadata } from "next"
import { ReviewForm } from "@/components/review-form"
import { Card, CardContent } from "@/components/ui/card"
import { LightDecor } from "@/components/light-decor"

export const metadata: Metadata = {
  title: "Share Your Experience",
  description: "Worked with Roop Glass Solutions? Share a review of our glass facade, cladding, partition, railing or roofing work.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: true },
}

export default function ReviewPage() {
  return <div className="min-h-screen pt-16">
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LightDecor shards beam />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Share Your Experience</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Worked with Roop Glass Solutions? Tell us how it went. Your feedback helps other clients and helps us improve.</p>
      </div>
    </section>
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="light-gradient-border bg-white/70 dark:bg-slate-900/70"><CardContent className="p-6 md:p-8"><ReviewForm /></CardContent></Card>
      </div>
    </section>
  </div>
}
