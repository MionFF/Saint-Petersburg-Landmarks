import Hero from '../../features/places/Hero/Hero'
import PlaceCard from '../../features/places/components/PlaceCard/PlaceCard'
import ClickableCard from '../../features/places/components/ClickableCard/ClickableCard'
import { getPlaces } from '../../features/places/helpers'
import { isPlaceWithSlug } from '../../features/places/helpers'

export default function HomePage() {
  const placesAll = getPlaces()
  const places = placesAll.filter(isPlaceWithSlug)

  return (
    <>
      <Hero />
      <section className='container' style={{ padding: '24px 0' }}>
        <ul className='places-grid' style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {places.map(place => (
            <li key={place.id} id={place.slug}>
              <ClickableCard slug={place.slug}>
                <PlaceCard place={place} />
              </ClickableCard>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
