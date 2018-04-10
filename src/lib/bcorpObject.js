// @flow

export function validChain (object: {}, ...keys: Array<string>): boolean {
  return keys.reduce((a, b) => (a || {})[b], object) !== undefined
}

export function objectIsEmpty (obj: {}): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
