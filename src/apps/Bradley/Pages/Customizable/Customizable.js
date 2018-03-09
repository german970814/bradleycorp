import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../../lib/bcorpObject'
import ModuleBuilder from './ModuleBuilder'
import style from './Customizable.scss'

/**
 *
 * There are 4 stages to rendering a customizable page with modules and widgets
 *
 * 1. Make network request for the page data (This file)
 * 2. Build module grid structure to be in line with the backend UI (ModuleBuilder.js)
 * 3. Build widgets
 * 4. Render the page template with page meta, modules and widgets in the correct position
 *    (TemplateFactory.js and resulting template files)
 *
 * This component deals with making the page network request
 * This is also level at which we apply the global styling for the module grid
 *
 */
class Customizable extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      'module_data': {
        content: '',
        rows: []
      },
      'page_template_data': {}
    }

    this.state = this.defaultState
  }

  /**
   * Make the intial network request before first render
   */
  componentDidMount () {
    if (!validChain(this.props, 'match', 'params', 'slug')) {
      return
    }

    const { slug } = this.props.match.params
    this.getPage(slug)
  }

  /**
   * If we go between urls that both render a customizable page, we need to make sure we're making a new network request
   * @param  {[object]} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (!validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPage(nextProps.match.params.slug)
    }
  }

  render () {
    return (
      <div className={style.customizable} >
        <ModuleBuilder pageData={this.state} />
      </div>
    )
  }

  /**
   * We use the page slug in the url to request the correct page data
   *
   * @param  {[string]}  slug page slug from url
   */
  async getPage (slug) {
    try {
      const customPageAPIClient = new CustomPageApiClient()
      const page = await customPageAPIClient.getBySlug(slug)
      const pageData = page.data

      // set state leaving defaults where there exists no data in the request
      return this.setState(Object.assign({}, this.defaultState, pageData))
    } catch (err) {
      console.log(err)
    }
  }
}

Customizable.propTypes = {
  match: PropTypes.object.isRequired
}

export default Customizable
