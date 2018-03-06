import PropTypes from 'prop-types'
import BCorpModule from '../../../../../lib/components/Modules/BCorpModule'
import CPTApiClient from '../../../../../api/cpt_client'
import { arraysAreEqual } from '../../../../../lib/bcorpArray'

/**
 * Any module which is required to make a network request for post data
 * can just extend this class and only worry about presentation
 *
 * As long as a child class has postIDs and postType props
 * the request for those posts will be made when postIDs update
 * and any found posts will be saved to state
 *
 * @extends Component
 */
class PostGettingModule extends BCorpModule {
  constructor (props, localStyle, moduleName) {
    super(props, localStyle, moduleName)

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

    this.defaultState = {
      posts: [
        this.defaultPostState
      ]
    }

    this.state = {
      ...this.state,
      ...this.defaultState
    }
  }

  componentDidMount () {
    super.componentDidMount()

    this.getPosts(this.props.postIDs)
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps)

    if (!arraysAreEqual(nextProps.postIDs, this.props.postIDs)) {
      this.getPosts(nextProps.postIDs)
    }
  }

  /**
   * This class is purely for managing the network requests
   * children should implement their own render function to override this
   *
   * @return {[type]} null
   */
  renderModule () { return null }

  render () {
    return super.render()
  }

  /**
   * Gets the post objects and merges them with state,
   * keeping any required defaults that aren't included in the data
   *
   * @param  {[number]}  postID ID of the post to request
   */
  async getPosts (postIdArray) {
    try {
      const { postType } = this.props
      const postAPIClient = new CPTApiClient(postType.replace(/_/g, '-'))
      const postsResponse = await postAPIClient.getByIdArray(postIdArray)
      const postsData = postsResponse.data

      const posts = postsData.map(postData => {
        return Object.assign({}, this.defaultPostState, postData)
      })

      return this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 *
 * Make sure to extend these propTypes in child classes using:
 * ...PostGettingModule.propTypes
 * at the top of the child propTypes object
 *
 */
PostGettingModule.propTypes = {
  ...BCorpModule.propTypes,

  /*
   * ID of the post to display
   */
  postIDs: PropTypes.array.isRequired,
  /*
   * Post type of the posts to be displayed - must be the same for them all
   */
  postType: PropTypes.string.isRequired
}

export default PostGettingModule
