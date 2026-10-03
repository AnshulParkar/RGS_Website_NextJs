"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  id: string
  title: string
  poster?: string
  vertical?: boolean
  className?: string
}

/**
 * Lightweight YouTube player: renders a poster + play button and only loads the
 * YouTube iframe after a click, keeping third-party JS off the initial page load.
 */
export function YouTubeEmbed({ id, title, poster, vertical = false, className }: Props) {
  const [active, setActive] = useState(false)
  const thumb = poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black",
        vertical ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video",
        className
      )}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img src={thumb} alt={title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" />
          </span>
          <span className="absolute bottom-3 left-4 right-4 text-left text-sm font-semibold text-white drop-shadow">{title}</span>
        </button>
      )}
    </div>
  )
}
