import { useParams, useNavigate, useLocation } from 'react-router'
import { getPlaces } from '../../../features/places/helpers'
import type { Place } from '../../../features/places/types'

type DetailsLocState = { from?: string; restoreTo?: string | null } | undefined

export default function PlaceDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const rrLocation = useLocation() as ReturnType<typeof useLocation> & { state?: DetailsLocState }
  const from = rrLocation.state?.from
  const restoreTo = rrLocation.state?.restoreTo
  const place = getPlaces().find(p => p.slug === slug) as Place | undefined

  function goBack() {
    // Попытка нативного возврата
    if (window.history.length > 1) {
      nav(-1)
      return
    }
    // Фолбэк: возвращаемся туда, откуда пришли, или на главную/список
    const fallback = from ?? '/'
    // Можно оставить restoreTo для совместимости со списком; плавность пусть остаётся глобальной
    const state = fallback.startsWith('/places') ? { restoreTo } : undefined
    nav(fallback, { state })
  }

  if (!place) {
    return (
      <section className='container' style={{ padding: '24px 0' }}>
        <div className='pd'>
          <div className='pd__topbar'>
            <button className='btn' type='button' onClick={goBack}>
              ← Back
            </button>
          </div>
          <div className='pd__body'>
            <h1 className='pd__title'>Not found</h1>
            <p className='pd__desc'>The place does not exist or was removed.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='container' style={{ padding: '24px 0' }}>
      <article className='pd' aria-labelledby='pd-title'>
        <div className='pd__topbar'>
          <button className='btn' type='button' onClick={goBack}>
            ← Back
          </button>
        </div>

        {place.imageUrl && (
          <figure className='pd__hero pd__hero--compact'>
            <img src={place.imageUrl} alt={place.name} className={'pd__hero-img'} loading='lazy' />
            <figcaption className='visually-hidden'>{place.name}</figcaption>
          </figure>
        )}

        <div className='pd__body'>
          <header className='pd__header'>
            <h1 id='pd-title' className='pd__title'>
              {place.name}
            </h1>
          </header>

          <div className='pd__content'>
            <div className='pd__main'>
              <section className='pd__section'>
                <h2 className='pd__section-title'>Description</h2>
                <p className='pd__desc'>{place.description}</p>
              </section>
            </div>

            <aside className='pd__aside' aria-labelledby='pd-aside-title'>
              {place.address && (
                <section className='pd__section' aria-labelledby='pd-address'>
                  <h3 id='pd-address' className='pd__section-title'>
                    Address
                  </h3>
                  <p className='pd__desc'>{place.address}</p>
                </section>
              )}
              {place.category && (
                <section className='pd__section' aria-labelledby='pd-category'>
                  <h3 id='pd-category' className='pd__section-title'>
                    Category
                  </h3>
                  <p className='pd__desc'>{place.category}</p>
                </section>
              )}
              {place.websiteUrl && (
                <section className='pd__section' aria-labelledby='pd-website'>
                  <h3 id='pd-website' className='pd__section-title'>
                    Website
                  </h3>
                  <p className='pd__desc'>
                    <a
                      className='btn btn--link'
                      href={place.websiteUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Official site
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
