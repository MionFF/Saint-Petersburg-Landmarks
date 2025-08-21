import { useParams } from 'react-router'
import type { Place } from 'features/places/types'
import places from '../../features/places/data/places.json'

export default function PlacesListPage() {
  const { slug } = useParams<{ slug: string }>()
  const items = places as Place[]
  const place = items.find(p => p.slug === slug)
  if (!place) return <h2>Place not found</h2>
  return <h2>{place.name}</h2>
}
