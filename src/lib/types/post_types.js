// @flow

// TODO: bit of a job, but would be nice to have our type enforce all the usual WP_Post properties
type WPPost = {
  ID: number,
  post_title?: string,
  post_content?: string,
  post_excerpt?: string,
  post_date?: '',
  post_type?: '',
  post_name?: '',
  /**
   * Added manually in the back end to the WP_Post object for some responses
   */
  author_display_name?: '',
  path?: ''
}

type WPPostWithPath = WPPost & { path: string }

type WPFeaturedImageArrayTypes = string | number | boolean

type WPPostTag = {
  count: number,
  description?: string,
  filter: string,
  name: string,
  parent: number,
  slug: string,
  taxonomy: string,
  term_group: number,
  term_id: number,
  term_taxonomy_id: number
}

type BCorpPostHeirarchyResponse = {
  parent: false | WPPostWithPath,
  children: false | Array<WPPostWithPath>
}

type BCorpPost = {
  post: WPPost,
  meta: {},
  terms: {
    post_tag?: Array<WPPostTag>
  },
  media: {
    featured_image: '' | Array<WPFeaturedImageArrayTypes>
  }
}

export type {
  BCorpPost,
  WPPost,
  WPPostTag,
  WPFeaturedImageArrayTypes,
  BCorpPostHeirarchyResponse
}
