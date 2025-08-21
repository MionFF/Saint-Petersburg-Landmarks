export type Category = 'theatre' | 'museum' | 'park' | 'monument' | 'cathedral'

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
