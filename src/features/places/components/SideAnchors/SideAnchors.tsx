import type { Place } from '../../types'
import './_SideAnchors.scss'

type Props = {
  items: Place[]
  onItemClick?: () => void
  className?: string
}

export default function SideAnchors({ items, onItemClick, className }: Props) {
  return (
    <aside className={`side-anchors ${className ?? ''}`}>
      {items.map(p => (
        <a key={p.id} href={`#${p.slug}`} onClick={onItemClick}>
          {p.name}
        </a>
      ))}
    </aside>
  )
}
