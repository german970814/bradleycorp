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
  termId: number | string,
  leaveChildren?: boolean
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
        if (leaveChildren) {
          return (
            postTerm.term_id === termIdNumber ||
            postTerm.parent === termIdNumber
          )
        } else {
          return postTerm.term_id === termIdNumber
        }
      })
    }
  })
}

export function filterPostsByMeta (
  posts: Array<BCorpPost>,
  metaName: string,
  metaValue: number | string,
  matchType: 'EQUAL' | 'NOTEQUAL'
): Array<BCorpPost> {
  return posts.filter(post => {
    if (matchType === 'EQUAL') {
      return (
        post.meta && post.meta[metaName] && post.meta[metaName] === metaValue
      )
    }
    if (matchType === 'NOTEQUAL') {
      return (
        !post.meta || !post.meta[metaName] || post.meta[metaName] !== metaValue
      )
    }
  })
}
