import { useState, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import '../../../styles.scss'
import Header from '../../../widgets/Header/Header'
import Footer from '../../../widgets/Footer/Footer'
import ScrollTopButton from '../../../features/places/ScrollTopButton/ScrollTopButton'
import AnchorsDrawer from '../../../features/places/components/AnchorsDrawer/AnchorsDrawer'
import SideAnchors from '../../../features/places/components/SideAnchors/SideAnchors'
import { getPlaces } from '../../../features/places/helpers'
import {
  ActiveSlugProvider,
  useActiveSlugCtx,
} from '../../../features/places/context/ActiveSlugContext'

export function RootInner() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const isPlaces = pathname.startsWith('/places')

  const [open, setOpen] = useState(false)
  const places = useMemo(() => getPlaces(), [])
  const { activeSlug } = useActiveSlugCtx()

  function handleBrowse() {
    if (!isPlaces) {
      nav('/places')
      // откроем после перехода небольшим таймаутом (когда DOM загрузит страницу)
      setTimeout(() => setOpen(true), 0)
      return
    }
    setOpen(true)
  }

  return (
    <>
      <Header showBrowse={isPlaces} onBrowse={handleBrowse}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/places'>Places</NavLink>
      </Header>

      <main className='container'>
        <Outlet />
      </main>

      <Footer>&copy; Saint-Petersburg</Footer>
      <ScrollTopButton threshold={300} />

      <AnchorsDrawer
        open={open}
        onClose={() => setOpen(false)}
        side='bottom'
        title='Browse Places'
        activeSlug={activeSlug} // <- пробрасываем из контекста
      >
        <SideAnchors
          items={places}
          className='side-anchors side-anchors--drawer' // без вложенного overflow в модалке
          onItemClick={() => setOpen(false)}
          activeSlug={activeSlug}
        />
      </AnchorsDrawer>
    </>
  )
}

export default function RootLayout() {
  return (
    <ActiveSlugProvider>
      <RootInner />
    </ActiveSlugProvider>
  )
}
