import type { Place } from '../../types'
import { useTranslation } from 'react-i18next'

type Props = {
  place: Place
}

export default function PlaceCard({ place }: Props) {
  const { t } = useTranslation('common')
  const categoryLabel = place.category ? t(`category.${place.category}`) : ''
  return (
    <article className='place-card place-card--grid'>
      {place.imageUrl && (
        <div className='place-card__media'>
          <img src={place.imageUrl} alt={place.name} className='place-card__img' loading='lazy' />
        </div>
      )}

      <div className='place-card__body'>
        <h3 className='place-card__title'>{place.name}</h3>
        <p className='place-card__desc'>{place.description}</p>

        <div className='place-card__meta'>
          <span>{categoryLabel}</span> · <span>{place.address}</span>
        </div>
      </div>
    </article>
  )
}
