import { useTranslation } from 'react-i18next'

export default function SubHero() {
  const { t } = useTranslation('common')
  const subTitle = t('heros.subTitle')
  const subDescription = t('heros.subDescription')

  return (
    <section className='subhero'>
      <div className='subhero__overlay' />
      <div className='subhero__content'>
        {/* EN: St. Petersburg, at your pace */}
        <h1 className='subhero__title'>{subTitle}</h1>
        {/* EN: Iconic sights, hidden corners, and everything in between. */}
        <p className='subhero__subtitle'>{subDescription}</p>
      </div>
    </section>
  )
}
