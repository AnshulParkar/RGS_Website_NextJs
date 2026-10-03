import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { StatsSection } from "@/components/stats-section"
import { RoofingSpotlight } from "@/components/roofing-spotlight"
import { FaqSection } from "@/components/faq-section"
import { contentStore } from "@/lib/supabase"
import { homeFaqs } from "@/lib/faqs"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    contentStore.services(),
    contentStore.projects(),
    contentStore.testimonials(),
  ])

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StatsSection />
      <ServicesSection services={services} />
      <RoofingSpotlight services={services} />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={homeFaqs} intro="Quick answers about our glazing, facade, cladding and roofing work." />
      <CTASection />
    </div>
  )
}
