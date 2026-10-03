import { capabilities, company, profiles, siteUrl } from "@/lib/company"

export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`)

export const orgId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`

/** Site-wide graph: business entity (local business + roofing/general contractor) and website. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor", "RoofingContractor"],
        "@id": orgId,
        name: company.name,
        alternateName: company.alternateNames,
        legalName: company.legalName,
        description: company.description,
        slogan: company.tagline,
        url: siteUrl,
        logo: abs(company.logo),
        image: [abs("/assets/hero/hero-glass-facade.webp"), abs("/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg")],
        telephone: company.phoneE164,
        email: company.email,
        founder: { "@type": "Person", name: company.proprietor, jobTitle: "Proprietor" },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.locality,
          addressRegion: company.address.region,
          ...(company.address.postalCode ? { postalCode: company.address.postalCode } : {}),
          addressCountry: company.address.country,
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: company.hours.days, opens: company.hours.opens, closes: company.hours.closes },
        ],
        areaServed: company.areaServed.map((name) => ({ "@type": name === "Maharashtra" ? "State" : "City", name })),
        knowsAbout: capabilities.flatMap((group) => group.items),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Glazing, facade, cladding and roofing services",
          itemListElement: capabilities.map((group) => ({
            "@type": "OfferCatalog",
            name: group.category,
            itemListElement: group.items.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item } })),
          })),
        },
        sameAs: profiles.map((profile) => profile.url),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: company.name,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  }
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: abs(item.path) })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  }
}

/** Escape "<" so JSON-LD can never close the surrounding script tag. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") })
