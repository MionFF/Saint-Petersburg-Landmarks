import type React from 'react'
import { useRef, useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
  side?: 'bottom' | 'right'
  title?: string
  activeSlug: string | null
}

export default function AnchorsDrawer({
  children,
  open,
  onClose,
  side = 'bottom',
  title,
  activeSlug,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [anchorsReady, setAnchorsReady] = useState(false)

  // сбрасываем флаг при каждом открытии, чтобы ждать актуальной отрисовки
  useEffect(() => {
    if (open) setAnchorsReady(false)
  }, [open])

  // Управляем монтированием для анимации выхода
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (!open) return
    setAnchorsReady(false)
    const root = contentRef.current
    if (!root) return

    const hasAnchors = () => !!root.querySelector('.side-anchors a')

    if (hasAnchors()) {
      setAnchorsReady(true)
      return
    }

    const mo = new MutationObserver(() => {
      if (hasAnchors()) {
        setAnchorsReady(true)
        mo.disconnect()
      }
    })
    mo.observe(root, { childList: true, subtree: true })

    const raf = requestAnimationFrame(() => {
      if (hasAnchors()) setAnchorsReady(true)
    })

    return () => {
      mo.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [open])

  // Получение activeSlug с помощью useActiveSlug() и getPlaces()
  // const places = getPlaces()

  // const ids = useMemo(
  //   () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
  //   [places],
  // )
  // const activeSlug = useActiveSlug(ids, '0px 0px -50% 0px', 0.5)

  // const slugs = useMemo(
  //   () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
  //   [places],
  // )

  // useScrollToActive(
  //   open,
  //   activeSlug,
  //   () => contentRef.current,
  //   () => slugs,
  // )

  // Синхронизация монтирования с open
  useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      // даём анимации закрытия проиграться, затем размонт
      const t = setTimeout(() => setMounted(false), 200)
      return () => clearTimeout(t)
    }
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Scroll lock — только когда смонтировано и открыто
  // вызываем автопрокрутку только после сигнала готовности и при наличии activeSlug
  // useEffect(() => {
  //   if (!open || !anchorsReady || !activeSlug) return
  //   const container = contentRef.current
  //   if (!container) return

  // два rAF — дождаться layout и реальных размеров
  //   const r1 = requestAnimationFrame(() => {
  //     const r2 = requestAnimationFrame(() => {
  //       const link =
  //         container.querySelector<HTMLAnchorElement>(`a[href="#${activeSlug}"]`) ||
  //         // подстраховка: если href абсолютный — ищем концовку
  //         Array.from(container.querySelectorAll<HTMLAnchorElement>('.side-anchors a')).find(a =>
  //           a.getAttribute('href')?.endsWith(`#${activeSlug}`),
  //         ) ||
  //         null

  //       if (link) {
  //         const c = container.getBoundingClientRect()
  //         const t = link.getBoundingClientRect()
  //         const delta = t.top - c.top - (container.clientHeight - link.clientHeight) / 2
  //         container.scrollTop += delta // мгновенно, без глобального smooth
  //       }
  //     })
  //     // отписка r2 не обязательна
  //     void r2
  //   })
  //   return () => cancelAnimationFrame(r1)
  // }, [open, anchorsReady, activeSlug])

  useEffect(() => {
    if (!open || !anchorsReady || !activeSlug) return
    const container = contentRef.current
    if (!container) return

    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        const direct = container.querySelector<HTMLAnchorElement>(`a[href="#${activeSlug}"]`)
        const fallback = Array.from(
          container.querySelectorAll<HTMLAnchorElement>('.side-anchors a'),
        ).find(a => a.getAttribute('href')?.endsWith(`#${activeSlug}`))
        const link = direct ?? fallback ?? null
        if (!link) return

        const c = container.getBoundingClientRect()
        const t = link.getBoundingClientRect()
        const delta = t.top - c.top - (container.clientHeight - link.clientHeight) / 2
        container.scrollTop += delta
      })
      void r2
    })
    return () => cancelAnimationFrame(r1)
  }, [open, anchorsReady, activeSlug])

  // Фокус внутрь на открытие
  useEffect(() => {
    if (!open || !mounted) return
    const el = panelRef.current
    if (!el) return
    const focusable = el.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()
  }, [open, mounted])

  // Свайпы на заголовке, чтобы не мешать скроллу контента
  useEffect(() => {
    if (!open || !mounted) return
    const panel = panelRef.current
    if (!panel) return

    const handle = panel.querySelector<HTMLElement>('.ad-header')
    if (!handle) return

    const isInClose = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest('.ad-close')

    let startX = 0,
      startY = 0,
      lastX = 0,
      lastY = 0,
      startT = 0,
      dragging = false

    const onPointerDown = (e: PointerEvent) => {
      if (isInClose(e.target)) return // не стартуем жест, если нажали на X
      dragging = true
      startX = lastX = e.clientX
      startY = lastY = e.clientY
      startT = performance.now()
      handle.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      lastX = e.clientX
      lastY = e.clientY
    }

    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      const dt = Math.max(performance.now() - startT, 1)
      const dx = lastX - startX
      const dy = lastY - startY
      const vx = dx / dt
      const vy = dy / dt

      if (side === 'bottom') {
        if (dy > 60 || vy > 0.3) onClose()
      } else {
        if (dx > 60 || vx > 0.3) onClose()
      }
    }

    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    handle.addEventListener('pointercancel', onPointerUp)

    return () => {
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      handle.removeEventListener('pointercancel', onPointerUp)
    }
  }, [open, mounted, side])

  if (!mounted) return null

  return (
    <>
      <div
        className={`ad-backdrop ${open ? 'ad-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden='true'
      />
      <div
        ref={panelRef}
        className={`ad-panel ad-panel--${side} ${open ? 'ad-panel--open' : 'ad-panel--close'}`}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'ad-title' : undefined}
      >
        <div className='ad-header'>
          {title && (
            <h2 id='ad-title' className='ad-title'>
              {title}
            </h2>
          )}
          <button type='button' className='ad-close' onClick={onClose} aria-label='Close'>
            ✕
          </button>
        </div>
        <div className='ad-content' ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  )
}
