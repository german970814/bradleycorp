// @flow
import React, { Component } from 'react'
import type { BlogName } from '../../../types/blog_types'
import type { WPPost, BCorpPost } from '../../../types/post_types'
import BIMRevitClient from '../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../api/theWashfountain_client'
import { urlBIMRevit, urlTheWashfountain } from '../../../../api'
import { createCPTUrl } from '../../../../lib/bcorpUrl'
import PostMetaData from '../../../components/PostMetaData/PostMetaData'
import BCorpWidget from '../BCorpWidget'
import style from './RecentPostsWidget.scss'

type Props = {
  title: string,
  numberposts: number,
  blog: BlogName
}

type State = {
  posts: Array<{ post: WPPost }>
}

class RecentPostsWidget extends Component<Props, State> {
  defaultPostState: { post: WPPost }

  constructor (props: Props) {
    super(props)

    this.defaultPostState = { post: { ID: 0 } }

    this.state = {
      posts: [this.defaultPostState]
    }
  }

  componentDidMount () {
    this.getPosts()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (
      nextProps.blog !== this.props.blog ||
      nextProps.numberposts !== this.props.numberposts ||
      nextProps.title !== this.props.title
    ) {
      this.getPosts()
    }
  }

  /**
   * Regardless of what site the widget is used on,
   * we need to link each posts to either the washfountain or bimrevit respectively
   *
   * @param  {[object]} post WP_Post object
   * @return {[string]}      The post href
   */
  getLink (post: WPPost) {
    if (this.props.blog === 'washfountain') {
      return `${urlTheWashfountain}${createCPTUrl(post) || '#'}`
    } else if (this.props.blog === 'bim-revit') {
      return `${urlBIMRevit}${createCPTUrl(post) || '#'}`
    } else {
      return '#'
    }
  }

  renderContentBox () {
    return this.state.posts.map((post, index) => {
      return (
        <a
          key={index}
          href={this.getLink(post.post)}
          className={style.recentPost}>
          <div className={`link-navy ${style.title}`}>
            {post.post['post_title']}
          </div>

          <PostMetaData
            className={style.postMeta}
            authorName={post.post['author_display_name']}
            date={post.post['post_date']}
          />
        </a>
      )
    })
  }

  render () {
    return (
      <BCorpWidget title={this.props.title}>
        {this.renderContentBox()}
      </BCorpWidget>
    )
  }

  /**
   * Gets the post objects and merges them with state,
   * keeping any required defaults that aren't included in the data
   *
   * @param  {[number]}  postID ID of the post to request
   */
  async getPosts () {
    try {
      const { blog } = this.props

      // default client to washfountain
      let client = TheWashfountainClient
      if (blog === 'bim-revit') {
        client = BIMRevitClient
      }

      const response = await client.getRecentPosts(this.props.numberposts)
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

export default RecentPostsWidget
