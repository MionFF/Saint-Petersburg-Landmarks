import { getPlaces } from '../../features/places/helpers'
import PlaceCard from '../../features/places/components/PlaceCard/PlaceCard'
import SideAnchors from '../../features/places/components/SideAnchors/SideAnchors'

export default function PlacesPage() {
  const places = getPlaces()

  return (
    <section className='container' style={{ padding: '24px 0' }}>
      <div className='container-grid'>
        <SideAnchors items={places} />
        <div className='places-stack'>
          {places.map(p => (
            <article key={p.id} id={p.slug} style={{ marginBottom: '24px' }}>
              <PlaceCard place={p} variant='wide' />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
