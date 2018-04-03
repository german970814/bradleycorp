// @flow

type WPPost = {
  ID: number,
  post_title?: string,
  post_content?: string,
  post_excerpt?: string,
  post_date?: '',
  author_display_name?: ''
}

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

type BCorpPost = {
  post: WPPost,
  meta: {},
  terms: {
    post_tag?: Array<WPPostTag>
  },
  media: {
    featured_image: '' | Array<mixed>
  }
}

export type { BCorpPost, WPPost, WPPostTag }
