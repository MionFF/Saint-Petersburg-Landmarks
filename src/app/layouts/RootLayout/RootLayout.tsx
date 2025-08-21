import { NavLink, Outlet } from 'react-router'
import '../../../styles.scss'
import Header from '../../../widgets/Header/Header'
import Footer from '../../../widgets/Footer/Footer'

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
    </>
  )
}
