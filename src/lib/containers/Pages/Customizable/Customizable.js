// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpCustomPage } from '../../../types/customPage_types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../bcorpObject'
import TemplateFactory from '../../Templates/TemplateFactory'
import ModuleBuilder from '../../Modules/ModuleBuilder'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import style from './Customizable.scss'

type Props = {
  match: Match
}

type State = BCorpCustomPage

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
class Customizable extends Component<Props, State> {
  defaultState: BCorpCustomPage

  constructor (props: Props) {
    super(props)

    this.defaultState = {
      module_data: {
        content: '',
        rows: []
      },
      widget_data: {},
      page_template_data: {
        page_id: 0,
        page_title: 'Loading..',
        template: 'default',
        metaboxes: false,
        featured_image: false,
        has_parent: false,
        has_children: false
      }
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    if (!validChain(this.props, 'match', 'params', 'slug')) {
      return
    }

    const { match } = this.props
    this.getPage(match)
  }

  /**
   * If we go between urls that both render a customizable page, we need to make sure we're making a new network request
   *
   * @param  {[object]} nextProps
   * @return {[void]}
   */
  componentWillReceiveProps (nextProps: Props) {
    if (
      !validChain(this.props, 'match', 'url') ||
      !validChain(nextProps, 'match', 'url')
    ) {
      console.warn(`url invalid for match: `, nextProps.match)
      return
    }

    if (nextProps.match.url !== this.props.match.url) {
      this.getPage(nextProps.match)
    }
  }

  renderRightSidebarWidgets () {
    const metaboxes = this.state['page_template_data'].metaboxes
    if (metaboxes) {
      const selectedSidebar = metaboxes['sidebar_select']

      return selectedSidebar && this.state['widget_data'][selectedSidebar] ? (
        <WidgetBuilder
          widgetArea={metaboxes['sidebar_select']}
          widgetData={this.state['widget_data'][selectedSidebar]}
          pageSlug={this.props.match.params.slug}
        />
      ) : null
    }
  }

  /**
   * Note we pass the react router slug through
   * This lets us know when to rerun the ModuleBuilder and set htmlIsSet back to False
   *
   * @return {[void]}
   */
  render () {
    if (!this.state['page_template_data']['page_id'] === 0) {
      return null
    }

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
          renderRightSidebarWidgets={this.renderRightSidebarWidgets.bind(this)}
        />
      </div>
    )
  }

  /**
   * We use the page slug in the url to request the correct page data
   *
   * @param  {[string]}  match React-Router match object
   */
  async getPage (match: Match) {
    try {
      const customPageAPIClient = new CustomPageApiClient()
      // only other alternative for custom page route is '/*/:slug'
      // so we have to get by path
      const page =
        match.path === '/:slug'
          ? await customPageAPIClient.getBySlug(match.params.slug)
          : await customPageAPIClient.getByPath(match.url)

      const pageData: BCorpCustomPage = page.data

      // set state leaving defaults where there exists no data in the request
      return this.setState(Object.assign({}, this.defaultState, pageData))
    } catch (err) {
      console.log(err)
    }
  }
}

export default Customizable
