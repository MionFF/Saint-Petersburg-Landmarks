import type { Place } from '../../types'

type Props = {
  place: Place
  variant?: 'grid' | 'wide'
}

export default function PlaceCard({ place, variant = 'grid' }: Props) {
  return (
    <article className={`place-card place-card--${variant}`}>
      {place.imageUrl && (
        <div className='place-card__media'>
          <img src={place.imageUrl} alt={place.name} className='place-card__img' loading='lazy' />
        </div>
      )}

      <div className='place-card__body'>
        <h3 className='place-card__title'>{place.name}</h3>
        <p className='place-card__desc'>{place.description}</p>

        <div className='place-card__meta'>
          <span>{place.category}</span> · <span>{place.address}</span>
        </div>

        {/* The link to the official site will be available in "more..." */}
        {/* {place.websiteUrl && (
          <div className='place-card__actions'>
            <a href={place.websiteUrl} target='_blank' rel='noopener noreferrer'>
              Official site
            </a>
          </div>
        )} */}
      </div>
    </article>
  )
}
