import { nWords } from './bcorpString'

export function isNew (date) {
  const newUntil = new Date(date)
  const now = new Date()
  return newUntil - now > 0
}

export function getExcerpt (excerpt, postContent, long) {
  const excerptLength = long ? 50 : 25

  if (excerpt && excerpt !== '') {
    return nWords(excerpt, excerptLength)
  } else if (postContent && postContent !== '') {
    return nWords(postContent, excerptLength)
  } else {
    return ''
  }
}
