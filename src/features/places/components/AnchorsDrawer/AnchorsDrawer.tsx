import type React from 'react'
import { useRef, useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
  side?: 'bottom' | 'right'
  title?: string
}

export default function AnchorsDrawer({ children, open, onClose, side = 'bottom', title }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Управляем монтированием для анимации выхода
  const [mounted, setMounted] = useState(open)

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
  useEffect(() => {
    if (!mounted || !open) return
    const html = document.documentElement
    // const body = document.body
    const prevHtmlOverflow = html.style.overflow
    // const prevBodyOverflow = body.style.overflow

    html.style.overflow = 'hidden'
    // body.style.overflow = 'hidden'
    html.classList.add('is-drawer-open') // <- добавили глобальный флаг

    return () => {
      html.style.overflow = prevHtmlOverflow
      // body.style.overflow = prevBodyOverflow
      html.classList.remove('is-drawer-open') // <- снимаем
    }
  }, [mounted, open])

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

    let startX = 0,
      startY = 0,
      lastX = 0,
      lastY = 0,
      startT = 0,
      dragging = false
    const thresholdPx = 60 // порог расстояния
    const velocityMin = 0.3 // порог скорости (px/ms)

    const onPointerDown = (e: PointerEvent) => {
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
        if (dy > thresholdPx || vy > velocityMin) onClose()
      } else {
        if (dx > thresholdPx || vx > velocityMin) onClose()
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
        <div className='ad-content'>{children}</div>
      </div>
    </>
  )
}
