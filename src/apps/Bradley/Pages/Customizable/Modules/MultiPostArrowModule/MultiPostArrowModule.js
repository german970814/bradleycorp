import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CPTApiClient from '../../../../../../api/cpt_client'
//import { arraysAreEqual } from '../../../../../../lib/bcorpArray'
//import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './MultiPostArrowModule.scss'

class MultiPostArrowModule extends Component {
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
        'post_content': '',
        'post_excerpt': ''
      },
      media: {
        'featured_image': ['', 0, 0, false]
      }
    }

    this.state = {
      posts: [
        this.defaultPostState
      ],
      node: undefined
    }
  }

  componentDidMount () {
    this.getPosts(this.props.postIDs)
  }

  componentWillReceiveProps (nextProps) {
    if (!arraysAreEqual(nextProps.postIDs, this.props.postIDs)) {
      // clear posts state from last props
      //this.setState(this.defaultState)
      this.getPosts(nextProps.postIDs)
    }
  }

  render () {
    return null
  }

  async getPosts (postIdArray) {
    try {
      const { postType } = this.props

      const postAPIClient = new CPTApiClient(postType.replace(/_/g, '-'))
      const posts = await postAPIClient.getByIdArray(postIdArray)

      console.log(posts.data)
      /*
      const { postType } = this.props
      const postAPIClient = new CPTApiClient(postType.replace(/_/g, '-'))
      const post = await postAPIClient.getById(postID)
      const postData = post.data

      const posts = [ ...this.state.posts, Object.assign({}, this.defaultPostState, postData) ]

      return this.setState({ posts })
      */
    } catch (err) {
      console.log(err)
    }
  }
}

MultiPostArrowModule.propTypes = {
  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  /*
   * ID of the post to display
   */
  postIDs: PropTypes.array.isRequired,
  /*
   * Post type of the posts to be displayed - must be the same for them all
   */
  postType: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default MultiPostArrowModule
