import type { WPPost } from './post_types'

type CPTName =
  | 'application-gallery'
  | 'case-study'
  | 'chip'
  | 'faq'
  | 'literature'
  | 'news'
  | 'product'
  | 'technical-info'
  | 'video-gallery'
  | 'warranty'
  | 'nav_menu_item'

// Literature
type MetaLiterature = { literature_pdf: string }

type LiteraturePost = { post_type: 'literature', meta: MetaLiterature } & WPPost

type ChipSamplePost = { post_type: 'chip_sample' } & WPPost

type VideoGalleryPost = WPPost & { post_type: 'video-gallery' }

type ApplicationGalleryPost = WPPost & { post_type: 'application-gallery' }

type NavMenuItem = WPPost & { post_type: 'nav_menu_item' }

// Technical Info
type MetaTechnicalInfo = { technical_info_pdf: string }

type TechnicalInfo = WPPost & { post_type: 'technical-info', meta: MetaTechnicalInfo }

// Product
type MetaProduct = { product_sku: string }

type ProductPost = WPPost & { post_type: 'product', meta: MetaProduct }

export type {
  CPTName,
  LiteraturePost,
  ChipSamplePost,
  VideoGalleryPost,
  ApplicationGalleryPost,
  NavMenuItem,
  ProductPost,
  TechnicalInfo
}
