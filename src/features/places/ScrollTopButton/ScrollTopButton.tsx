import { useState, useEffect } from 'react'

type Props = {
  threshold?: number // пикселей, после которых показывать кнопку
}

export default function ScrollTopButton({ threshold = 300 }: Props) {
  const [visible, setVisible] = useState(false)

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
