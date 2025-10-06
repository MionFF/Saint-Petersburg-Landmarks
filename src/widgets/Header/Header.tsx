import type React from 'react'
import { Brand } from '../../features/places/components/Brand/Brand'
import { useTranslation } from 'react-i18next'

type Props = {
  children?: React.ReactNode
  onBrowse?: () => void // клик по “Browse Places”
  showBrowse?: boolean // показывать только на /places и только мобайл
}

export default function Header({ children, onBrowse, showBrowse }: Props) {
  const { t } = useTranslation('common')
  const browseUI = t('ui.browse')

  return (
    <header className='header'>
      <nav className='nav'>
        {/* Лого слева */}
        <Brand />
        {/* Навигация справа */}
        <div className='nav__links'>
          {children}
          {showBrowse && (
            <button type='button' className='nav__browse' aria-label={browseUI} onClick={onBrowse}>
              {browseUI}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
