import { ChevronDown } from "lucide-react"
import { faqSchema, jsonLd } from "@/lib/schema"
import { LightDecor } from "@/components/light-decor"

type Faq = { q: string; a: string }

/** Server-rendered accordion: answers stay in the HTML so search engines and AI crawlers can read them. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="light-gradient-border mt-8 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
      {faqs.map((faq, index) => (
        <details key={faq.q} className="group p-6" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg">{faq.q}</h3>
            <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{faq.a}</p>
        </details>
      ))}
    </div>
  )
}

export function FaqSection({ faqs, title = "Frequently asked questions", intro }: { faqs: Faq[]; title?: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/60 to-sky-50/60 dark:bg-none dark:bg-slate-950" aria-labelledby="faq-heading">
      <LightDecor orbs={false} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">FAQ</span>
          <h2 id="faq-heading" className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          {intro && <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">{intro}</p>}
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  )
}
