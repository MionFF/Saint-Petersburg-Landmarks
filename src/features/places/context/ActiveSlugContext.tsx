import React, { createContext, useContext, useState, useMemo } from 'react'

type Ctx = {
  activeSlug: string | null
  setActiveSlug: (v: string | null) => void
}

const ActiveSlugContext = createContext<Ctx | undefined>(undefined)

export function ActiveSlugProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const value = useMemo(() => ({ activeSlug, setActiveSlug }), [activeSlug])
  return <ActiveSlugContext.Provider value={value}>{children}</ActiveSlugContext.Provider>
}

export function useActiveSlugCtx() {
  const ctx = useContext(ActiveSlugContext)
  if (!ctx) throw new Error('useActiveSlugCtx must be used within ActiveSlugProvider')
  return ctx
}
