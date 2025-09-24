import { NavLink, useLocation } from 'react-router'
import type { HTMLAttributes, ReactNode } from 'react'

type LinkToDetailsProps = {
  slug: string
  children?: ReactNode
  className?: string
  style?: HTMLAttributes<HTMLElement>['style']
  ariaLabel?: string
  state?: Record<string, unknown>
}

export default function LinkToDetails({
  slug,
  children,
  className,
  style,
  ariaLabel,
  state,
}: LinkToDetailsProps) {
  const { pathname, search, hash } = useLocation()
  const to = `/details/${slug}`
  const navState = { from: pathname + search + hash, ...state }
  return (
    <NavLink
      to={to}
      state={navState}
      className={className}
      style={style}
      aria-label={ariaLabel ?? `Open details for ${slug}`}
    >
      {children ?? 'Details'}
    </NavLink>
  )
}
