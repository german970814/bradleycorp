import { nWords } from './bcorpString'

export function isNew (date) {
  const newUntil = new Date(date)
  const now = new Date()
  return newUntil - now > 0
}

export function getExcerpt (excerpt, postContent, numberWords) {
  const defaultExcerptLength = 100
  const defaultExcerptFromContentLength = 55

  if (excerpt && excerpt !== '') {
    return nWords(excerpt, numberWords || defaultExcerptLength)
  } else

  if (postContent && postContent !== '') {
    return nWords(postContent, numberWords || defaultExcerptFromContentLength)
  } else {
    return ''
  }
}
