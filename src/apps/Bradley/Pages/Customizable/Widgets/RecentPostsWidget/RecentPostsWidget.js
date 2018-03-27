import React from 'react'
import PropTypes from 'prop-types'
import BIMRevitClient from '../../../../../../api/bimRevit_client'
import TheWashfountainClient from '../../../../../../api/theWashfountain_client'
import BCorpWidget from '../BCorpWidget'

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
        'post_author': '',
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

  renderContentBox () {
    return this.state.posts.map((post, index) => {
      return (
        <div key={index}>
          {post.post['post_title']}
        </div>
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
  blog: PropTypes.oneOf(['thewashfountain', 'bim-revit']).isRequired
}

export default RecentPostsWidget
