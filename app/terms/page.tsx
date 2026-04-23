import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | RoopGlass",
  description: "Terms and conditions for using RoopGlass services and website.",
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Terms and Conditions</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">Last updated: April 23, 2026</p>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Use of Website</h2>
          <p>
            By using this website, you agree to use it lawfully and not to interfere with its operation or security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Quotes and Services</h2>
          <p>
            All quotations are estimates and may vary based on site conditions, material availability, and final scope
            of work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Intellectual Property</h2>
          <p>
            Website content, branding, and visuals are the property of RoopGlass unless stated otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Limitation of Liability</h2>
          <p>
            RoopGlass is not liable for indirect or consequential damages arising from use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Contact</h2>
          <p>
            For questions about these terms, email roopglass@gmail.com or call +91 9320008279.
          </p>
        </section>
      </div>
    </div>
  )
}
