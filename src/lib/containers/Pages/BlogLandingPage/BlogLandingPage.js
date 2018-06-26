// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../types/post_types'
import CPTApiClient from '../../../../api/cpt_client'
import BlogPageTemplate from '../../Templates/BlogPageTemplate/BlogPageTemplate'
import BCorpHead from '../../../components/BCorpHead/BCorpHead'
import Posts from './Posts/Posts'

type Props = {
  match: Match
}

type State = {
  posts?: Array<BCorpPost>
}

const pageTitle = `Blog Home`
const pageDescription = ''

class BlogLandingPage extends Component<Props, State> {
  defaultPostState: BCorpPost
  defaultState: State

  constructor (props: Props) {
    super(props)

    this.state = {}
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
    if (!this.props.match.params.slug || !nextProps.match.params.slug) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPosts()
    }
  }

  render () {
    return (
      <div className={`Blog-Landing-Page`}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <BlogPageTemplate
          renderContent={() => {
            if (!this.state.posts) {
              return null
            }
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
    try {
      const client = new CPTApiClient('post')

      const response = await client.getLatest()
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
