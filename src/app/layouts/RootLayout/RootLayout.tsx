import { NavLink, Outlet } from 'react-router'
import '../../../styles.scss'
import Header from '../../../widgets/Header/Header'
import Footer from '../../../widgets/Footer/Footer'
import ScrollTopButton from '../../../features/places/ScrollTopButton/ScrollTopButton'

export default function RootLayout() {
  return (
    <>
      <Header>
        <nav className='nav'>
          <NavLink to='/'>Home</NavLink> | <NavLink to='/places'>Places</NavLink> |
        </nav>
      </Header>
      <main className='container'>
        <Outlet />
      </main>
      <Footer>&copy; Saint-Petersburg</Footer>
      <ScrollTopButton threshold={300} />
    </>
  )
}
