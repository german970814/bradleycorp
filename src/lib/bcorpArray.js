export function rotate (array, indexToMovetoFront) {
  const newFirst = array.slice(indexToMovetoFront)
  const newEnd = array.slice(0, indexToMovetoFront)

  return [...newFirst, ...newEnd]
}
