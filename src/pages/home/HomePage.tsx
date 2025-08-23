import Hero from '../../features/places/Hero/Hero'
import PlaceCard from '../../features/places/components/PlaceCard/PlaceCard'
import { getPlaces } from '../../features/places/helpers'

export default function HomePage() {
  const places = getPlaces()

  return (
    <>
      <Hero />
      <section className='container' style={{ padding: '24px 0' }}>
        <ul className='places-grid' style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {places.map(place => (
            <li key={place.id} id={place.slug}>
              <PlaceCard place={place} variant='grid' />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
