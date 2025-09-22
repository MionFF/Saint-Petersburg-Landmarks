import places from './data/places.json'
import type { Place } from './types'

export function getPlaces() {
  return places as Place[]
}

export function isPlaceWithSlug(p: Place): p is Place & { slug: string } {
  return typeof p.slug === 'string' && p.slug.length > 0
}
