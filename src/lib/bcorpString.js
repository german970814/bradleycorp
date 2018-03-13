export function nWords (string, n) {
  return string.split(/\s+/).slice(0, n).join(' ')
}

export function stringIsNumeric (string) {
  return string.match(/^[0-9]+$/) !== null
}
