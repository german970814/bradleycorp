import { Component } from 'react'
import PropTypes from 'prop-types'

class AutoGrowShrinkAnimation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentWillUpdate () {
    const oldHeight = `${this.node.clientHeight}px`

    requestAnimationFrame(() => {
      this.node.style.transform = 'translateZ(0)' // adds hardware acceleration to the animation - improves quality
      this.node.style.height = 'auto'
      this.node.style.transition = 'height 0s'

      const newHeight = `${this.node.getBoundingClientRect().height}px`

      this.node.style.height = oldHeight
      this.node.style.transition = 'height 0s'

      requestAnimationFrame(() => {
        this.node.style.height = newHeight
        this.node.style.transition = `height ${this.props.speed || 600}ms ${this.props.easing || 'linear'}`
      })
    })
  }

  updateNode (node) {
    if (node && this.node !== node) {
      this.node = node
    }
  }

  openClose () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return this.props.children(this.state.isOpen, this.updateNode.bind(this), this.openClose.bind(this))
  }
}

AutoGrowShrinkAnimation.propTypes = {
  children: PropTypes.func.isRequired,
  easing: PropTypes.string,
  speed: PropTypes.number
}

export default AutoGrowShrinkAnimation
