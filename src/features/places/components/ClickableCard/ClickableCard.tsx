import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router'

type Props = {
  slug: string
  children: React.ReactNode
  state?: Record<string, unknown>
  className?: string
}

export default function ClickableCard({ slug, state, className, children }: Props) {
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()
  const from = pathname + search + hash

  const handleClick = useCallback(() => {
    navigate(`/details/${slug}`, { state: { from, ...state } })
  }, [navigate, slug, from, state])

  return (
    <div
      className={className}
      role='button'
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      style={{ cursor: 'pointer' }}
      aria-label={`Open details for ${slug}`}
    >
      {children}
    </div>
  )
}
