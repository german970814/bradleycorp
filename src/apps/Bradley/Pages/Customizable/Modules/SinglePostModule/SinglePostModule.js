import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CPTApiClient from '../../../../../../api/cpt_client'
import { getExcerpt } from '../../../../../../lib/bcorpPost'
import ImageFrame from '../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import moduleStyle from '../Modules.scss'
import style from './SinglePostModule.scss'

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
        'post_content': '',
        'post_excerpt': ''
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

  renderImage () {
    if (!this.state.media['featured_image'] ||
    this.state.media['featured_image'].length === 0) {
      return
    }

    const src = this.state.media['featured_image'][0]

    return (
      <div className={style.imagePadding } >
        <ImageFrame
          src={src}
          aspectRatio={180 / 270}
          aspectRatioTablet={300 / 311}
          aspectRatioDesktop={386 / 420} />
      </div>
    )
  }

  renderTitle () {
    if (!this.state.post['post_title']) {
      return
    }

    return (
      <div className={style.title} >
        {this.state.post['post_title']}
      </div>
    )
  }

  renderContent () {
    const { post } = this.state
    const excerpt = getExcerpt(post['post_excerpt'], post['post_content'], 22)

    if (!excerpt) {
      return
    }

    return (
      <div className={style.content} >
        {excerpt}
      </div>
    )
  }

  renderButtons () {
    return (
      <div className={`row ${style.buttonsWrapper}`} >

        <div className={`col1 col2-tablet ${style.button}`} >
          <button className={`button-orange ${style.letsTalk}`}>{"LET'S TALK"}</button>
        </div>

        <div className={`col1 col2-tablet ${style.button}`} >
          <button className={`button-border-slate-grey ${style.learnMore}`}>{'LEARN MORE'}</button>
        </div>

      </div>
    )
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
        className={`row ${style.singlePostModule} ${moduleStyle.module}`}>

        <div className={`col1 inline-col2-middle-tablet ${style.stretchToHeight} ${style.imageCol}`} >
          {this.renderImage()}
        </div>

        <div className={`col1 inline-col2-middle-tablet ${style.stretchToHeight} ${style.contentCol}`} >

          <div className={style.contentWrapper} >
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderButtons()}
          </div>

        </div>

      </div>
    )
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
  /*
   * ID of the post to display
   */
  postID: PropTypes.number.isRequired,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default SinglePostModule
