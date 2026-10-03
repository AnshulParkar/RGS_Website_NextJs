import { company } from "@/lib/company"

// Answer-first FAQ copy. Used in the visible FAQ section and FAQPage JSON-LD (must stay identical).
export const homeFaqs = [
  {
    q: "What does Roop Glass Solutions do?",
    a: `${company.name} is an architectural glazing, facade engineering, cladding and roofing contractor based in Mumbai. We handle design, fabrication and installation of structural glazing, curtain walls, unitized glazing, ACP and dry stone cladding, glass railings and partitions, glass flooring and roofing systems for commercial, public sector and institutional buildings.`,
  },
  {
    q: "Does Roop Glass Solutions do roofing work?",
    a: "Yes. Our roofing work includes polycarbonate domes and skylights, metal roofing sheets, glass roofing and entrance canopies, and the MS/SS frameworks and overhead protective frames that support them. For example, we executed the glass facade and skylight dome at the Association for Research in Homoeopathy (ARH) in Airoli, Navi Mumbai.",
  },
  {
    q: "Which areas do you serve?",
    a: "We work across Mumbai, Navi Mumbai, Thane, Pune and the rest of Maharashtra. Completed projects include sites in Gorai, Bandra, Malad, Vikhroli, Vashi, Airoli, Kharghar, Thane, Vasai-Virar and Pune.",
  },
  {
    q: "How experienced is Roop Glass Solutions?",
    a: `The firm has ${company.yearsExperience} years of operational history in Maharashtra under proprietor ${company.proprietor}, and has completed installations for ${company.clientsServed} corporate, public sector and institutional clients, including the Global Vipassana Pagoda, NMMC buildings in Vashi and Airoli, the Income Tax Building in Mumbai and Amanora Mall in Pune.`,
  },
  {
    q: "What is the difference between structural glazing and a curtain wall?",
    a: "Structural glazing bonds glass to the supporting frame with structural silicone so the exterior shows an almost frameless glass surface. A curtain wall is the complete non-load-bearing facade system — frames, glass and anchors — hung from the building structure. Structural glazing is one way of glazing a curtain wall; stick and unitized systems are others.",
  },
  {
    q: "How do I start a project with Roop Glass Solutions?",
    a: `Send your requirement through the Contact page or call ${company.phone}. Share the site location, the type of work (glazing, facade, cladding, railing or roofing), approximate area or drawings if available, and your timeline, and our team will review the scope with you.`,
  },
  {
    q: "What are your working hours?",
    a: `Our office is open ${company.hoursText}.`,
  },
]
