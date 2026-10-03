// Single source of truth for business facts used in UI, metadata, JSON-LD and llms.txt.
// Only owner-stated or publicly listed facts belong here. Keep NAP identical everywhere.

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.split("||")[0].trim() || "https://www.roopglass.com").replace(/\/$/, "")

export const company = {
  name: "Roop Glass Solutions",
  alternateNames: ["Roop Glass Solution", "RGS"],
  legalName: "Roop Glass Solution",
  proprietor: "Shridhar Parkar",
  tagline: "Architectural glazing, facade, cladding and roofing contractor in Mumbai",
  description:
    "Roop Glass Solutions is a Mumbai-based architectural glazing, facade engineering, cladding and roofing contractor led by proprietor Shridhar Parkar. With 20+ years of work across Maharashtra and 100+ corporate, public sector and institutional clients, RGS designs, fabricates and installs structural glazing, curtain walls, ACP and dry stone cladding, glass railings, partitions, glass flooring and roofing systems such as polycarbonate domes and metal roofing sheets.",
  yearsExperience: "20+",
  clientsServed: "100+",
  phone: "+91 93200 08279",
  phoneE164: "+919320008279",
  whatsapp: "919320008279",
  email: "info.roopglass@gmail.com",
  address: {
    street: "Borivali East",
    locality: "Mumbai",
    region: "Maharashtra",
    // Add the owner-confirmed PIN code here once available; it is omitted rather than guessed.
    postalCode: "" as string,
    country: "IN",
  },
  hoursText: "Open 24 hours, all 7 days",
  // schema.org convention for round-the-clock opening: 00:00–23:59 on every day.
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
  areaServed: ["Mumbai", "Navi Mumbai", "Thane", "Pune", "Maharashtra"],
  logo: "/logo.png",
}

export const fullAddress = [company.address.street, [company.address.locality, company.address.postalCode].filter(Boolean).join(" "), company.address.region].join(", ")

/** Verified third-party profiles (citations / backlinks). Rendered in footer + About and used as schema.org sameAs. */
export const profiles = [
  { name: "YouTube", label: "Project videos on YouTube", url: "https://www.youtube.com/@RoopGlassSolution" },
  { name: "IndiaMART", label: "IndiaMART supplier profile", url: "https://www.indiamart.com/roopglasssolution/" },
  { name: "Justdial", label: "Justdial business listing", url: "https://www.justdial.com/Mumbai/Roop-Glass-Solutions-Borivali-East/022PXX22-XX22-190223124053-W4I8_BZDET" },
  { name: "TradeIndia", label: "TradeIndia company profile", url: "https://www.tradeindia.com/roop-glass-solution-5035624/" },
] as const

/** Owner-listed headline projects (shown on About and in llms.txt). */
export const notableProjects = [
  { name: "Association for Research in Homoeopathy (ARH)", location: "Airoli, Navi Mumbai", scope: "Glass facade and skylight dome work", slug: "association-for-research-in-homoeopathy-airoli" },
  { name: "Global Vipassana Pagoda", location: "Gorai, Mumbai", scope: "Architectural structural and glazing elements", slug: "global-vipassana-pagoda-gorai" },
  { name: "NMMC buildings", location: "Vashi and Airoli, Navi Mumbai", scope: "Installations at Navi Mumbai Municipal Corporation premises", slug: "nmmc-vashi" },
  { name: "Income Tax Building", location: "Mumbai", scope: "Government institutional contract execution", slug: "income-tax-building" },
  { name: "Amanora Mall", location: "Pune", scope: "Retail facade and commercial glazing", slug: "amanora-mall-pune" },
]

export const capabilities = [
  { category: "Glazing & Facades", items: ["Structural glazing", "Frameless glass systems", "Unitized glazing", "Curtain wall systems"] },
  { category: "Architectural Glass", items: ["Glass flooring", "Glass walkways", "Glass partitions", "Glass boards", "Curved glass panels"] },
  { category: "Cladding", items: ["ACP cladding", "Dry stone cladding", "Custom exterior facades"] },
  { category: "Railings & Frameworks", items: ["MS & SS structural frameworks", "Toughened glass balconies", "Profile balustrades"] },
  { category: "Roofing Systems", items: ["Polycarbonate domes & skylights", "Metal roofing sheets", "Glass roofing & canopies", "Overhead protective frames"] },
  { category: "Aluminium Slimline Systems", items: ["Slimline glass partitions", "Minimal sliding systems", "Slim sliding doors & windows", "Casement windows & doors"] },
]
