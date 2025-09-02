import { useMemo, useEffect } from 'react'
import { getPlaces } from '../../features/places/helpers'
import PlaceCardWide from '../../features/places/components/PlaceCardWide/PlaceCardWide'
import SideAnchors from '../../features/places/components/SideAnchors/SideAnchors'
import Subhero from '../../features/places/Subhero/Subhero'
import { useActiveSlug } from '../../features/places/hooks/useActiveSlug'
import { useActiveSlugCtx } from '../../features/places/context/ActiveSlugContext'

export default function PlacesPage() {
  const places = getPlaces()
  const { setActiveSlug } = useActiveSlugCtx()

  const ids = useMemo(
    () => places.map(p => p.slug).filter((s): s is string => Boolean(s)),
    [places],
  )
  const activeSlug = useActiveSlug(ids, '0px 0px -50% 0px', 0.5)

  useEffect(() => {
    setActiveSlug(activeSlug ?? null)
    return () => setActiveSlug(null)
  }, [activeSlug, setActiveSlug])

  return (
    <>
      <Subhero />
      <section className='container' style={{ padding: '24px 0' }}>
        <div className='container-grid'>
          <SideAnchors items={places} className='side-anchors--grid' activeSlug={activeSlug} />
          <div className='places-stack'>
            {places.map(p => (
              <article key={p.id} id={p.slug} style={{ marginBottom: 24 }}>
                <PlaceCardWide place={p} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
