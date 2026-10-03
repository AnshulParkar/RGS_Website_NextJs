// Aluminium glass slimline systems — specifications from the RGS aluminium catalogue (A-series).
// Values are the catalogue's published limits; every project is still checked for wind load, size and use.

export type SlimlineSeries = {
  code: string
  name: string
  family: "minimal-sliding" | "slim-sliding" | "casement"
  type: string
  summary: string
  image: string
  bestFor: string[]
  specs: { label: string; value: string }[]
}

export const SLIMLINE_CATEGORY = "aluminium-glass-slimline-partitions"

export const slimlineSeries: SlimlineSeries[] = [
  {
    code: "A38", name: "A38 Slimline", family: "minimal-sliding", type: "Floor-to-ceiling sliding system",
    summary: "Minimal frames and sashes that turn a full-height opening into an uninterrupted panoramic view. Double glazing is standard and the high-performance aluminium handles heavy wind loads.",
    image: "/assets/slimline/slimline-a38-panoramic.webp",
    bestFor: ["Floor-to-ceiling living areas", "High-rise apartments", "Panoramic views"],
    specs: [
      { label: "Glass thickness", value: "38 mm (double glazed)" },
      { label: "Max shutter height", value: "4,000 mm" },
      { label: "Max area per sash", value: "6 m²" },
      { label: "Max shutter weight", value: "500 kg" },
      { label: "Sightline at interlock", value: "20 mm" },
      { label: "Frame width (2T / 3T)", value: "125 / 191 mm" },
      { label: "Multi-point locking", value: "Yes" },
      { label: "Thermal insulation", value: "Yes" },
    ],
  },
  {
    code: "A28S", name: "A28S Slimline", family: "minimal-sliding", type: "Concealed-frame sliding system",
    summary: "The entire surrounding frame can be hidden within marble, granite, wood or wall panelling, leaving only slim glass panels visible on all four sides.",
    image: "/assets/slimline/slimline-a28s-concealed-frame.webp",
    bestFor: ["Luxury residences", "Feature openings", "Seamless indoor–outdoor transitions"],
    specs: [
      { label: "Glass thickness", value: "8 / 13.5 / 18 / 28 mm" },
      { label: "Max shutter height", value: "3,400 mm" },
      { label: "Max area per sash", value: "6 m²" },
      { label: "Max shutter weight", value: "350 / 500 kg" },
      { label: "Sightline at interlock", value: "18 mm" },
      { label: "Hidden bottom track", value: "Possible" },
      { label: "Corner opening", value: "Possible" },
    ],
  },
  {
    code: "A28C", name: "A28C Slimline", family: "minimal-sliding", type: "Hidden-track sliding system",
    summary: "A fully hidden track creates a seamless connection between indoors and outdoors, with high-performance rollers for effortless sliding and corner openings without a post.",
    image: "/assets/slimline/slimline-a28c-corner-opening.webp",
    bestFor: ["Corner glazing", "Balconies and terraces", "Penthouses"],
    specs: [
      { label: "Glass thickness", value: "8 / 13.5 / 18 / 28 mm" },
      { label: "Max shutter height", value: "3,400 mm" },
      { label: "Max area per sash", value: "6 m²" },
      { label: "Max shutter weight", value: "350 / 500 kg" },
      { label: "Sightline at interlock", value: "18 mm" },
      { label: "Hidden bottom track", value: "Possible" },
      { label: "Corner opening", value: "Possible" },
    ],
  },
  {
    code: "A28", name: "A28 Slimline", family: "minimal-sliding", type: "Minimal sliding windows & doors",
    summary: "Built for builders, developers and architects who want a minimal system at a controlled budget. Works for both windows and doors, with large panels and smooth premium rollers.",
    image: "/assets/slimline/slimline-a28-floor-to-ceiling.webp",
    bestFor: ["Residential developments", "Office partitions", "Large sliding doors"],
    specs: [
      { label: "Glass thickness", value: "8 / 13.5 / 18 / 28 mm" },
      { label: "Max shutter height", value: "3,400 mm" },
      { label: "Max area per sash", value: "6 m²" },
      { label: "Max shutter weight", value: "350 / 500 kg" },
      { label: "Sightline at interlock", value: "18 mm" },
      { label: "Corner opening", value: "Possible" },
    ],
  },
  {
    code: "A3500", name: "A3500", family: "slim-sliding", type: "Slim sliding doors",
    summary: "Slender interlocking profiles for sliding doors that need elegance and performance together. High wind resistance makes it suitable for high-rise residential buildings.",
    image: "/assets/slimline/slimline-a3500-sliding-door.webp",
    bestFor: ["High-rise residential", "Balcony sliding doors", "Living-room openings"],
    specs: [
      { label: "Glass thickness", value: "6 / 8 / 13.5 / 22 / 24 mm" },
      { label: "Max shutter height", value: "2,800 mm" },
      { label: "Max area per sash", value: "4.5 m²" },
      { label: "Max shutter weight", value: "200 kg" },
      { label: "Sightline at interlock", value: "20 mm" },
      { label: "Corner opening", value: "Possible" },
    ],
  },
  {
    code: "A3000", name: "A3000", family: "slim-sliding", type: "Slim sliding windows",
    summary: "A slimline sliding window with single-point or multipoint flush locking. It can merge with a fixed glass system below that doubles as a railing — saving space and cost on narrow sills.",
    image: "/assets/slimline/slimline-a3000-sliding-window.webp",
    bestFor: ["Apartment windows", "Window-cum-railing elevations", "Corner windows"],
    specs: [
      { label: "Glass thickness", value: "6 / 8 / 11.5 / 22 / 24 mm" },
      { label: "Max shutter height", value: "2,400 mm" },
      { label: "Max area per sash", value: "3.6 m²" },
      { label: "Max shutter weight", value: "150 kg" },
      { label: "Sightline at interlock", value: "20 mm" },
      { label: "Corner opening", value: "Possible" },
    ],
  },
  {
    code: "A2200", name: "A2200 Budget Series", family: "slim-sliding", type: "Budget sliding windows",
    summary: "Designed for developers who want a balance of budget, performance and appearance, with reliable hardware and mosquito-mesh compatibility.",
    image: "/assets/slimline/slimline-a2200-sliding-window.webp",
    bestFor: ["Large housing projects", "Bedroom and kitchen windows", "Cost-controlled builds"],
    specs: [
      { label: "Glass thickness", value: "5 / 6 mm" },
      { label: "Max shutter height", value: "1,800 mm" },
      { label: "Max area per sash", value: "2.2 m²" },
      { label: "Max shutter weight", value: "40 / 60 kg" },
      { label: "Sightline at interlock", value: "25 mm" },
      { label: "Mosquito mesh", value: "Possible" },
    ],
  },
  {
    code: "A60", name: "A60 Invisible", family: "casement", type: "Ultra-slim casement window",
    summary: "An ultra-slim casement with outer and shutter frames concealed in the wall, maximising glass area while a threshold design improves weather resistance.",
    image: "/assets/slimline/slimline-a60-invisible-casement.webp",
    bestFor: ["Minimal facades", "Feature windows", "Outward-opening casements"],
    specs: [
      { label: "Glass thickness", value: "6 / 8 / 8.9 mm" },
      { label: "Max shutter height", value: "2,000 mm" },
      { label: "Max shutter weight", value: "60 kg" },
      { label: "Opening", value: "Outward" },
      { label: "Multi-point locking", value: "Yes" },
    ],
  },
  {
    code: "A4000", name: "A4000", family: "casement", type: "Casement windows",
    summary: "A value casement window for bathrooms, bedrooms, common areas and commercial buildings that need full ventilation, with tilt & turn and inward or outward opening.",
    image: "/assets/slimline/slimline-a4000-casement.webp",
    bestFor: ["Bathrooms and utility areas", "Commercial windows", "Full-ventilation openings"],
    specs: [
      { label: "Glass thickness", value: "6 / 8 / 11.5 / 22 mm" },
      { label: "Max shutter height", value: "2,000 mm" },
      { label: "Max shutter weight", value: "50 kg" },
      { label: "Tilt & turn", value: "Possible" },
      { label: "Opening", value: "Inward / outward / double shutter" },
    ],
  },
  {
    code: "A4000D", name: "A4000D", family: "casement", type: "Casement doors",
    summary: "A classic, slim aluminium door that suits modern and traditional interiors — easy to install, low maintenance and available in many configurations and finishes.",
    image: "/assets/slimline/slimline-a4000d-door.webp",
    bestFor: ["Cabin and office doors", "Balcony doors", "Partition doors"],
    specs: [
      { label: "Glass thickness", value: "6 / 8 / 11.5 / 22 mm" },
      { label: "Max shutter height", value: "2,800 mm" },
      { label: "Max shutter weight", value: "100 kg" },
      { label: "Opening", value: "Inward / outward / double shutter" },
      { label: "Door bottom height", value: "91 mm" },
    ],
  },
]

export const slimlineFamilies = [
  {
    key: "minimal-sliding" as const,
    title: "Minimal slimline sliding & partitions",
    serviceSlug: "slimline-sliding-systems",
    intro: "18–20 mm sightlines, panels up to 4 m high and hidden-track options for floor-to-ceiling glass walls and partitions.",
  },
  {
    key: "slim-sliding" as const,
    title: "Slim sliding doors & windows",
    serviceSlug: "aluminium-sliding-doors-windows",
    intro: "Interlocking slim profiles for balcony doors and apartment windows, from high-rise performance to budget series.",
  },
  {
    key: "casement" as const,
    title: "Casement windows & doors",
    serviceSlug: "aluminium-casement-windows-doors",
    intro: "Concealed-frame casements, tilt & turn windows and slim aluminium doors for cabins, bathrooms and balconies.",
  },
]

/** Service slug → series codes, used to show spec tables on catalog pages. */
export const seriesByService: Record<string, string[]> = {
  "aluminium-glass-slimline-partition": ["A38", "A28", "A28C", "A4000D"],
  "slimline-sliding-systems": ["A38", "A28S", "A28C", "A28"],
  "aluminium-sliding-doors-windows": ["A3500", "A3000", "A2200"],
  "aluminium-casement-windows-doors": ["A60", "A4000", "A4000D"],
}
