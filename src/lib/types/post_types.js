// @flow

type BCorpPost = {
  post: {
    ID: number,
    post_title: string,
    post_content: string,
    post_excerpt: string
  },
  meta?: {},
  terms?: {},
  media: {
    featured_image: '' | Array<mixed>
  }
}

export type { BCorpPost }
