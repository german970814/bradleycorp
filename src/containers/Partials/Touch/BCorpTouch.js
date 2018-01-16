import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BCorpTouch extends Component {
  constructor (props) {
    super(props)

    this.state = { x: 0, y: 0, dx: 0, dy: 0 }
  }

  touchStart (event) {
    const touchObj = event.changedTouches[0]
    this.setState({
      x: touchObj.clientX,
      y: touchObj.clientY,
      dx: 0,
      dy: 0
    })
  }

  touchMove (event) {
    const touchObj = event.changedTouches[0]
    this.setState(prevState => {
      return {
        x: touchObj.clientX,
        y: touchObj.clientY,
        dx: prevState.dx + (touchObj.clientX - prevState.x),
        dy: prevState.dy + (prevState.y - touchObj.clientY),
      }
    })
  }

  touchEnd (event) {
    this.setState({ x: 0, y: 0, dx: 0, dy: 0 })
  }

  render() {
    return this.props.children(
      this.touchStart.bind(this),
      this.touchMove.bind(this),
      this.touchEnd.bind(this),
      this.state.dx,
      this.state.dy
    )
  }
}

BCorpTouch.propTypes = {
  children: PropTypes.func.isRequired
}

export default BCorpTouch
