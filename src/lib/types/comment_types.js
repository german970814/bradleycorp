// @flow

type WPComment = {
  id: number,
  author: number,
  author_email: string,
  author_ip?: string,
  author_name?: string,
  author_url?: string,
  author_user_agent?: string,
  content: {
    rendered: string
  },
  date: string,
  date_gmt?: string,
  link: string,
  parent?: number,
  post: number,
  status: string,
  type: string,
  author_avatar_urls: {
    '96'?: string
  },
  meta?: {}
}

type WPCreateComment = {
  /**
   * Author ID, if author was a user
   */
  author?: number,
  author_email: string,
  author_ip?: string,
  author_name: string,
  author_url?: string,
  author_user_agent?: string,
  content: string,
  date: string,
  date_gmt?: string,
  parent?: number,
  post: number,
  status?: string,
  meta?: {}
}

export type { WPComment, WPCreateComment }
