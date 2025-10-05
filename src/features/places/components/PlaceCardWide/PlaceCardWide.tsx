import type { Place } from '../../types'
import LinkToDetails from '../LinkToDetails/LinkToDetails'
import { isPlaceWithSlug } from '../../../../features/places/helpers'
import { useTranslation } from 'react-i18next'

type Props = {
  place: Place
}

export default function PlaceCardWide({ place }: Props) {
  const { t } = useTranslation(['common', 'places'])
  const canLink = isPlaceWithSlug(place)
  const categoryLabel = place.category ? t(`category.${place.category}`, { ns: 'common' }) : ''
  const schedule = place.slug
    ? t(`schedule.${place.slug}`, { ns: 'places', defaultValue: place.schedule ?? '' })
    : place.schedule ?? ''

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

        {place.schedule && (
          <div className='place-card__meta'>
            <span>{schedule}</span>
          </div>
        )}

        {place.websiteUrl && (
          <div className='place-card__actions'>
            <a href={place.websiteUrl} target='_blank' rel='noopener noreferrer'>
              {t('ui.website', { ns: 'common' })}
            </a>
          </div>
        )}

        {canLink && (
          <LinkToDetails slug={place.slug!} style={{ width: 'fit-content' }}>
            {t('ui.description', { ns: 'common' })}
          </LinkToDetails>
        )}
      </div>
    </article>
  )
}
