import places from './data/places.json'
import type { Place } from './types'

export function getPlaces() {
  return places as Place[]
}
