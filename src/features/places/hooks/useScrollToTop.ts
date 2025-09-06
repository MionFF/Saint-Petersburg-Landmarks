import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function useScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Если есть хеш (#section), скроллим к якорю
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    // Иначе скроллим к верху
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname, hash])
}
