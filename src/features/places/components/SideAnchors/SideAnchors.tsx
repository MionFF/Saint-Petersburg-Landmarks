import type { Place } from '../../types'
import './_SideAnchors.scss'

type Props = {
  items: Place[]
  onItemClick?: () => void
  className?: string
  activeSlug: string | null
}

export default function SideAnchors({ items, onItemClick, className, activeSlug }: Props) {
  return (
    <aside className={`side-anchors ${className ?? ''}`}>
      {items.map(p => {
        const isActive = activeSlug === p.slug
        return (
          <a
            key={p.id}
            href={`#${p.slug}`}
            onClick={onItemClick}
            className={isActive ? 'active' : undefined}
          >
            {p.name}
          </a>
        )
      })}
    </aside>
  )
}
