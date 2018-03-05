import React, { Component } from 'react'
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
 */
class BCorpModule extends Component {
  constructor (props, localStyle, moduleName) {
    super(props)

    this.state = {
      node: undefined
    }

    this.moduleName = moduleName
    this.localStyle = localStyle

    /**
     * Class name to give to the module allowing us to write scss responsding to the container
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
    if (!this.passesValidation()) {
      return (
        <div
          ref={(node) => {
            if (!this.state.node) {
              this.setState({ node })
            }
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
        className={`${moduleStyle.module} ${this.localStyle[this.moduleName]}`} >

        <ContainerMediaQuery
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
}

export default BCorpModule
