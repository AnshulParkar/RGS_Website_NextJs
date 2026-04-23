import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | RoopGlass",
  description: "Privacy policy for RoopGlass website and customer inquiries.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">Last updated: April 23, 2026</p>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Information We Collect</h2>
          <p>
            We collect information you submit through our contact and quote forms, such as your name, email,
            phone number, project details, and messages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How We Use Information</h2>
          <p>
            Your information is used to respond to inquiries, provide quotes, deliver service updates, and improve our
            customer support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data only with trusted service providers when
            required to operate our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Data Security</h2>
          <p>
            We use reasonable technical and organizational safeguards to protect your data from unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Contact</h2>
          <p>
            For privacy-related questions, contact us at roopglass@gmail.com or call +91 9320008279.
          </p>
        </section>
      </div>
    </div>
  )
}
