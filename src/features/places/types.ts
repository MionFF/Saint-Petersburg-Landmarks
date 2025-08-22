export type Category =
  | 'theatre'
  | 'museum'
  | 'cathedral'
  | 'park'
  | 'monument'
  | 'palace'
  | 'street'
  | 'fortress'
  | 'square'
  | 'ensemble'
  | 'skyscraper'

export type Place = {
  id?: string
  slug?: string
  category?: Category
  name?: string
  description?: string
  address?: string
  imageUrl?: string
  websiteUrl?: string
}
