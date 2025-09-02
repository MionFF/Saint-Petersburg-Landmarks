import { useEffect } from 'react'
import type { Place } from '../../types'
import './_SideAnchors.scss'

type Props = {
  items: Place[]
  onItemClick?: () => void
  className?: string
  activeSlug: string | null
  onReady?: () => void // новый опциональный колбэк
}

export default function SideAnchors({ items, onItemClick, className, activeSlug, onReady }: Props) {
  useEffect(() => {
    // сообщаем, что список ссылок смонтирован/обновлён
    onReady?.()
  }, [items, onReady])

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
