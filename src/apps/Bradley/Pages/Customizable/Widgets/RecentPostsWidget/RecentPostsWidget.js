import React from 'react'
import PropTypes from 'prop-types'
import BIMRevitClient from '../../../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../../../api/theWashfountain_client'
import { urlBIMRevit, urlTheWashfountain } from '../../../../../../api'
import { createCPTUrl } from '../../../../../../lib/bcorpUrl'
import BCorpWidget from '../BCorpWidget'
import style from './RecentPostsWidget.scss'

class RecentPostsWidget extends BCorpWidget {
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

    this.defaultState = {
      posts: [
        this.defaultPostState
      ]
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    this.getPosts()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.blog !== this.props.blog || nextProps.numberposts !== this.props.numberposts || nextProps.title !== this.props.title) {
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
  getLink (post) {
    if (this.props.blog === 'washfountain') {
      return `${urlTheWashfountain}${createCPTUrl(post)}`
    } else if (this.props.blog === 'bim-revit') {
      return `${urlBIMRevit}${createCPTUrl(post)}`
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
          className={style.recentPost} >

          <div className={`link-navy ${style.title}`} >{post.post['post_title']}</div>

          <div className={`post-meta-data ${style.postMeta}`} >
            {`by ${post.post['author_display_name']} posted at ${post.post['post_date']}`}
          </div>

        </a>
      )
    })
  }

  render () {
    return super.render()
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
      const postsData = response.data

      const posts = postsData.map(postData => {
        return Object.assign({}, this.defaultPostState, postData)
      })

      return this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }
}

RecentPostsWidget.propTypes = {
  ...BCorpWidget.propTypes,

  numberposts: PropTypes.number.isRequired,
  blog: PropTypes.oneOf(['washfountain', 'bim-revit']).isRequired
}

export default RecentPostsWidget
