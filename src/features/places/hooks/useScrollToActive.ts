import { useEffect } from 'react'

function centerChild(container: HTMLElement, target: HTMLElement) {
  const c = container.getBoundingClientRect()
  const t = target.getBoundingClientRect()
  const delta = t.top - c.top - (container.clientHeight - target.clientHeight) / 2
  container.scrollTop += delta
}

function scrollByIndex(container: HTMLElement, index: number) {
  const items = Array.from(container.querySelectorAll<HTMLElement>('.side-anchors a'))
  if (!items.length || index < 0 || index >= items.length) return
  centerChild(container, items[index])
}

export function useScrollToActive(
  open: boolean,
  activeSlug: string | null,
  getContainer: () => HTMLElement | null,
  getSlugs?: () => string[] | null,
) {
  useEffect(() => {
    if (!open || !activeSlug) return

    let cancelled = false
    let tId: number | null = null

    const tryScroll = (attempt = 0) => {
      if (cancelled) return
      const container = getContainer()
      if (!container) return

      // контейнер обязан быть скроллируемым
      const { overflowY } = getComputedStyle(container)
      if (
        !(
          (overflowY === 'auto' || overflowY === 'scroll') &&
          container.scrollHeight > container.clientHeight
        )
      ) {
        return
      }

      // сначала пытаемся по ссылке
      const link = container.querySelector<HTMLAnchorElement>(`a[href="#${activeSlug}"]`)
      if (link) {
        centerChild(container, link)
        return
      }

      // fallback: по индексу в списке слугов
      const slugs = getSlugs?.() ?? null
      if (slugs && slugs.length) {
        const index = slugs.indexOf(activeSlug)
        if (index !== -1) {
          scrollByIndex(container, index)
          return
        }
      }

      // контент ещё рендерится — повторим
      if (attempt < 10) {
        requestAnimationFrame(() => tryScroll(attempt + 1))
      } else {
        tId = window.setTimeout(() => tryScroll(attempt + 1), 50)
      }
    }

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => tryScroll(0))
      void raf2
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      if (tId !== null) clearTimeout(tId)
    }
  }, [open, activeSlug, getContainer, getSlugs])
}
