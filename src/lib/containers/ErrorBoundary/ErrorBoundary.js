import * as React from 'react'
import Error500 from '../../components/Error/Error500/Error500'

type Props = {
  defaultUI?: mixed,
  children: mixed
}

export default class ErrorBoundary extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    console.error(error)
    console.log(info)
  }

  render () {
    if (this.state.hasError) {
      if (this.props.defaultUI && typeof this.props.defaultUI === 'function') {
        return this.props.defaultUI()
      } else {
        return <Error500 />
      }
    }
    return this.props.children
  }
}
