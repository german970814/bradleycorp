// @flow
import * as React from 'react'

type OptionsType = {
  [string]: any,
  shared: {
    [string]: any
  }
}

const options: OptionsType = {
  shared: {}
}

const OptionsContext = React.createContext({
  options
})

const OptionsProvider = OptionsContext.Provider
const OptionsConsumer = OptionsContext.Consumer

export function withOptions<Props: {}> (
  Component: React.ComponentType<Props>
): React.ComponentType<
  $Diff<
    Props,
    {
      options: OptionsType | void
    }
  >
> {
  return function WithOptions (props: Props) {
    return (
      <OptionsConsumer>
        {({ options }) => {
          return <Component {...props} options={options} />
        }}
      </OptionsConsumer>
    )
  }
}

export { OptionsProvider, OptionsConsumer }
export type { OptionsType }
