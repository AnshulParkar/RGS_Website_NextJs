import type { SlimlineSeries } from "@/lib/slimline"

/** Series card with the catalogue specification table (server component). */
export function SlimlineSeriesCard({ series }: { series: SlimlineSeries }) {
  return (
    <article id={series.code.toLowerCase()} className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 flex flex-col">
      <img src={series.image} alt={`${series.name} aluminium glass ${series.type.toLowerCase()}`} loading="lazy" className="h-56 w-full object-cover" />
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">{series.type}</p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight">{series.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{series.summary}</p>
        <table className="mt-5 w-full text-sm">
          <caption className="sr-only">{series.name} specifications</caption>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {series.specs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row" className="py-2 pr-3 text-left font-normal text-slate-500">{spec.label}</th>
                <td className="py-2 text-right font-semibold text-slate-900 dark:text-white">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          {series.bestFor.map((use) => (
            <span key={use} className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">{use}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
