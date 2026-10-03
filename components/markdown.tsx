import Link from "next/link"
import type { ReactNode } from "react"

// Minimal, dependency-free Markdown renderer for Insights articles (server component).
// Supports: ## / ### headings, paragraphs, - and 1. lists, | tables |, **bold**, *italic*, `code`, [links](url).
// Plain-text posts (no Markdown) render as paragraphs, so older posts keep working.

export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function extractHeadings(markdown: string) {
  return markdown.split("\n").filter((line) => /^##\s/.test(line)).map((line) => {
    const text = line.replace(/^##\s+/, "").trim()
    return { id: slugify(text), text }
  })
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = re.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyBase}-${i++}`
    if (token.startsWith("**")) out.push(<strong key={key} className="font-semibold text-slate-900 dark:text-white">{token.slice(2, -2)}</strong>)
    else if (token.startsWith("`")) out.push(<code key={key} className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">{token.slice(1, -1)}</code>)
    else if (token.startsWith("[")) {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/) || []
      out.push(href?.startsWith("/")
        ? <Link key={key} href={href} className="font-medium text-blue-600 underline-offset-2 hover:underline">{label}</Link>
        : <a key={key} href={href} target="_blank" rel="noopener" className="font-medium text-blue-600 underline-offset-2 hover:underline">{label}</a>)
    } else out.push(<em key={key}>{token.slice(1, -1)}</em>)
    last = match.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const cells = (row: string) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim())

export function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const blocks: ReactNode[] = []
  let i = 0
  let k = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    const key = `b${k++}`
    if (/^###\s/.test(line)) {
      const text = line.replace(/^###\s+/, "")
      blocks.push(<h3 key={key} id={slugify(text)} className="mt-8 scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white">{inline(text, key)}</h3>)
      i++
    } else if (/^##\s/.test(line)) {
      const text = line.replace(/^##\s+/, "")
      blocks.push(<h2 key={key} id={slugify(text)} className="mt-12 scroll-mt-24 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{inline(text, key)}</h2>)
      i++
    } else if (/^\|/.test(line)) {
      const rows: string[] = []
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++])
      const [head, , ...body] = rows
      blocks.push(
        <div key={key} className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-left">
              <tr>{cells(head).map((cell, c) => <th key={c} scope="col" className="p-3 font-semibold">{inline(cell, `${key}h${c}`)}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {body.map((row, r) => <tr key={r}>{cells(row).map((cell, c) => c === 0
                ? <th key={c} scope="row" className="p-3 text-left font-semibold">{inline(cell, `${key}${r}${c}`)}</th>
                : <td key={c} className="p-3 text-slate-600 dark:text-slate-300">{inline(cell, `${key}${r}${c}`)}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      )
    } else if (/^\s*[-*]\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ""))
      blocks.push(<ul key={key} className="my-5 list-disc space-y-2 pl-6 marker:text-blue-500">{items.map((item, n) => <li key={n}>{inline(item, `${key}${n}`)}</li>)}</ul>)
    } else if (/^\s*\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s+/, ""))
      blocks.push(<ol key={key} className="my-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-blue-600">{items.map((item, n) => <li key={n}>{inline(item, `${key}${n}`)}</li>)}</ol>)
    } else {
      const para: string[] = []
      while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\||\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])) para.push(lines[i++].trim())
      blocks.push(<p key={key} className="my-5">{inline(para.join(" "), key)}</p>)
    }
  }
  return <div className="text-lg leading-8 text-slate-700 dark:text-slate-300">{blocks}</div>
}
