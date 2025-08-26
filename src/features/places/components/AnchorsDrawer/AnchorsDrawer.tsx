import type React from 'react'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose?: () => void
}

export default function AnchorsDrawer({ children, open, onClose }: Props) {
  return <>{open && <h2 onClick={onClose}>{children}</h2>}</>
}
