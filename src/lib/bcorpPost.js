// @flow

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
  } else if (postContent) {
    return nWords(postContent, excerptLength)
  } else {
    return ''
  }
}
