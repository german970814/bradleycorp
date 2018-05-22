// @flow
import * as React from 'react'

type ScreenSize = 'mobile' | 'tablet' | 'desktop'

const screenSize: ScreenSize = 'mobile'

const ScreenSizeContext = React.createContext({
  screenSize
})

export function withScreenSize<Props: {}> (
  Component: React.ComponentType<Props>
): React.ComponentType<
  $Diff<
    Props,
    {
      screenSize: ScreenSize | void
    }
  >
> {
  return function WithScreenSize (props: Props) {
    return (
      <ScreenSizeConsumer>
        {({ screenSize }) => {
          return <Component {...props} screenSize={screenSize} />
        }}
      </ScreenSizeConsumer>
    )
  }
}

const ScreenSizeProvider = ScreenSizeContext.Provider
const ScreenSizeConsumer = ScreenSizeContext.Consumer

export { ScreenSizeProvider, ScreenSizeConsumer }
export type { ScreenSize }
