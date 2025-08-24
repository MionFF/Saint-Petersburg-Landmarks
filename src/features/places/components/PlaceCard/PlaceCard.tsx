import type { Place } from '../../types'

type Props = {
  place: Place
}

export default function PlaceCard({ place }: Props) {
  return (
    <article className={`place-card place-card--grid`}>
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
      </div>
    </article>
  )
}
