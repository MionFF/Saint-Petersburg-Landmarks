import { useParams, useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { getPlaces } from '../../../features/places/helpers'
import type { Place } from '../../../features/places/types'

type DetailsLocState = { from?: string; restoreTo?: string | null } | undefined

export default function PlaceDetailsPage() {
  const { t } = useTranslation(['places', 'common'])
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const rrLocation = useLocation() as ReturnType<typeof useLocation> & { state?: DetailsLocState }
  const from = rrLocation.state?.from
  const restoreTo = rrLocation.state?.restoreTo
  const place = getPlaces().find(p => p.slug === slug) as Place | undefined

  function goBack() {
    if (window.history.length > 1) {
      nav(-1)
      return
    }
    const fallback = from ?? '/'
    const state = fallback.startsWith('/places') ? { restoreTo } : undefined
    nav(fallback, { state })
  }

  if (!place) {
    return (
      <section className='container' style={{ padding: '24px 0' }}>
        <div className='pd'>
          <div className='pd__topbar'>
            <button className='btn' type='button' onClick={goBack}>
              ← {t('common:ui.back')}
            </button>
          </div>
          <div className='pd__body'>
            <h1 className='pd__title'>{t('common:ui.notFound')}</h1>
            <p className='pd__desc'>{t('common:ui.placeRemoved')}</p>
          </div>
        </div>
      </section>
    )
  }

  const name = t(`places:${place.slug}.name`)
  const description = t(`places:${place.slug}.description`)
  const address = t(`places:${place.slug}.address`)
  const categoryLabel = place.category ? t(`common:category.${place.category}`) : ''

  return (
    <section className='container' style={{ padding: '24px 0' }}>
      <article className='pd' aria-labelledby='pd-title'>
        <div className='pd__topbar'>
          <button className='btn' type='button' onClick={goBack}>
            ← {t('common:ui.back')}
          </button>
        </div>

        {place.imageUrl && (
          <figure className='pd__hero pd__hero--compact'>
            <img src={place.imageUrl} alt={name} className='pd__hero-img' loading='lazy' />
            <figcaption className='visually-hidden'>{name}</figcaption>
          </figure>
        )}

        <div className='pd__body'>
          <header className='pd__header'>
            <h1 id='pd-title' className='pd__title'>
              {name}
            </h1>
          </header>

          <div className='pd__content'>
            <div className='pd__main'>
              <section className='pd__section'>
                <h2 className='pd__section-title'>{t('common:ui.description')}</h2>
                <p className='pd__desc'>{description}</p>
              </section>
            </div>

            <aside className='pd__aside' aria-labelledby='pd-aside-title'>
              {address && (
                <section className='pd__section' aria-labelledby='pd-address'>
                  <h3 id='pd-address' className='pd__section-title'>
                    {t('common:ui.address')}
                  </h3>
                  <p className='pd__desc'>{address}</p>
                </section>
              )}
              {place.category && (
                <section className='pd__section' aria-labelledby='pd-category'>
                  <h3 id='pd-category' className='pd__section-title'>
                    {t('common:ui.category')}
                  </h3>
                  <p className='pd__desc'>{categoryLabel}</p>
                </section>
              )}
              {place.websiteUrl && (
                <section className='pd__section' aria-labelledby='pd-website'>
                  <h3 id='pd-website' className='pd__section-title'>
                    {t('common:ui.website')}
                  </h3>
                  <p className='pd__desc'>
                    <a
                      className='btn btn-link'
                      href={place.websiteUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${t('common:ui.website')}`}
                    >
                      {t('common:ui.open')} ↗
                    </a>
                  </p>
                </section>
              )}
            </aside>
          </div>
        </div>
      </article>
    </section>
  )
}
