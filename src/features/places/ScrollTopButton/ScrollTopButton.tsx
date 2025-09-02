import { useState, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

type Props = {
  threshold?: number // пикселей, после которых показывать кнопку
}

export default function ScrollTopButton({ threshold = 300 }: Props) {
  const [visible, setVisible] = useState(false)
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    const html = document.documentElement
    const had = 'scrollRestoration' in history
    const prev = had ? (history as any).scrollRestoration : undefined

    html.classList.add('no-smooth')
    if (had) (history as any).scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    // вернуть настройки на следующий кадр
    requestAnimationFrame(() => {
      html.classList.remove('no-smooth')
      if (had) (history as any).scrollRestoration = prev ?? 'auto'
    })
  }, [pathname, hash])

  // навигация: мгновенно наверх без плавности и авто-restore
  useEffect(() => {
    if (hash) return
    const html = document.documentElement
    const hadProp = 'scrollRestoration' in history
    const prev = hadProp ? (history as any).scrollRestoration : undefined

    html.classList.add('no-smooth')
    if (hadProp) (history as any).scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    requestAnimationFrame(() => {
      html.classList.remove('no-smooth')
      if (hadProp) (history as any).scrollRestoration = prev ?? 'auto'
    })
  }, [pathname, hash])

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        type='button'
        title='Up'
        onClick={scrollToTop}
        className={`scroll-top ${visible ? 'scroll-top--visible' : ''}`}
        aria-label='Scroll to top'
      >
        {/* Иконка: стрелка вверх (SVG) */}
        <svg width='18' height='18' viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M12 5l-7 7h4v7h6v-7h4l-7-7z' fill='currentColor' />
        </svg>
      </button>
    </>
  )
}
