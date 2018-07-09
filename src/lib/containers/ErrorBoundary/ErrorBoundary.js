import * as React from 'react'
import Error500 from '../../components/Error/Error500/Error500'

/**
 * As recommended by React...
 * @see https://reactjs.org/docs/error-boundaries.html
 *
 * We can place this anywhere in the tree,
 * and if any descendant components throw an error
 * we catch it here and display an error UI.
 *
 * This stops the app from crashing,
 * and allows us to handle errors as granularly as is required.
 */

type Props = {
  /**
   * A render function to run when an error is caught
   */
  defaultUI?: () => React.Node,
  children: React.Node
}

export default class ErrorBoundary extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    console.error(error)
    console.log(info)
  }

  /**
   * Default the error to a 500
   */
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
