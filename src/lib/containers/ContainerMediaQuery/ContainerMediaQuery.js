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

    this.defaultState = { width: 0 }
    this.state = Object.assign({}, this.defaultState, this.props.node.offsetWidth)

    this.initUpdateWidth = this.updateWidth.bind(this)
    this.updateWidth = debounce(this.updateWidth.bind(this), 200)
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
    window.addEventListener('resize', this.updateWidth)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWidth)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.node !== this.props.node) {
      this.updateWidth()
    }
  }

  updateWidth () {
    this.setState({ width: this.props.node.offsetWidth })
  }

  getContainerSize () {
    if (this.props.node.offsetWidth < MOBILEMAXWIDTH) {
      return { containerClassName: 'container-size-mobile', size: 'mobile' }
    } else if (this.props.node.offsetWidth < TABLETMAXWIDTH) {
      return { containerClassName: 'container-size-mobile container-size-tablet', size: 'tablet' }
    } else {
      return { containerClassName: 'container-size-mobile container-size-tablet container-size-desktop', size: 'desktop' }
    }
  }

  render () {
    const { containerClassName, size } = this.getContainerSize()
    return this.props.children(containerClassName, size)
  }
}

ContainerMediaQuery.propTypes = {
  children: PropTypes.func.isRequired,
  node: PropTypes.object.isRequired
}

export default ContainerMediaQuery
