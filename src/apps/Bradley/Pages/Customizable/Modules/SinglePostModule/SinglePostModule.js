import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import { getExcerpt } from '../../../../../../lib/bcorpPost'
import ImageFrame from '../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './SinglePostModule.scss'

/**
 * Single Post Module presentational component.
 * Post data is managed by the PostGettingModule
 *
 * Make sure we pass it a single post id, but in an array... eg [123]
 * This keeps it compatible with PostGettingModule
 *
 * If multiple IDs are passed, it will always just display the first
 *
 * @extends PostGettingModule
 */
class SinglePostModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'singlePostModule')
  }

  renderImage () {
    const post = this.state.posts[0]
    if (!post.media['featured_image'] ||
    post.media['featured_image'].length === 0) {
      return
    }

    const src = post.media['featured_image'][0]

    return (
      <div className={style.imagePadding } >
        <ImageFrame
          src={src}
          aspectRatio={180 / 270}
          aspectRatioTablet={300 / 311}
          aspectRatioDesktop={386 / 420}
          containerNode={this.state.node}
          respondToContainer />
      </div>
    )
  }

  renderTitle () {
    const post = this.state.posts[0]
    if (!post.post['post_title']) {
      return
    }

    return (
      <div className={style.title} >
        {post.post['post_title']}
      </div>
    )
  }

  renderContent () {
    const post = this.state.posts[0]
    const excerpt = getExcerpt(post.post['post_excerpt'], null)

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

        <div className={`${style.button}`} >
          <button className={`button-orange ${style.letsTalk}`}>{"LET'S TALK"}</button>
        </div>

        <div className={`${style.button}`} >
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

  renderModule () {
    return (
      <div
        style={{
          backgroundImage: this.getBackgroundImage()
        }}
        className={`row ${this.containerClassName}`}>

        <div className={`${style.stretchToHeight} ${style.imageCol}`} >
          {this.renderImage()}
        </div>

        <div className={`${style.stretchToHeight} ${style.contentCol}`} >

          <div className={style.contentWrapper} >
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderButtons()}
          </div>

        </div>

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.state.posts || this.state.posts.length === 0) {
      return false
    }

    return true
  }
}

SinglePostModule.propTypes = {

  ...PostGettingModule.propTypes,

  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default SinglePostModule
