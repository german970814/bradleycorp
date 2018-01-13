import { Component } from 'react'
import PropTypes from 'prop-types'

class AutoGrowShrinkAnimation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate (prevProps) {
    const oldHeight = `${this.props.node.clientHeight}px`

    requestAnimationFrame(() => {
      this.props.node.style.height = 'auto'
      this.props.node.style.transition = 'height 0s'

      const newHeight = `${this.props.node.getBoundingClientRect().height}px`

      this.props.node.style.height = oldHeight
      this.props.node.style.transition = 'height 0s'

      requestAnimationFrame(() => {
        this.props.node.style.height = newHeight
        this.props.node.style.transition = `height ${this.props.speed || 600}ms ${this.props.easing || 'linear'}`
      })
    })
  }

  openClose () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return this.props.children(this.state.isOpen, this.openClose.bind(this))
  }
}

AutoGrowShrinkAnimation.propTypes = {
  node: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  easing: PropTypes.string,
  speed: PropTypes.number
}

export default AutoGrowShrinkAnimation
