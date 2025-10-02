import Hero from '../../features/places/Hero/Hero'
import PlaceCard from '../../features/places/components/PlaceCard/PlaceCard'
import ClickableCard from '../../features/places/components/ClickableCard/ClickableCard'
import { getPlaces, isPlaceWithSlug } from '../../features/places/helpers'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation(['places', 'common'])
  const placesAll = getPlaces()
  const places = placesAll.filter(isPlaceWithSlug)

  return (
    <>
      <Hero />
      <section className='container' style={{ padding: '24px 0' }}>
        <ul className='places-grid' style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {places.map(place => {
            const name = t(`places:${place.slug}.name`)
            const description = t(`places:${place.slug}.description`)
            const address = t(`places:${place.slug}.address`)
            return (
              <li key={place.id} id={place.slug}>
                <ClickableCard slug={place.slug}>
                  <PlaceCard place={{ ...place, name, description, address }} />
                </ClickableCard>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
