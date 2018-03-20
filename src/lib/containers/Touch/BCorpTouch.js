import { Component } from 'react'
import PropTypes from 'prop-types'

/*
  A wrapper component that handles touch state for its children.
  Allows children to get access to data about touch and swipe events occuring within the children
 */
class BCorpTouch extends Component {
  constructor (props) {
    super(props)

    this.state = { x: 0, y: 0, dx: 0, dy: 0 }
    this.body = document.getElementById('body')
  }

  touchStart (event) {
    // event.preventDefault()
    //
    // would like to use this, but would have to add the event as event listener to the node and set { passive: false }
    // this is an anti pattern in react, so for now the best solution is to add overflow: hidden to body
    this.body.classList.add('prevent-scroll')

    const touchObj = event.changedTouches[0]
    this.setState({
      x: touchObj.clientX,
      y: touchObj.clientY,
      dx: 0,
      dy: 0
    })
  }

  touchMove (event) {
    // event.preventDefault() see above

    const touchObj = event.changedTouches[0]
    this.setState(prevState => {
      return {
        x: touchObj.clientX,
        y: touchObj.clientY,
        dx: prevState.dx + (touchObj.clientX - prevState.x),
        dy: prevState.dy + (prevState.y - touchObj.clientY)
      }
    })
  }

  touchEndCapture (event) {
    // event.preventDefault() see above
    this.body.classList.remove('prevent-scroll')

    // if we swiped then we dont want to call child click or touchEnd events
    // so we stop propagation in the event capture phase
    //
    // if you want to call an onTouchEnd event, call it from onTouchEndCapture BEFORE calling this
    if (this.state.dx !== 0 && this.state.dy !== 0) {
      event.stopPropagation()
    }

    // return state to 0 after touch finishes
    this.setState({ x: 0, y: 0, dx: 0, dy: 0 })
  }

  render () {
    // pass children function an object so we can pick and choose properties we want to use
    const self = this
    return this.props.children({
      touchStart: self.touchStart.bind(self),
      touchMove: self.touchMove.bind(self),
      touchEndCapture: self.touchEndCapture.bind(self),
      dx: self.state.dx,
      dy: self.state.dy
    })
  }
}

BCorpTouch.propTypes = {
  children: PropTypes.func.isRequired
}

export default BCorpTouch
