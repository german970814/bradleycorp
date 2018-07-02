// @flow
export function nWords (str: string, n: number): string {
  return str
    .split(/\s+/)
    .slice(0, n)
    .join(' ')
}

export function stringIsNumeric (str: string): boolean {
  return str.match(/^[0-9]+$/) !== null
}

export function cleanMetaDescription (metaDescription: string): string {
  return metaDescription.replace(/"/g, "'")
}

export function numberSubstringInstances (
  str: string,
  substring: string
): number {
  return (str.match(new RegExp(substring, 'g')) || []).length
}
