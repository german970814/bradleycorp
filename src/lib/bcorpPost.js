// @flow
import type { BCorpPost } from './types/post_types'
import { nWords } from './bcorpString'

export function isNew (date: string): boolean {
  const newUntil = new Date(date)

  if (!newUntil) {
    console.warn(`${date} cannot be parsed as a date`)
    return false
  }

  const now = new Date()
  return newUntil - now > 0
}

export function getExcerpt (
  excerpt: ?string,
  postContent: string,
  length: 'short' | 'long'
): string {
  const excerptLength = length === 'long' ? 50 : 25

  if (excerpt) {
    return nWords(excerpt, excerptLength)
  } else {
    return nWords(postContent, excerptLength)
  }
}

export function filterPostsByTerm (
  posts: Array<BCorpPost>,
  termName: string,
  termId: number | string
): Array<BCorpPost> {
  const termIdNumber = parseInt(termId)

  if (isNaN(termIdNumber)) {
    console.warn(`Could not parse ${termId} as integer`)
    return posts
  }

  return posts.filter(post => {
    if (!post.terms[termName] || !post.terms[termName].constructor === Array) {
      return false
    } else {
      return post.terms[termName].some(postTerm => {
        return postTerm.term_id === termIdNumber
      })
    }
  })
}
