import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation('common')
  const title = t('heros.title')
  const description = t('heros.description')

  return (
    <section className='hero'>
      <div className='hero__overlay' />
      <div className='hero__content'>
        <h1 className='hero__title'>{title}</h1>
        <p className='hero__subtitle'>{description}</p>
      </div>
    </section>
  )
}
