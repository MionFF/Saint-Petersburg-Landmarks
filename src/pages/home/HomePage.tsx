import Hero from '../../features/places/Hero/Hero'
import placesRaw from '../../features/places/data/places.json'
import PlaceCard from '../../features/places/PlaceCard/PlaceCard'
import type { Place } from '../../features/places/types'

export default function HomePage() {
  const places = placesRaw as Place[]

  return (
    <>
      <Hero />
      <section className='container' style={{ padding: '24px 0' }}>
        <ul className='places-grid' style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {places.map(place => (
            <li key={place.id} id={place.slug}>
              <PlaceCard place={place} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
