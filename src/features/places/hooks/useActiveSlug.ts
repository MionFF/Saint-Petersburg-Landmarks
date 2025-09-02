import { useEffect, useState } from 'react'

export function useActiveSlug(
  ids: string[],
  rootMargin = '0px 0px -50% 0px',
  threshold: number | number[] = 0.5,
  enable = true,
) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enable || !ids.length) return

    let io: IntersectionObserver | null = null
    let mo: MutationObserver | null = null
    let raf = 0

    const init = () => {
      const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
      if (!elements.length) return false

      io = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top) // массив записей [2]

          const firstEntry = visible as IntersectionObserverEntry | undefined // берём первый элемент [2]
          if (firstEntry) {
            const idVisible = (firstEntry.target as HTMLElement).id // target у записи, не у массива [1]
            if (idVisible) setActive(idVisible)
            return
          }

          const above = elements
            .map(el => ({ el, top: el.getBoundingClientRect().top }))
            .filter(x => x.top < window.innerHeight * 0.4)
            .sort((a, b) => b.top - a.top) // массив объектов { el, top } [2]

          const idAbove = above?.el.id // поле el у первого элемента массива [2]
          if (idAbove) setActive(idAbove)
        },
        { root: null, rootMargin, threshold },
      )

      elements.forEach(el => io!.observe(el))
      return true
    }

    if (!init()) {
      raf = requestAnimationFrame(() => {
        if (!init()) {
          mo = new MutationObserver(() => {
            if (init()) mo?.disconnect()
          })
          mo.observe(document.body, { childList: true, subtree: true })
        }
      })
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
      mo?.disconnect()
    }
  }, [ids, rootMargin, threshold, enable])

  useEffect(() => {
    if (!enable && active !== null) setActive(null)
  }, [enable])

  return active
}
