import { nWords } from './bcorpString'

export function isNew (date) {
  const newUntil = new Date(date)
  const now = new Date()
  return newUntil - now > 0
}

export function getExcerpt (excerpt, postContent, numberWords) {
  const defaultExcerptLength = 22

  if (excerpt && excerpt !== '') {
    if (numberWords && numberWords !== 0) {
      return nWords(excerpt, numberWords)
    } else {
      return excerpt
    }
  } else

  if (postContent && postContent !== '') {
    return nWords(postContent, numberWords || defaultExcerptLength)
  }
}
