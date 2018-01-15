import { Component } from 'react'
import PropTypes from 'prop-types'

class AutoGrowShrinkAnimation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      node: undefined,
      isOpen: false
    }
  }

  componentDidUpdate (prevProps) {
    const oldHeight = `${this.state.node.clientHeight}px`

    requestAnimationFrame(() => {
      this.state.node.style.height = 'auto'
      this.state.node.style.transition = 'height 0s'

      const newHeight = `${this.state.node.getBoundingClientRect().height}px`

      this.state.node.style.height = oldHeight
      this.state.node.style.transition = 'height 0s'

      requestAnimationFrame(() => {
        this.state.node.style.height = newHeight
        this.state.node.style.transition = `height ${this.props.speed || 600}ms ${this.props.easing || 'linear'}`
      })
    })
  }

  updateNode (node) {
    if (node && this.state.node !== node) {
      this.setState({ node })
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
