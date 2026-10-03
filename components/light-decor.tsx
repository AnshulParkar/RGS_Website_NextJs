import { cn } from "@/lib/utils"

type LightDecorProps = {
  /** Blueprint grid faded towards the edges */
  grid?: boolean
  /** Slowly drifting coloured light */
  orbs?: boolean
  /** Floating glass panes with a travelling glint (hidden on small screens) */
  shards?: boolean
  /** A soft light beam sweeping across, like a reflection on a facade */
  beam?: boolean
  className?: string
}

/**
 * Decorative background layer for light mode only (hidden in dark mode).
 * Place inside a `relative overflow-hidden` section, before the content wrapper (which should be `relative z-10`).
 */
export function LightDecor({ grid = true, orbs = true, shards = false, beam = false, className }: LightDecorProps) {
  return (
    <div aria-hidden="true" className={cn("light-decor pointer-events-none absolute inset-0 overflow-hidden dark:hidden", className)}>
      {grid && <div className="light-decor-grid" />}
      {orbs && (
        <>
          <span className="light-orb light-orb-a" />
          <span className="light-orb light-orb-b" />
          <span className="light-orb light-orb-c" />
        </>
      )}
      {beam && <span className="light-decor-beam" />}
      {shards && (
        <>
          <span className="glass-shard glass-shard-1" />
          <span className="glass-shard glass-shard-2" />
          <span className="glass-shard glass-shard-3" />
          <span className="glass-shard glass-shard-4" />
        </>
      )}
    </div>
  )
}
