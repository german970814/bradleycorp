import { Component } from 'react'
import PropTypes from 'prop-types'
import CPTApiClient from '../../../../../../api/cpt_client'
// import { nWords } from '../../../../../../lib/bcorpString'
// import FixedAspectRatioBox from '../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
// import moduleStyle from '../Modules.scss'
// import style from './MultiPostButtonModule.scss'

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

  updatePosts (props) {
    const { postIDs } = props

    this.setState({ posts: [] })

    if (postIDs) {
      postIDs.forEach(postID => {
        this.getPost(postID)
      })
    }
  }

  renderTitle () {

  }

  render () {
    console.log(this.state)
    return null
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

      return this.setState( { posts } )
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
