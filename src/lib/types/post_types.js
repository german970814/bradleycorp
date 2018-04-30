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
  author_display_name?: '',
  path?: ''
}

type WPPostWithPath = WPPost & { path: string }

type BCorpPostHeirarchyResponse = {
  parent: false | WPPostWithPath,
  children: false | Array<WPPostWithPath>
}

type BCorpPostTreeResponse = Array<BCorpPostHeirarchyResponse>

type WPFeaturedImageArrayTypes = string | number | boolean

type BCorpPost = {
  post: WPPost,
  meta: {
    video_gallery_video?: string,
    product_sku?: string
  },
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
  WPPost,
  WPFeaturedImageArrayTypes,
  BCorpPostHeirarchyResponse,
  BCorpPostTreeResponse
}
