export function isNew (date) {
  const newUntil = new Date(date)
  const now = new Date()
  return newUntil - now > 0
}
