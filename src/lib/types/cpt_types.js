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

type LiteraturePost = { post_type: 'literature' } & WPPost

type ChipSamplePost = { post_type: 'chip_sample' } & WPPost

type VideoGalleryPost = WPPost & { post_type: 'video-gallery' }

type ApplicationGalleryPost = WPPost & { post_type: 'application-gallery' }

type NavMenuItem = WPPost & { post_type: 'nav_menu_item' }

export type {
  CPTName,
  LiteraturePost,
  ChipSamplePost,
  VideoGalleryPost,
  ApplicationGalleryPost,
  NavMenuItem
}
