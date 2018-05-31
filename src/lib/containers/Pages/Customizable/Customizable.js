// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpCustomPage } from '../../../types/customPage_types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { getUrlWithoutPageParam } from '../../../bcorpUrl'
import { validChain } from '../../../bcorpObject'
import Loading from '../../../components/Loading/Loading'
import TemplateFactory from '../../Templates/TemplateFactory'
import ModuleBuilder from '../../Modules/ModuleBuilder'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import style from './Customizable.scss'
import ErrorBoundary from '../../../contexts/ErrorBoundary'

type Props = {
  match: Match
}

type State = BCorpCustomPage & {
  requesting: boolean,
  ready: boolean
};

/**
 *
 * There are 4 stages to rendering a customizable page with modules and widgets
 *
 * 1. Make network request for the page data (This file)
 * 2. Render the page template with page meta
 * 2. Build module grid structure to be in line with the backend UI (ModuleBuilder.js)
 * 3. Build widgets
 *
 * This component deals with making the page network request
 * This is also level at which we apply the global styling for the module grid
 *
 */
class Customizable extends Component<Props, State> {
  defaultState: State

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
      },
      requesting: false,
      ready: false
    }

    this.state = this.defaultState
  }

  componentWillMount () {
    if (!this.props.match) {
      return
    }

    this.getPage(this.props.match)
  }

  /**
   * If we go between urls that both render a customizable page, we need to make sure we're making a new network request
   *
   * @param  {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps (nextProps: Props) {
    if (
      !validChain(this.props, 'match', 'url') ||
      !validChain(nextProps, 'match', 'url')
    ) {
      console.warn(`url invalid for match: `, nextProps.match)
      return
    }

    if (
      getUrlWithoutPageParam(nextProps.match) !==
      getUrlWithoutPageParam(this.props.match)
    ) {
      this.getPage(nextProps.match)
    }
  }

  renderRightSidebarWidgets () {
    const metaboxes = this.state['page_template_data'].metaboxes
    if (metaboxes) {
      const selectedSidebar = metaboxes['sidebar_select']

      if (!selectedSidebar || !this.state['widget_data'][selectedSidebar]) {
        return
      }

      return this.state.ready ? (
        <WidgetBuilder
          widgetArea={metaboxes['sidebar_select']}
          widgetData={this.state['widget_data'][selectedSidebar]}
          pagePath={this.props.match.url}
          twoColsOnTablet
        />
      ) : (
        <Loading />
      )
    }
  }

  renderModules () {
    return this.state.ready ? (
      <ModuleBuilder
        moduleData={this.state['module_data']}
        pagePath={this.props.match.url}
      />
    ) : (
      <Loading />
    )
  }

  /**
   * Note we pass the react router slug through
   * This lets us know when to rerun the ModuleBuilder and set htmlIsSet back to False
   *
   * @return {void}
   */
  render () {
    // console.log( this.state )
    if (this.state['page_template_data']['page_id'] === 0) {
      return null
    }

    return (
      <div className={style.customizable}>
      <ErrorBoundary>
        <TemplateFactory
          templateSlug={this.state['page_template_data'].template}
          data={this.state['page_template_data']}
          pagePath={this.props.match.url}
          renderModules={this.renderModules.bind(this)}
          renderRightSidebarWidgets={this.renderRightSidebarWidgets.bind(this)}
        />
      </ErrorBoundary>
      </div>
    )
  }

  /**
   * We use the page slug in the url to request the correct page data
   *
   * @param  {string}  match React-Router match object
   */
  async getPage (match: Match) {
    try {
      this.setState({ requesting: true, ready: false })
      const customPageAPIClient = new CustomPageApiClient()

      // remove page paramter from url
      const url = getUrlWithoutPageParam(match)

      const page = await customPageAPIClient.getByPath(url)

      const pageData: BCorpCustomPage = page.data

      // set state leaving defaults where there exists no data in the request
      const newState = Object.assign({}, this.defaultState, pageData)
      newState.ready = true
      newState.requesting = false

      return this.setState(newState)
    } catch (err) {
      this.setState({ requesting: false, ready: false })
      console.log(err)
    }
  }
}

export default Customizable
