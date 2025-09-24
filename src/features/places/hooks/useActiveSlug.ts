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
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

          // ✅ Исправлено: берем первый элемент массива
          const first = visible[0]
          if (first) {
            const id = (first.target as HTMLElement).id
            if (id) setActive(id)
            return
          }

          const above = elements
            .map(el => ({ el, top: el.getBoundingClientRect().top }))
            .filter(x => x.top < window.innerHeight * 0.4)
            .sort((a, b) => b.top - a.top)

          // ✅ Исправлено: берем первый элемент массива
          const idAbove = above[0]?.el.id
          if (idAbove) setActive(idAbove)
        },
        { root: null, rootMargin, threshold },
      )

      elements.forEach(el => io!.observe(el))
      return true
    }

    // ✅ Улучшенная логика с задержками
    let retryCount = 0
    const maxRetries = 5

    const tryInit = () => {
      if (init()) return

      retryCount++
      if (retryCount >= maxRetries) return

      // Увеличиваем задержку с каждой попыткой
      const delay = retryCount * 100

      raf = requestAnimationFrame(() => {
        setTimeout(() => {
          if (init()) return

          // В крайнем случае используем MutationObserver
          mo = new MutationObserver(() => {
            if (init()) mo?.disconnect()
          })
          mo.observe(document.body, { childList: true, subtree: true })
        }, delay)
      })
    }

    tryInit()

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
