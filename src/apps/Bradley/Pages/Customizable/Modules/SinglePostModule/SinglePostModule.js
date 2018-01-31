import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CPTApiClient from '../../../../../../api/cpt_client'

/**
 * Single Post Module Component
 */
class SinglePostModule extends Component {
  constructor (props) {
    super(props)

    /**
     * Default state, post object response is merged shallowly with this
     * so we can be sure of what state we definitely have
     */
    const defaultState = {
      post: {
        ID: 1,
        'post_title': '',
        'post_content': ''
      },
      media: {
        'featured_image': ['', 0, 0, false]
      }
    }
    this.defaultState = defaultState
    this.state = defaultState
  }

  componentDidMount () {
    const { postID } = this.props
    this.getPost(postID)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.postID !== this.props.postID) {
      this.getPost(nextProps.postID)
    }
  }

  render () {
    console.log(this.state)
    return <div>{this.state.post.ID}</div>
  }

  /**
   * Gets the post object and merges it with state
   * @param  {[number]}  postID ID of the post to request
   */
  async getPost (postID) {
    try {
      const postAPIClient = new CPTApiClient('post')
      const post = await postAPIClient.getById(postID)
      const postData = post.data

      // set state leaving defaults where there exists no data in the request
      return this.setState(Object.assign({}, this.defaultState, postData))
    } catch (err) {
      console.log(err)
    }
  }
}

SinglePostModule.propTypes = {
  postID: PropTypes.number.isRequired,
  accentColor: PropTypes.string,
  background: PropTypes.string,
  skin: PropTypes.string
}

export default SinglePostModule
