import { useMemo, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import { getPlaces } from '../../features/places/helpers'
import PlaceCardWide from '../../features/places/components/PlaceCardWide/PlaceCardWide'
import SideAnchors from '../../features/places/components/SideAnchors/SideAnchors'
import Subhero from '../../features/places/Subhero/Subhero'
import { useActiveSlug } from '../../features/places/hooks/useActiveSlug'

type LocState = { restoreTo?: string | null } | null | undefined

export default function PlacesPage() {
  const places = getPlaces()
  const location = useLocation() as ReturnType<typeof useLocation> & { state?: LocState }
  const restoreTo = location.state?.restoreTo ?? null

  // Если хотите сохранить мгновенное восстановление позиции — оставьте этот эффект.
  // Если и это не нужно — удалите эффект целиком.
  useLayoutEffect(() => {
    if (!restoreTo) return
    const target = document.getElementById(restoreTo)
    if (!target) return
    target.scrollIntoView({ block: 'start', behavior: 'smooth' })
    // По желанию можно очистить state, чтобы не повторялось:
    // history.replaceState(null, '', window.location.pathname + window.location.search + window.location.hash)
  }, [restoreTo])

  const ids = useMemo(
    () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
    [places],
  )
  const desktopActiveSlug = useActiveSlug(ids, '0px 0px -50% 0px', 0.5, true)

  return (
    <>
      <Subhero />
      <section className='container' style={{ padding: '24px 0' }}>
        <div className='container-grid'>
          <SideAnchors
            items={places}
            className='side-anchors--grid'
            activeSlug={desktopActiveSlug}
          />
          <div className='places-stack'>
            {places.map(p => (
              <article key={p.id} id={p.slug!} style={{ marginBottom: 24 }}>
                <PlaceCardWide place={p} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
