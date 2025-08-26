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
        <div className='nav__links'>{children}</div>
        <div className='nav__spacer' />
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
      </nav>
    </header>
  )
}
