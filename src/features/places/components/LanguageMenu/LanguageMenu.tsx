import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'flag-icons/css/flag-icons.min.css'

type Lang = { code: 'en' | 'ru'; label: string; flag?: React.ReactNode }

export default function LanguageMenu() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Простые SVG-флаги (библиотека flag-icons)
  const langs: Lang[] = useMemo(
    () => [
      { code: 'en', label: 'English', flag: <span className='fi fi-us'></span> },
      { code: 'ru', label: 'Русский', flag: <span className='fi fi-ru'></span> },
      // Добавлять новые языки сюда: 'de', 'fr', 'es', 'zh' ...
    ],
    [],
  )

  const current = (i18n.language || 'en').split('-')[0] as Lang['code']
  const activeIndex = Math.max(
    0,
    langs.findIndex(l => l.code === current),
  )

  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  // Закрытие по клику вне
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!btnRef.current || !listRef.current) return
      if (btnRef.current.contains(e.target as Node)) return
      if (listRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  // Клавиатура: Esc закрыть, Arrow навигация
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const changeLanguage = async (code: Lang['code']) => {
    await i18n.changeLanguage(code)
    // Детектор кэширует выбор (localStorage/cookie), обновлять вручную не требуется
    close()
    btnRef.current?.focus()
  }

  // Arrow навигация
  useEffect(() => {
    if (!open || !listRef.current) return
    const items = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'),
    )
    let idx = activeIndex >= 0 ? activeIndex : 0
    items[idx]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
      e.preventDefault()
      if (e.key === 'Home') idx = 0
      else if (e.key === 'End') idx = items.length - 1
      else if (e.key === 'ArrowDown') idx = (idx + 1) % items.length
      else if (e.key === 'ArrowUp') idx = (idx - 1 + items.length) % items.length
      items[idx]?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, activeIndex])

  return (
    <div className='lang-menu'>
      <button
        ref={btnRef}
        type='button'
        className='lang-menu__btn'
        aria-haspopup='menu'
        aria-expanded={open}
        aria-controls='lang-menu-list'
        aria-label='Change language'
        onClick={toggle}
      >
        <GlobeIcon />
      </button>

      <div className='lang-menu__popover' hidden={!open}>
        <ul
          id='lang-menu-list'
          className='lang-menu__list'
          role='menu'
          aria-label='Languages'
          ref={listRef}
        >
          {langs.map((l, idx) => {
            const selected = idx === activeIndex
            return (
              <li key={l.code} role='none'>
                <button
                  type='button'
                  role='menuitemradio'
                  aria-checked={selected}
                  className={`lang-menu__item${selected ? ' is-active' : ''}`}
                  onClick={() => changeLanguage(l.code)}
                >
                  <span className='lang-menu__flag' aria-hidden='true'>
                    {l.flag}
                  </span>
                  <span className='lang-menu__label'>{l.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// 20px иконка (масштабируется CSS-ом, не обрежется)
function GlobeIcon() {
  return (
    <svg
      className='lang-menu__icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      aria-hidden='true'
      focusable='false'
    >
      <path
        fill='currentColor'
        d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z'
      />
    </svg>
  )
}
