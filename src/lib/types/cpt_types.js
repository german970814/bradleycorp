import type { WPPost } from './post_types'

type LiteraturePost = WPPost & { post_type: 'literature' }

type ChipSamplePost = WPPost & { post_type: 'chip_sample' }

type NavMenuItem = WPPost & { post_type: 'nav_menu_item' }

export type { LiteraturePost, ChipSamplePost, NavMenuItem }
