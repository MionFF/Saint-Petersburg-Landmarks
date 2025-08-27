import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import '../../../styles.scss'
import Header from '../../../widgets/Header/Header'
import Footer from '../../../widgets/Footer/Footer'
import ScrollTopButton from '../../../features/places/ScrollTopButton/ScrollTopButton'

export default function RootLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const isPlaces = pathname.startsWith('/places')

  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const places = useMemo(() => getPlaces(), [])

  function handleBrowse() {
    if (!isPlaces) {
      nav('/places#anchors-panel')
      return
    }
    const target = document.getElementById('anchors-panel')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    // если мобильная панель закрыта — раскрыть
    const mobilePanel = document.querySelector('.side-anchors--mobile')
    if (!mobilePanel) {
      document.querySelector<HTMLButtonElement>('.anchors-toggle')?.click()
    }
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
    </>
  )
}
