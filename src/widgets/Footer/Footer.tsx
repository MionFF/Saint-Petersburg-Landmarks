import type React from 'react'

export default function Footer({ children }: { children?: React.ReactNode }) {
  return <footer className='footer'>{children}</footer>
}
