import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap | RoopGlass",
  description: "Sitemap of RoopGlass website pages.",
}

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
]

export default function SitemapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Sitemap</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">Browse all important pages on the RoopGlass website.</p>

      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
