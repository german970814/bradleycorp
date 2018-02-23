import { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'

/**
 * Allows components to respond to a container's size rather than just the window.
 *
 * We pass as props the a node ref for the container we'd like to respond to
 * and a render function as children which will receive a class name and size variable
 * which change in response to the container's size
 */
class ContainerMediaQuery extends Component {
  constructor (props) {
    super(props)

    this.state = { containerClassName: '', size: '' }

    this.initUpdateContainerDimensions = this.updateContainerDimensions.bind(this)
    this.updateContainerDimensions = debounce(this.updateContainerDimensions.bind(this), 200)
  }

  /**
   * Currently we can only support updating the container size in response to a change in the whole window
   * This isnt very useful for when the DOM changes for other reasons,  eg a new network request is made
   *
   * Google have released this ResizeObserver class
   * but so far it doesnt support the browsers we need, and it is not 100% polyfillable
   *
   * @see https://developers.google.com/web/updates/2016/10/resizeobserver
   */
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
        this.setState({ containerClassName: 'container-size-mobile', size: 'mobile' })
      } else if (this.props.node.offsetWidth < TABLETMAXWIDTH) {
        this.setState({ containerClassName: 'container-size-mobile container-size-tablet', size: 'tablet' })
      } else {
        this.setState({ containerClassName: 'container-size-mobile container-size-tablet container-size-desktop', size: 'desktop' })
      }
    }
  }

  render () {
    return this.props.children(this.state.containerClassName, this.state.size)
  }
}

ContainerMediaQuery.propTypes = {
  children: PropTypes.func.isRequired,
  node: PropTypes.object
}

export default ContainerMediaQuery
