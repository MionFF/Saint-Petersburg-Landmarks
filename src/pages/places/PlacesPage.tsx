import { useMemo, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getPlaces } from '../../features/places/helpers'
import PlaceCardWide from '../../features/places/components/PlaceCardWide/PlaceCardWide'
import SideAnchors from '../../features/places/components/SideAnchors/SideAnchors'
import Subhero from '../../features/places/Subhero/Subhero'
import { useActiveSlug } from '../../features/places/hooks/useActiveSlug'

type LocState = { restoreTo?: string | null } | null | undefined

export default function PlacesPage() {
  const { t } = useTranslation(['places', 'common'])
  const places = getPlaces()
  const location = useLocation() as ReturnType<typeof useLocation> & { state?: LocState }
  const restoreTo = location.state?.restoreTo ?? null

  useLayoutEffect(() => {
    if (!restoreTo) return
    const target = document.getElementById(restoreTo)
    if (!target) return
    target.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [restoreTo])

  const ids = useMemo(
    () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
    [places],
  )
  const desktopActiveSlug = useActiveSlug(ids, '0px 0px -50% 0px', 0.5, true)

  const localizedPlaces = places.map(p => ({
    ...p,
    name: t(`places:${p.slug}.name`),
    description: t(`places:${p.slug}.description`),
    address: t(`places:${p.slug}.address`),
  }))

  return (
    <>
      <Subhero />
      <section className='container' style={{ padding: '24px 0' }}>
        <div className='container-grid'>
          <SideAnchors
            items={localizedPlaces}
            className='side-anchors--grid'
            activeSlug={desktopActiveSlug}
          />
          <div className='places-stack'>
            {localizedPlaces.map(p => (
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
