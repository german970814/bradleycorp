// @flow
import * as React from 'react'

type UpdateBlurType = (newblur: boolean) => void

const blurDefault: boolean = false
const updateBlur: UpdateBlurType = newblur => {}

const BlurContext = React.createContext({
  isBlurred: blurDefault,
  updateBlur
})

const BlurProvider = BlurContext.Provider
const BlurConsumer = BlurContext.Consumer

export { BlurProvider, BlurConsumer }
export type { UpdateBlurType }
