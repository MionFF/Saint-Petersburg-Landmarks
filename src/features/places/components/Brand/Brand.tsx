import { Link, useLocation } from 'react-router-dom'

export function Brand() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className='nav__brand'>
      <Link to='/' aria-label='Home' onClick={handleClick} className='brand-link'>
        <span className='brand__name--wide'>SPB&nbsp;Guide</span>
        <span className='brand__name--narrow' aria-hidden='true'>
          SPBGuide
        </span>
      </Link>
    </div>
  )
}
