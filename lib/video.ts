// Helpers for project videos stored as either YouTube links or direct file URLs.

const YT_PATTERNS = [
  /youtu\.be\/([A-Za-z0-9_-]{11})/,
  /youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)([A-Za-z0-9_-]{11})/,
  /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{11})/,
]

export function getYouTubeId(url: string): string | null {
  for (const pattern of YT_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/** Metadata for published RGS YouTube videos (from youtube.com/@RoopGlassSolution) — used for VideoObject rich results. */
export const knownYouTubeVideos: Record<string, { title: string; uploadDate: string; duration: string }> = {
  LDPYjVCv57Y: { title: "Glass Facade & Dome Work of RGS at Association for Research in Homoeopathy, Airoli, Navi Mumbai", uploadDate: "2026-10-02T11:57:17-07:00", duration: "PT39S" },
  "1aEMBbH4LOo": { title: "Glass Facade Work of RGS at Association for Research in Homoeopathy, Airoli, Navi Mumbai", uploadDate: "2026-10-02T11:54:53-07:00", duration: "PT19S" },
}

export const isYouTubeShort = (url: string) => /youtube\.com\/shorts\//.test(url)

export type ProjectVideo =
  | { kind: "youtube"; id: string; url: string; vertical: boolean; watchUrl: string; embedUrl: string; thumbnailUrl: string }
  | { kind: "file"; url: string }

export function toProjectVideo(url: string): ProjectVideo {
  const id = getYouTubeId(url)
  if (!id) return { kind: "file", url }
  return {
    kind: "youtube",
    id,
    url,
    vertical: isYouTubeShort(url),
    watchUrl: isYouTubeShort(url) ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  }
}
