import type { Place } from '../../types'
import LinkToDetails from '../LinkToDetails/LinkToDetails'
import { isPlaceWithSlug } from '../../../../features/places/helpers'
import { useTranslation } from 'react-i18next'

type Props = {
  place: Place
}

export default function PlaceCardWide({ place }: Props) {
  const { t } = useTranslation('common')
  const canLink = isPlaceWithSlug(place)
  const categoryLabel = place.category ? t(`category.${place.category}`) : ''

  return (
    <article className='place-card place-card--wide'>
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

        {place.websiteUrl && (
          <div className='place-card__actions'>
            <a href={place.websiteUrl} target='_blank' rel='noopener noreferrer'>
              {t('common:ui.website')}
            </a>
          </div>
        )}

        {canLink && (
          <LinkToDetails slug={place.slug} style={{ width: 'fit-content' }}>
            {/* Можно локализовать подпись кнопки */}
            {t('common:ui.description')}
          </LinkToDetails>
        )}
      </div>
    </article>
  )
}
