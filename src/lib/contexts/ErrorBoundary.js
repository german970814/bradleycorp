import * as React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error)
    console.log( info )
  }

  render() {
    if (this.state.hasError) {
      if ( this.props.defaultUI && 'function' === typeof this.props.defaultUI ) {
        return this.props.defaultUI()
      } else {
        return <h3>Something went wrong.</h3>
      }
    }
    return this.props.children;
  }
}