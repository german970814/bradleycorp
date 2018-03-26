export function validChain (object, ...keys) {
  return keys.reduce((a, b) => (a || { })[ b ], object) !== undefined
}

export function objectIsEmpty (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
