import { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'

class ContainerMediaQuery extends Component {
  constructor (props) {
    super(props)

    this.state = { containerClassName: '' }

    this.initUpdateContainerDimensions = this.updateContainerDimensions.bind(this)
    this.updateContainerDimensions = debounce(this.updateContainerDimensions.bind(this), 200)
  }

  componentDidMount () {
    this.initUpdateContainerDimensions()
    window.addEventListener('resize', this.updateContainerDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateContainerDimensions)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.node !== this.props.node) {
      this.updateContainerDimensions()
    }
  }

  updateContainerDimensions () {
    if (this.props.node && this.props.node.offsetWidth) {
      if (this.props.node.offsetWidth < MOBILEMAXWIDTH) {
        this.setState({ containerClassName: 'container-size-mobile' })
      } else if (this.props.node.offsetWidth < TABLETMAXWIDTH) {
        this.setState({ containerClassName: 'container-size-mobile container-size-tablet' })
      } else {
        this.setState({ containerClassName: 'container-size-mobile container-size-tablet container-size-desktop' })
      }
    }
  }

  render () {
    return this.props.children(this.state.containerClassName)
  }
}

ContainerMediaQuery.propTypes = {
  children: PropTypes.func.isRequired,
  node: PropTypes.object
}

export default ContainerMediaQuery
