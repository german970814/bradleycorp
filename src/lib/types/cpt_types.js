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

type LiteraturePost = WPPost & { post_type: 'literature' }

type ChipSamplePost = WPPost & { post_type: 'chip_sample' }

type NavMenuItem = WPPost & { post_type: 'nav_menu_item' }

type ApplicationGalleryPost = WPPost & { post_type: 'application-gallery' }

export type { CPTName, LiteraturePost, ChipSamplePost, NavMenuItem, ApplicationGalleryPost }
