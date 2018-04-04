import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../bcorpObject'
import TemplateFactory from '../../Templates/TemplateFactory'
import ModuleBuilder from '../../Modules/ModuleBuilder'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
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
      module_data: {
        content: '',
        rows: []
      },
      widget_data: {
        right_sidebar: []
      },
      page_template_data: {
        template: ''
      }
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    if (!validChain(this.props, 'match', 'params', 'slug')) {
      return
    }

    const { slug } = this.props.match.params
    this.getPage(slug)
  }

  /**
   * If we go between urls that both render a customizable page, we need to make sure we're making a new network request
   *
   * @param  {[object]} nextProps
   * @return {[void]}
   */
  componentWillReceiveProps (nextProps) {
    if (
      !validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')
    ) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPage(nextProps.match.params.slug)
    }
  }

  /**
   * Note we pass the react router slug through
   * This lets us know when to rerun the ModuleBuilder and set htmlIsSet back to False
   *
   * @return {[void]}
   */
  render () {
    return (
      <div className={style.customizable}>
        <TemplateFactory
          templateSlug={this.state['page_template_data'].template}
          data={this.state['page_template_data']}
          pageSlug={this.props.match.params.slug}
          renderModules={() => {
            return (
              <ModuleBuilder
                moduleData={this.state['module_data']}
                pageSlug={this.props.match.params.slug}
              />
            )
          }}
          renderRightSidebarWidgets={() => {
            if (
              !validChain(
                this.state['page_template_data'].metaboxes['sidebar_select']
              )
            ) {
              return null
            } else {
              const selectedSidebar = this.state['page_template_data']
                .metaboxes['sidebar_select']
              return (
                <WidgetBuilder
                  widgetArea={
                    this.state['page_template_data'].metaboxes['sidebar_select']
                  }
                  widgetData={this.state['widget_data'][selectedSidebar]}
                  pageSlug={this.props.match.params.slug}
                />
              )
            }
          }}
        />
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
