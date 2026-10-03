import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { Service } from "@/lib/content"

const fallbackItems = [
  { name: "Polycarbonate Domes & Skylights", slug: "polycarbonate-domes-skylights" },
  { name: "Metal Roofing Sheets", slug: "metal-roofing-sheets" },
  { name: "Glass Roofing & Canopies", slug: "glass-roofing-canopies" },
  { name: "MS & SS Framework", slug: "ms-ss-framework" },
]

/** Homepage section that puts roofing on equal footing with facade work. */
export function RoofingSpotlight({ services }: { services?: Service[] }) {
  const roofing = services?.filter((service) => service.categorySlug === "roofing-frameworks") ?? []
  const items = roofing.length > 0 ? roofing.map((service) => ({ name: service.name, slug: service.slug })) : fallbackItems

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 text-white" aria-labelledby="roofing-heading">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 gap-4">
          <img src="/assets/projects/arh-airoli/arh-skylight-dome.jpg" alt="Skylight dome installed by Roop Glass Solutions at ARH, Airoli" loading="lazy" className="col-span-2 h-64 w-full rounded-2xl object-cover" />
          <img src="/assets/Metal_Roofing.png" alt="Metal roofing sheets on a steel framework" loading="lazy" className="h-40 w-full rounded-2xl object-cover" />
          <img src="/assets/Polycarbonate_Roofing.png" alt="Polycarbonate roofing canopy" loading="lazy" className="h-40 w-full rounded-2xl object-cover" />
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">Roofing systems</span>
          <h2 id="roofing-heading" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Domes, skylights &amp; roofing — built with the frame
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Alongside facades, Roop Glass Solutions designs, fabricates and installs roofing systems — from the skylight dome at the ARH hospital in Airoli to metal roofing and glass canopies — together with the MS/SS frameworks that support them.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <li key={item.slug}>
                <Link href={`/catalog/${item.slug}`} className="flex items-center gap-2.5 text-white/85 hover:text-amber-300">
                  <Check className="h-4 w-4 shrink-0 text-amber-400" /> {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/roofing" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 font-semibold text-slate-950 hover:shadow-xl hover:shadow-orange-500/20 transition-shadow">
            Explore roofing work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
