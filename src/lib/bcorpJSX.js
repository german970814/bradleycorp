// @flow
import * as React from 'react'

export function sortIntoRows (
  elements: Array<React.Node>,
  numInEachRow: number
) {
  let newElementsArray = []
  const length = elements.length

  for (let i = 0; i < Math.ceil(length / numInEachRow) + 1; i++) {
    const to = numInEachRow > elements.length ? elements.length : numInEachRow
    const wrapElements = elements.splice(0, to)

    newElementsArray = [
      ...newElementsArray,
      <div key={i} className={'row'}>
        {wrapElements}
      </div>
    ]
  }

  return newElementsArray
}
