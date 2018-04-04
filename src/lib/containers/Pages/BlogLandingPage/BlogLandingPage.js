// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../types/post_types'
import type { Widget } from '../../Widgets/widget_types'
import { validChain } from '../../../bcorpObject'
import { site, sitePrettyName } from '../../../../api'
import BIMRevitClient from '../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../api/theWashfountain_client'
import WidgetsClient from '../../../../api/widgets_client'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import RightSidebarTemplate from '../../Templates/RightSidebarTemplate/RightSidebarTemplate'
import Posts from './Posts/Posts'
import style from './BlogLandingPage.scss'

type Props = {
  match: Match
}

type State = {
  posts: Array<BCorpPost>,
  widgets: Array<Widget>
}

class BlogLandingPage extends Component<Props, State> {
  defaultPostState: BCorpPost
  defaultWidgetState: Widget
  defaultState: State

  constructor (props: Props) {
    super(props)

    /**
     * Default state, post object response is merged shallowly with this
     * so we can be sure of what state we definitely have
     */
    this.defaultPostState = {
      post: {
        ID: 1,
        post_title: '',
        post_content: '',
        post_excerpt: '',
        author_display_name: '',
        post_date: ''
      },
      meta: {},
      terms: {},
      media: {
        featured_image: ''
      }
    }

    this.defaultWidgetState = {
      type: 'bcorp_cta_widget',
      data: {}
    }

    this.defaultState = {
      posts: [this.defaultPostState],
      widgets: [this.defaultWidgetState]
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    this.getPosts()
    this.getWidgets()
  }

  /**
   * If we go between urls that both render a blog landing page, we need to make sure we're making a new network request
   *
   * For the moment we can be sure that we don't need to re request the widgets,
   * if we end up with multiple sidebars then that could change
   *
   * @param  {[object]} nextProps
   * @return {[void]}
   */
  componentWillReceiveProps (nextProps: Props) {
    if (
      !validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')
    ) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPosts()
    }
  }

  render () {
    console.log(this.state)
    return (
      <div className={style.blogLandingPage}>
        <RightSidebarTemplate
          data={{
            page_title: sitePrettyName
          }}
          renderModules={() => {
            return (
              <div className={'row'}>
                <Posts data={this.state.posts} />
              </div>
            )
          }}
          renderRightSidebarWidgets={() => {
            return (
              <WidgetBuilder
                widgetData={this.state.widgets}
                pageSlug={this.props.match.params.slug}
              />
            )
          }}
        />
      </div>
    )
  }

  /**
   * Gets the post objects and merges them with state,
   * keeping any required defaults that aren't included in the data
   */
  async getPosts () {
    try {
      let client = {}
      if (site === 'bimrevit') {
        client = BIMRevitClient
      } else if (site === 'thewashfountain') {
        client = TheWashfountainClient
      } else {
        return
      }

      const response = await client.getRecentPosts(6)
      const postsData = response.data

      const posts = postsData.map(postData => {
        return Object.assign({}, this.defaultPostState, postData)
      })

      return this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Gets the widgets and merges them with state,
   * keeping any required defaults that aren't included in the data
   */
  async getWidgets () {
    try {
      const response = await WidgetsClient.getRightSidebar()
      const widgetsData = response.data

      const widgets = widgetsData.map(widgetData => {
        return Object.assign({}, this.defaultWidgetState, widgetData)
      })

      return this.setState({ widgets })
    } catch (err) {
      console.log(err)
    }
  }
}

export default BlogLandingPage
