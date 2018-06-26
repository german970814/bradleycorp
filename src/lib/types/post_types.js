// @flow
import type { WPTerm, WPPostTagTerm, WPCategoryTerm } from './term_types'

// TODO: bit of a job, but would be nice to have our type enforce all the usual WP_Post properties
type WPPost = {
  ID: number,
  post_title?: string,
  post_content?: string,
  post_excerpt?: string,
  post_date?: string,
  post_type?: string,
  post_name?: string,
  /**
   * Added manually in the back end to the WP_Post object for some responses
   */
  author_display_name?: string,
  path?: string,
  meta_title?: string,
  meta_description?: string
}

type WPPostWithPath = WPPost & { path: string }

type BCorpPostHeirarchyResponse = {
  parent: false | WPPostWithPath,
  children: false | Array<WPPostWithPath>
}

type BCorpPostTreeResponse = Array<BCorpPostHeirarchyResponse>

type WPFeaturedImageArrayTypes = string

type BCorpMeta = {
  video_gallery_video?: string,
  product_sku?: string,
  product_new_until?: string,
  product_compliance?: {
    [string]: string
  },
  app_gallery_img?: string,
  app_gallery_img_filters?: {
    color: string,
    market: string,
    shape: string
  },
  literature_pdf?: string,
  news_source?: {
    name: string,
    url: string
  },
  news_pdf?: string,
  case_study_pdf?: string,
  meta_description?: string,
  technical_info_pdf?: string
}

type BCorpPost = {
  post: WPPost,
  meta: BCorpMeta,
  terms: {
    [string]: ?Array<WPTerm>,
    post_tag?: Array<WPPostTagTerm>,
    category?: Array<WPCategoryTerm>
  },
  media: {
    featured_image: '' | Array<WPFeaturedImageArrayTypes>
  }
}

export type {
  BCorpPost,
  BCorpMeta,
  WPPost,
  WPFeaturedImageArrayTypes,
  BCorpPostHeirarchyResponse,
  BCorpPostTreeResponse
}
