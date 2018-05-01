// @flow
import React, { Component } from 'react'
import type { SiteType } from '../../../../api'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../types/post_types'
import { validChain } from '../../../bcorpObject'
import { site } from '../../../../api'
import BIMRevitClient from '../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../api/theWashfountain_client'
import BlogPageTemplate from '../../Templates/BlogPageTemplate/BlogPageTemplate'
import Posts from './Posts/Posts'

type Props = {
  match: Match
}

type State = {
  posts: Array<BCorpPost>
}

class BlogLandingPage extends Component<Props, State> {
  defaultPostState: BCorpPost
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

    this.defaultState = {
      posts: [this.defaultPostState]
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    this.getPosts()
  }

  /**
   * If we go between urls that both render a blog landing page, we need to make sure we're making a new network request
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
    return (
      <div className={`Blog-Landing-Page`}>
        <BlogPageTemplate
          renderContent={() => {
            return (
              <div className={'row'}>
                <Posts data={this.state.posts} />
              </div>
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
    const currentSite: SiteType = site
    try {
      let client = {}
      if (currentSite === 'bim-revit') {
        client = BIMRevitClient
      } else if (currentSite === 'thewashfountain') {
        client = TheWashfountainClient
      } else {
        return
      }

      // passing 0 means we use WP get_posts default number of posts (currently 5)
      const response = await client.getRecentPosts(0)
      const postsData: Array<BCorpPost> = response.data

      const posts = postsData.map(postData => {
        return Object.assign({}, this.defaultPostState, postData)
      })

      return this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }
}

export default BlogLandingPage
