import type { WPPost } from './post_types'

/**
 * We've confused things a bit,
 * these are the names of the post types for use in the CPTApiClient class.
 * These are the names as they're called in the endpoints
 */
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
  | 'nav-menu'

/**
 * These are the CPT names as they are in the WP database
 */
type PostType =
  | 'application_gallery'
  | 'case_study'
  | 'chip'
  | 'faq'
  | 'literature'
  | 'news'
  | 'product'
  | 'technical_info'
  | 'video_gallery'
  | 'warranty'
  | 'nav_menu_item'

// Literature
type MetaLiterature = { literature_pdf: string }

type LiteraturePost = { post_type: 'literature', meta: MetaLiterature } & WPPost

type ChipSamplePost = { post_type: 'chip_sample' } & WPPost

type VideoGalleryPost = { post_type: 'video_gallery' } & WPPost

type ApplicationGalleryPost = { post_type: 'application_gallery' } & WPPost

type NavMenuItem = { post_type: 'nav_menu_item' } & WPPost

// Technical Info
type MetaTechnicalInfo = { technical_info_pdf: string }

type TechnicalInfo = WPPost & { post_type: 'technical-info', meta: MetaTechnicalInfo }

// Product
type MetaProduct = { product_sku: string }

type ProductPost = WPPost & { post_type: 'product', meta: MetaProduct }

export type {
  CPTName,
  PostType,
  LiteraturePost,
  ChipSamplePost,
  VideoGalleryPost,
  ApplicationGalleryPost,
  NavMenuItem,
  ProductPost,
  TechnicalInfo
}
