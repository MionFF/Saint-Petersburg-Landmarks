import type { Place } from '../../types'
import { useTranslation } from 'react-i18next'

type Props = {
  items: Place[]
  onItemClick?: () => void
  className?: string
  activeSlug: string | null
}

export default function SideAnchors({ items, onItemClick, className, activeSlug }: Props) {
  const { t } = useTranslation('places')

  return (
    <aside className={`side-anchors ${className ?? ''}`}>
      {items.map(p => {
        const isActive = activeSlug === p.slug
        const label = p.slug ? t(`places:${p.slug}.name`) : p.name // fallback
        return (
          <a
            key={p.id}
            href={`#${p.slug}`}
            onClick={onItemClick}
            className={isActive ? 'active' : undefined}
          >
            {label}
          </a>
        )
      })}
    </aside>
  )
}
