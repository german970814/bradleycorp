import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CPTApiClient from '../../../../../../api/cpt_client'
// import { nWords } from '../../../../../../lib/bcorpString'
// import FixedAspectRatioBox from '../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import PostColumn from './PostColumn/PostColumn'
import moduleStyle from '../Modules.scss'
import style from './MultiPostButtonModule.scss'

class MultiPostButtonModule extends Component {
  constructor (props) {
    super(props)

    /**
     * Default state, post object response is merged shallowly with this
     * so we can be sure of what state we definitely have
     */
    const defaultState = {
      posts: [
        {
          post: {
            ID: 1,
            'post_title': '',
            'post_content': '',
            'post_excerpt': ''
          },
          media: {
            'featured_image': ['', 0, 0, false]
          }
        }
      ]
    }
    this.defaultState = defaultState
    this.state = defaultState
  }

  componentDidMount () {
    this.updatePosts(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.postIDs !== this.props.postIDs) {
      // clear posts state from last props
      this.setState(this.defaultState)
      this.updatePosts(nextProps.postIDs)
    }
  }

  renderTitle () {
    if (!this.props.title) {
      return
    }

    return (
      <h5 className={`col1 ${style.title}`} >
        {this.props.title}
      </h5>
    )
  }

  renderCols () {
    const { posts } = this.state

    if (!posts) {
      return
    }

    return posts.map((post, index) => {
      return (
        <PostColumn
          key={index}
          post={post}
          colClassName={`col1 col3-tablet column`} />
      )
    })
  }

  getBackgroundImage () {
    return this.props.background
      ? `url(${this.props.background})`
      : `url(${require('../../../../../../images/marble-background/shutterstock-109902944.png')})`
  }

  render () {
    return (
      <div
        style={{
          backgroundImage: this.getBackgroundImage()
        }}
        className={`row ${moduleStyle.module} ${style.multiPostButtonModule}`} >

        {this.renderTitle()}

        <div className={`row ${style.columnsRow}`} >
          {this.renderCols()}
        </div>

      </div>
    )
  }

  /**
   * Updates the array of posts from the postIDs given in props
   * @param  {[object]} props component props
   * @return {[void]}         sends a network request for each post ID
   */
  updatePosts (props) {
    const { postIDs } = props

    this.setState({ posts: [] })

    // makes network request one at a time
    if (postIDs) {
      postIDs.forEach(postID => {
        this.getPost(postID)
      })
    }
  }

  /**
   * Gets the post objects and merges them with state
   * @param  {[number]}  postID ID of the post to request
   */
  async getPost (postID) {
    try {
      const postAPIClient = new CPTApiClient('post')
      const post = await postAPIClient.getById(postID)
      const postData = post.data

      const posts = [ ...this.state.posts, Object.assign({}, this.defaultState, postData) ]

      return this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }
}

MultiPostButtonModule.propTypes = {
  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  /*
   * ID of the post to display
   */
  postIDs: PropTypes.array.isRequired,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default MultiPostButtonModule
