export function validChain (object, ...keys) {
  return keys.reduce((a, b) => (a || { })[ b ], object) !== undefined
}
