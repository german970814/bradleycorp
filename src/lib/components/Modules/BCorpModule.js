import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import ContainerMediaQuery from '../../containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from './Modules.scss'

/**
 *
 * This is the master parent module for all Modules and Widgets.
 *
 * Here we manage the information that the module receives about its' container
 * A module will have access to this.size and this.containerClassName
 * See below the values they will take
 * These are set before the first call of renderModule
 *
 * A child module MUST implement a renderModule function.
 * The passesValidation function is optional
 *
 * We have a few render cycles to run since each module needs information from the DOM:
 *
 * Cycle 1: Register the module's HTML in the DOM - we get the DOM node and set it as state
 *          Make any network requests in componentDidMount
 *
 * Cycle 2: Now with knowledge of the DOM, we get the container size and render the module markup
 *          At this point module is rendered with data
 *          We request another cycle in componentDidUpdate to get the correct row height
 *
 * Cycle 3+: Cycles again updating row height until the component is no longer updating
 *
 */
class BCorpModule extends Component {
  constructor (props, localStyle, moduleName) {
    super(props)

    this.state = {
      node: undefined,
      minHeight: 0
    }

    this.moduleName = moduleName
    this.localStyle = localStyle

    /**
     * Class name to give to the module allowing us to write scss responding to the container
     *
     * mobile size: 'container-size-mobile'
     * tabelt size: 'container-size-mobile container-size-tablet'
     * desktop size: 'container-size-mobile container-size-tablet container-size-desktop'
     *
     * Note that when container size increases we keep the previous size's classes.
     * This allows us to just override mobile style for tablet and desktop, as we normally do with media requests
     *
     * @type {String}
     */
    this.containerClassName = ''

    /**
     * the current size of the module's container
     * '', 'mobile', 'tablet' or 'desktop'
     * @type {String}
     */
    this.size = ''

    /**
     * Add this class to any elements you want to be affected by different accent colours
     *
     * This gets set when component props update
     *
     * @type {String}
     */
    this.accentColorClass = ''

    /**
     * Add this class to any elements you want to be affected by different skin types
     *
     * This gets set when component props update
     *
     * @type {String}
     */
    this.skinClass = ''

    /**
     * Bind our height updating methods to the class so we can add them to the resize listener
     */
    this.initUpdateModuleHeight = this._updateModuleHeight.bind(this)
    this.updateModuleHeight = debounce(this._updateModuleHeight.bind(this), 200)
  }

  /**
   * Make sure to run this in children if they also implement a componentDidMount method
   *
   * We listen for an event which is specific to each module's row
   * If one module updates in the row, we want them to all recheck their heights
   */
  componentDidMount () {
    this.setAccentColourClass(this.props)
    this.setSkinClass(this.props)

    // eg event name update-row-1
    this.rowUpdateEventName = `update-row-${this.props.rowNode.getAttribute('data-row-id')}`
    this.rowUpdateEvent = new CustomEvent(this.rowUpdateEventName)

    window.addEventListener(this.rowUpdateEventName, this.updateModuleHeight)
    window.addEventListener('resize', this.updateModuleHeight)
  }

  /**
   * Make sure to run this in children if they also implement a componentWillUnmount method
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateModuleHeight)
    window.removeEventListener(this.rowUpdateEventName, this.updateModuleHeight)
  }

  /**
   * Make sure to run this in children if they also implement a componentWillReceiveProps method
   */
  componentWillReceiveProps (nextProps) {
    this.setAccentColourClass(nextProps)
    this.setSkinClass(nextProps)
  }

  /**
   * Make sure to run this in children if they also implement a componentDidUpdate method
   *
   * If the module has updated, we need to let the other modules in the row know so they can recheck their heights
   * We dispatch an event that will only be listened for by other modules in the row
   *
   */
  componentDidUpdate () {
    this.updateModuleHeight()
    window.dispatchEvent(this.rowUpdateEvent)
  }

  /**
   * The most important thing about this function is that it only updates the state if it needs to
   * If not, it'll lead to an infinite loop.
   */
  _updateModuleHeight () {
    if (!this.state.node) {
      return
    }

    const rowHeight = this.props.rowNode.offsetHeight
    const moduleHeight = this.state.node.offsetHeight

    // we won't need to update the height if the module is full width
    // we just need to make sure the minHeight returns to (or already is) 0
    if (this.state.node.offsetWidth === window.innerWidth) {
      if (this.state.minHeight !== 0) {
        return this.setState({ minHeight: 0 })
      }
    } else if (moduleHeight < rowHeight) {
      return this.setState({ minHeight: rowHeight })
    }
  }

  /**
   * Children must implement their own render function to override this
   * This is where you will put the JSX and render logic for the module
   *
   * In a module class, treat this function as render,
   * then just return super.render() in the actual render function
   *
   * @return {[null]} null
   */
  renderModule () { return null }

  /**
   *
   * If the module doesnt pass its' validation, we still render the minimum necessary to register the DOM node
   *
   * The reason for this is that if the module is making a network request,
   * it's likely to fail validation on its' first render
   * This way when the module receives its' data and re renders,
   * it's already in the DOM with the information about its' container set.
   * This saves us an extra render cycle.
   *
   * Notice the main module wrapper has a shared module className where we can add global module styles
   *
   */
  render () {
    // this will be called for the first render
    if (!this.passesValidation() || !this.state.node) {
      return (
        <div
          ref={(node) => {
            if (!this.state.node) {
              this.setState({ node })
            }
          }}
          style={{
            minHeight: this.state.minHeight
          }}
          className={`${moduleStyle.module} ${this.localStyle[this.moduleName]}`} />
      )
    }

    return (
      <div
        ref={(node) => {
          if (!this.state.node) {
            this.setState({ node })
          }
        }}
        style={{
          minHeight: this.state.minHeight
        }}
        className={`${moduleStyle.module} ${this.localStyle[this.moduleName]}`} >

        <ContainerMediaQuery
          minHeight={this.state.minHeight}
          node={this.state.node} >
          {(containerClassName, size) => {
            this.containerClassName = containerClassName
            this.size = size

            return this.renderModule()
          }}
        </ContainerMediaQuery >

      </div>
    )
  }

  /**
   * Here we can check state, props, and other class variables to decide if the module should render
   *
   * This function is run right at the start of the main render method
   *
   * Returning true will run the main render method
   * Returning false will still render, but just the minimum necessary to register the DOM node and get the container size
   *
   * @return {[boolean]} Should the module render
   */
  passesValidation () {
    return true
  }

  setAccentColourClass (props) {
    this.accentColorClass = props.accentColor ? `module-accent-color-${props.accentColor}` : ''
  }

  setSkinClass (props) {
    this.skinClass = props.skin ? `module-skin-${props.skin}` : ''
  }
}

BCorpModule.propTypes = {
  /**
   * Determines main colour theme of module elements
   *
   * one of 'orange', 'green', 'blue', 'brown' or 'none'
   *
   * note: default will be brown for all modules
   *
   * @type {[string]}
   */
  accentColor: PropTypes.string,
  /**
   * Colour of the background, determines wether text should be white or black
   * eg light => white background so black text
   *
   * one of 'light', 'dark' or 'none'.
   * default to light
   *
   * @type {[string]}
   */
  skin: PropTypes.string,
  /**
   * Each module needs access to information about its' containing row
   * From this we're able to make sure they all have the same height
   *
   * @type {[object]}
   */
  rowNode: PropTypes.object.isRequired
}

export default BCorpModule
