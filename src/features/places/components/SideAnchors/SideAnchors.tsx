import type { Place } from '../../types'
import './_SideAnchors.scss'

export default function SideAnchors({ items }: { items: Place[] }) {
  return (
    <aside className='side-anchors'>
      {items.map(p => (
        <a key={p.id} href={`#${p.slug}`}>
          {p.name}
        </a>
      ))}
    </aside>
  )
}
