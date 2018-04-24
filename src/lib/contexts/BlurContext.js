// @flow
import * as React from 'react'

const blurDefault: boolean = false
const updateBlur = (newblur: boolean): void => {}

const BlurContext = React.createContext({
  isBlurred: blurDefault,
  updateBlur
})

const BlurProvider = BlurContext.Provider
const BlurConsumer = BlurContext.Consumer

export { BlurProvider, BlurConsumer }
