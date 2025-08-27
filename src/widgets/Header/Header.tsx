import type React from 'react'

type Props = {
  children?: React.ReactNode
  onBrowse?: () => void // клик по “Browse Places”
  showBrowse?: boolean // показывать только на /places и только мобайл
}

export default function Header({ children, onBrowse, showBrowse }: Props) {
  return (
    <header className='header'>
      <nav className='nav'>
        {/* Лого слева */}
        <div className='nav__brand'>
          <a href='/' aria-label='Home'>
            SPB Guide
          </a>
        </div>

        {/* Навигация справа */}
        <div className='nav__links'>
          {children}
          {showBrowse && (
            <button
              type='button'
              className='nav__browse'
              aria-label='Browse places'
              onClick={onBrowse}
            >
              Browse Places
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
