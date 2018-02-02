import { nWords } from './bcorpString'

export function isNew (date) {
  const newUntil = new Date(date)
  const now = new Date()
  return newUntil - now > 0
}

export function getExcerpt (excerpt, postContent, numberWords) {
  if (excerpt && excerpt !== '') {
    return excerpt
  }

  if (postContent && postContent !== '') {
    return nWords(postContent, numberWords)
  }
}
