export function rotate (array, indexToMovetoFront) {
  const newFirst = array.slice(indexToMovetoFront)
  const newEnd = array.slice(0, indexToMovetoFront)

  return [...newFirst, ...newEnd]
}

export function arraysAreEqual (array1, array2) {
  if (!array1 || !array2) { return false }

  if (array1.length !== array2.length) { return false }

  for (var i = 0, len = array1.length; i < len; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array1[i].equals(array2[i])) { return false }
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}
