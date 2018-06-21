// @flow
export function rotate (array: Array<any>, indexToMovetoFront?: number) {
  const newFirst = array.slice(indexToMovetoFront)
  const newEnd = array.slice(0, indexToMovetoFront)

  return [...newFirst, ...newEnd]
}

export function arraysAreEqual (array1: Array<any>, array2: Array<any>) {
  if (!array1 || !array2) {
    return false
  }

  if (array1.length !== array2.length) {
    return false
  }

  for (var i = 0, len = array1.length; i < len; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array1[i].equals(array2[i])) {
        return false
      }
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}

export function clean (array: Array<any>, deleteValue: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === deleteValue) {
      array.splice(i, 1)
      i--
    }
  }
  return array
}

export function cleanWithRegex (array: Array<any>, regex: string) {
  for (let i = 0; i < array.length; i++) {
    if (regex.match(array[i])) {
      array.splice(i, 1)
      i--
    }
  }
  return array
}

export function sortAlphabeticallyArrayOfObjects (
  // note sortByKey should be the same as S, flow wouldnt let me enforce that
  sortByKey: string,
  arrayOfObjects: Array<{
    [string]: string
  }>
): Array<{
  [string]: string
}> {
  return arrayOfObjects.sort((a, b) => {
    const valA = a[sortByKey].toUpperCase()
    const valB = b[sortByKey].toUpperCase()

    return valA < valB ? -1 : valA > valB ? 1 : 0
  })
}

export function sortAlphabeticallyArrayOfTwoLevelObjects (
  // note sortByKey should be the same as S, flow wouldnt let me enforce that
  sortByKey: string,
  sortByKeySecondLevel: string,
  arrayOfObjects: Array<{
    [string]: {
      [string]: string
    }
  }>
): Array<{
  [string]: {
    [string]: string
  }
}> {
  return arrayOfObjects.sort((a, b) => {
    const valA = a[sortByKey][sortByKeySecondLevel].toUpperCase()
    const valB = b[sortByKey][sortByKeySecondLevel].toUpperCase()

    return valA < valB ? -1 : valA > valB ? 1 : 0
  })
}
