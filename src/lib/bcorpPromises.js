const bcorpPromises = {}

bcorpPromises.allowRejections = arrayOfPromises => {
  return arrayOfPromises.map(promise => promise.catch(() => undefined))
}

bcorpPromises.unwrapArrayOfResolvedPromisesReturningArrays = arrayOfResolvedPromises => {
  let flatArray = []
  arrayOfResolvedPromises.forEach(promise => {
    if (!promise) {
      return
    }

    promise.data.forEach(arrayItem => {
      flatArray = [ ...flatArray, arrayItem ]
    })
  })
  return flatArray
}

module.exports = bcorpPromises
