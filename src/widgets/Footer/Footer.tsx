import type React from 'react'

export default function Footer({ children }: { children?: React.ReactNode }) {
  const year = new Date().getFullYear()

  return <footer className='footer'>&copy; {year + ' ' + children}</footer>
}
