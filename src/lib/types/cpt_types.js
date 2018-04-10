import type { WPPost } from './post_types'

type LiteraturePost = WPPost & { post_type: 'literature' }

type ChipSamplePost = WPPost & { post_type: 'chip_sample' }

export type { LiteraturePost, ChipSamplePost }
