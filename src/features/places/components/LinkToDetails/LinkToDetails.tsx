import { NavLink, useLocation } from 'react-router'
import type { HTMLAttributes, ReactNode } from 'react'

type LinkToDetailsProps = {
  slug: string
  children?: ReactNode
  className?: string
  style?: HTMLAttributes<HTMLElement>['style']
  ariaLabel?: string
  state?: Record<string, unknown>
  variant?: 'link' | 'linkButton' // опционально
}

export default function LinkToDetails({
  slug,
  children,
  className,
  style,
  ariaLabel,
  state,
  variant = 'linkButton',
}: LinkToDetailsProps) {
  const { pathname, search, hash } = useLocation()
  const to = `/details/${slug}`
  const navState = { from: pathname + search + hash, ...state }
  const cls = `details-cta details-cta--${variant}${className ? ` ${className}` : ''}`

  return (
    <NavLink
      to={to}
      state={navState}
      className={cls}
      style={style}
      aria-label={ariaLabel ?? `Open details for ${slug}`}
    >
      {children ?? 'Details'}
    </NavLink>
  )
}
