import type { Place } from './types'

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <article className='place-card'>
      {place.imageUrl && (
        <img src={place.imageUrl} alt={place.name} className='place-card__img' loading='lazy' />
      )}
      <div className='place-card__body'>
        <h3 className='place-card__title'>{place.name}</h3>
        <p className='place-card__desc'>{place.description}</p>
        <div className='place-card__meta'>
          <span>{place.category}</span> · <span>{place.address}</span>
        </div>
        {place.websiteUrl && (
          <a href={place.websiteUrl} target='_blank' rel='noopener noreferrer'>
            Official site
          </a>
        )}
      </div>
    </article>
  )
}
