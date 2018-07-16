// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpCustomPage } from '../../../types/customPage_types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { getUrlWithoutPageParam } from '../../../bcorpUrl'
import { validChain } from '../../../bcorpObject'
import ContentTransformer from '../../../components/ContentTransformer/ContentTransformer'
import Error404 from '../../../components/Error/Error404/Error404'
import Loading from '../../../components/Loading/Loading'
import TemplateFactory from '../../Templates/TemplateFactory'
import ModuleBuilder from '../../Modules/ModuleBuilder'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import BCorpHead from '../../../components/BCorpHead/BCorpHead'
import style from './Customizable.scss'

/**
 * The Customizable component is designed to render the 'Pages' post type
 * from the CMS.
 *
 * If the route makes it to the end of the router without a match,
 * the whole route will be sent to the page/custom-page endpoint
 * as the 'path' parameter.
 *
 * If a page exists with that path, then we will get the data,
 * otherwise we get a 404.
 *
 * Given that data, there are 4 stages to rendering a customizable page
 * which potentially could include
 * modules, widgets and a page template which needs input from various metaboxes.
 *
 * 1. Make network request for the page data (This file)
 * 2. Render the page template with page meta (via the TemplateFactory)
 * 2. Build module grid structure to be in line with the backend UI
 *    (via the ModuleBuilder)
 * 3. Build widgets
 *    (via the WidgetBuilder)
 *
 * This component deals with making the page network request
 * and combining the various resulting elements.
 *
 * This is also level at which we apply the global styling for the module grid
 *
 */

type Props = {
  match: Match
}

type State = BCorpCustomPage & {
  requesting: boolean,
  ready: boolean
}

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
   * If we go between urls that both render a customizable page,
   * we need to make sure we're making a new network request
   * and running the builds again
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
    if (!this.state.ready) {
      return <Loading />
    }

    // no need to pass through the module builder if we have no modules
    if (
      !this.state.module_data.rows ||
      this.state.module_data.rows.length === 0
    ) {
      return (
        <ContentTransformer content={this.state.module_data.content || ''} />
      )
    }

    return (
      <ModuleBuilder
        moduleData={this.state['module_data']}
        pagePath={this.props.match.url}
      />
    )
  }

  /**
   * Note we pass the react router slug through
   * This lets us know when to rerun the ModuleBuilder and set htmlIsSet back to False
   *
   * @return {void}
   */
  render () {
    console.log(this.state)

    if (this.state.requesting) {
      return <Loading pageSize />
    }

    if (this.state['page_template_data']['page_id'] === 0) {
      return <Error404 />
    }

    // currently defaults to page title
    const pageTitle =
      (this.state.page_template_data.metaboxes &&
        this.state.page_template_data.metaboxes.page_meta &&
        this.state.page_template_data.metaboxes.page_meta.title) ||
      this.state.page_template_data.page_title ||
      ''
    const pageDescription =
      (this.state.page_template_data.metaboxes &&
        this.state.page_template_data.metaboxes.page_meta &&
        this.state.page_template_data.metaboxes.page_meta.description) ||
      ''

    return (
      <div className={style.customizable}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <TemplateFactory
          templateSlug={this.state['page_template_data'].template}
          data={this.state['page_template_data']}
          pagePath={this.props.match.url}
          renderModules={this.renderModules.bind(this)}
          renderRightSidebarWidgets={this.renderRightSidebarWidgets.bind(this)}
        />
      </div>
    )
  }

  /**
   * We use the page path in the current route to request the page
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

      return this.setState(newState, () => {
        if (this.state.page_template_data.page_title) {
          document.title = `Bradley Corp: ${
            this.state.page_template_data.page_title
          }`
        } else {
          document.title = 'Bradley Corp'
        }
      })
    } catch (err) {
      this.setState({
        requesting: false,
        ready: false,
        page_template_data: this.defaultState.page_template_data
      })
      console.log(err)
    }
  }
}

export default Customizable
