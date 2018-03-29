import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { site, sitePrettyName } from '../../../../api'
import BIMRevitClient from '../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../api/theWashfountain_client'
import WidgetsClient from '../../../../api/widgets_client'
import { validChain } from '../../../bcorpObject'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import RightSidebarTemplate from '../../Templates/RightSidebarTemplate/RightSidebarTemplate'
import style from './BlogLandingPage.scss'

class BlogLandingPage extends Component {
  constructor (props) {
    super(props)

    /**
     * Default state, post object response is merged shallowly with this
     * so we can be sure of what state we definitely have
     */
    this.defaultPostState = {
      post: {
        ID: 1,
        'post_title': '',
        'author_display_name': '',
        'post_date': ''
      }
    }

    this.defaultWidgetState = {
      type: '',
      data: {}
    }

    this.defaultState = {
      posts: [
        this.defaultPostState
      ],
      widgets: [
        this.defaultWidgetState
      ]
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
  componentWillReceiveProps (nextProps) {
    if (!validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPosts()
    }
  }

  render () {
    return (
      <div className={style.blogLandingPage} >
        <RightSidebarTemplate
          data={{
            'page_title': sitePrettyName
          }}
          renderModules={
            () => {
              return <div className={style.blogPosts} />
            }
          }
          renderRightSidebarWidgets={
            () => {
              return <WidgetBuilder widgetData={this.state.widgets} pageSlug={this.props.match.params.slug} />
            }
          } />
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

BlogLandingPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default BlogLandingPage
