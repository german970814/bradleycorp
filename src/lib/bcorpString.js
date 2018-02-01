export function nWords (string, n) {
  return string.split(/\s+/).slice(0, n).join(' ')
}
