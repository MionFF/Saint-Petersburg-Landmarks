import { useState, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import '../../../styles.scss'
import Header from '../../../widgets/Header/Header'
import Footer from '../../../widgets/Footer/Footer'
import ScrollTopButton from '../../../features/places/ScrollTopButton/ScrollTopButton'
import AnchorsDrawer from '../../../features/places/components/AnchorsDrawer/AnchorsDrawer'
import SideAnchors from '../../../features/places/components/SideAnchors/SideAnchors'
import { getPlaces } from '../../../features/places/helpers'
import { useActiveSlug } from '../../../features/places/hooks/useActiveSlug'
import { useScrollToTop } from '../../../features/places/hooks/useScrollToTop'
import LanguageMenu from '../../../features/places/components/LanguageMenu/LanguageMenu'
import { useTranslation } from 'react-i18next'

export default function RootLayout() {
  useScrollToTop()

  const nav = useNavigate()
  const { pathname } = useLocation()
  const isPlaces = pathname.startsWith('/places')

  const [open, setOpen] = useState(false)
  const places = useMemo(() => getPlaces(), [])

  // ids только из places.slug
  const ids = useMemo(
    () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
    [places],
  )

  // Включаем IO-трекинг только на /places
  const activeSlug = useActiveSlug(ids, '0px 0px -50% 0px', 0.5, isPlaces)

  function handleBrowse() {
    if (!isPlaces) {
      nav('/places')
      // откроем после перехода небольшим таймаутом (когда DOM загрузит страницу)
      setTimeout(() => setOpen(true), 200)
      return
    }
    setOpen(true)
  }

  const { t } = useTranslation('common')
  const homeUI = t('ui.home')
  const placesUI = t('ui.places')

  return (
    <>
      <Header showBrowse={isPlaces} onBrowse={handleBrowse}>
        <LanguageMenu />
        <NavLink to='/'>{homeUI}</NavLink>
        <NavLink to='/places'>{placesUI}</NavLink>
      </Header>

      <main className='container'>
        <Outlet />
      </main>

      <Footer>&copy; Saint-Petersburg</Footer>
      <ScrollTopButton threshold={300} />

      <AnchorsDrawer open={open} onClose={() => setOpen(false)} side='bottom' title='Browse Places'>
        <SideAnchors
          items={places}
          className='side-anchors--mobile'
          onItemClick={() => setOpen(false)}
          activeSlug={activeSlug}
        />
      </AnchorsDrawer>
    </>
  )
}
