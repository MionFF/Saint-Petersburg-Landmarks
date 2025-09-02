import { useEffect, useState } from 'react'

export function useActiveSlug(
  ids: string[],
  rootMargin = '0px 0px -50% 0px',
  threshold = 0.5,
  enable = true,
) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enable) return
    if (!ids.length) return

    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const io = new IntersectionObserver(
      entries => {
        // Секции, вошедшие во вьюпорт, сортируем по top
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActive(visible[0].target.id)
          return
        }

        // Если ничего не пересеклось, держим ближайшую выше середины
        const above = elements
          .map(el => ({ el, top: el.getBoundingClientRect().top }))
          .filter(x => x.top < window.innerHeight * 0.4)
          .sort((a, b) => b.top - a.top)

        if (above[0]?.el.id) {
          setActive(above[0].el.id)
        }
      },
      { root: null, rootMargin, threshold },
    )

    elements.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ids, rootMargin, threshold])

  useEffect(() => {
    if (!enable && active !== null) {
      setActive(null)
    }
  }, [enable])

  return active
}
