import Link from "next/link"
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { company, fullAddress, profiles } from "@/lib/company"

const serviceLinks = [
  { href: "/catalog/structural-glazing", label: "Structural glazing" },
  { href: "/catalog/curtain-wall-system", label: "Curtain wall systems" },
  { href: "/catalog/acp-aluminium-cladding", label: "ACP & aluminium cladding" },
  { href: "/catalog/glass-railing", label: "Glass railings" },
  { href: "/roofing", label: "Roofing systems" },
  { href: "/catalog/polycarbonate-domes-skylights", label: "Polycarbonate domes & skylights" },
  { href: "/slimline-partitions", label: "Slimline glass partitions" },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <img src="/favicon.png" alt="Roop Glass Solutions logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight">{company.name}</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            Architectural glazing, facade, cladding and roofing contractor in Mumbai — {company.yearsExperience} years across Maharashtra, {company.clientsServed} corporate, public sector and institutional clients. Proprietor: {company.proprietor}.
          </p>
          <h2 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">Find us on</h2>
          <ul className="flex flex-wrap gap-2">
            {profiles.map((profile) => (
              <li key={profile.name}>
                <a href={profile.url} target="_blank" rel="noopener" title={profile.label} className="inline-flex items-center gap-1 rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-300 hover:border-blue-500 hover:text-white transition-colors">
                  {profile.name} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Services</h2>
          <ul className="grid gap-2.5">
            {serviceLinks.map((link) => (
              <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Navigation */}
        <nav aria-label="Company">
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Company</h2>
          <ul className="grid gap-2.5">
            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About us</Link></li>
            <li><Link href="/catalog" className="text-slate-400 hover:text-white transition-colors">Services catalog</Link></li>
            <li><Link href="/projects" className="text-slate-400 hover:text-white transition-colors">Completed projects</Link></li>
            <li><Link href="/projects/association-for-research-in-homoeopathy-airoli" className="text-slate-400 hover:text-white transition-colors">ARH Airoli project</Link></li>
            <li><Link href="/insights" className="text-slate-400 hover:text-white transition-colors">Insights</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact us</Link></li>
          </ul>
        </nav>

        {/* Contact info (NAP — keep identical to listings) */}
        <address className="not-italic space-y-3.5">
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Contact</h2>
          <div className="flex gap-3 text-slate-400">
            <Phone className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <a href={`tel:${company.phoneE164}`} className="hover:text-white transition-colors">{company.phone}</a>
          </div>
          <div className="flex gap-3 text-slate-400">
            <Mail className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <a href={`mailto:${company.email}`} className="hover:text-white transition-colors break-all">{company.email}</a>
          </div>
          <div className="flex gap-3 text-slate-400">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <p>{fullAddress}</p>
          </div>
          <div className="flex gap-3 text-slate-400">
            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
            <p>{company.hoursText}</p>
          </div>
        </address>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 border-t border-slate-800 flex flex-wrap gap-4 justify-between text-sm text-slate-500">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
          <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}
