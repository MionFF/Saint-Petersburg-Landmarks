import type React from 'react'

export default function Header({ children }: { children?: React.ReactNode }) {
  return <header className='header'>{children}</header>
}
