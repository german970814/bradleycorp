// @flow

type WPPost = {
  ID: number,
  post_title: string,
  post_content: string,
  post_excerpt: string,
  post_date: '',
  author_display_name?: ''
}

type BCorpPost = {
  post: WPPost,
  meta: {},
  terms: {},
  media: {
    featured_image: '' | Array<mixed>
  }
}

export type { BCorpPost, WPPost }
