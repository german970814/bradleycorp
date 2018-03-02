import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import { getExcerpt } from '../../../../../../lib/bcorpPost'
import style from './SinglePostFeaturedModule.scss'

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
class SinglePostFeaturedModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'singlePostFeaturedModule')
  }

  renderHeadline () {
    if (!this.props.headline) {
      return
    }

    return <h4 className={style.headline} >{this.props.headline}</h4>
  }

  renderTitle () {
    const { post } = this.state.posts[0]

    if (!post['post_title']) {
      return
    }

    return <h4 className={style.title} >{post['post_title']}</h4>
  }

  renderContent () {
    const { post } = this.state.posts[0]

    if (!post['post_excerpt'] && !post['post_content']) {
      return
    }

    return <div className={style.content} >{getExcerpt(post['post_excerpt'], null, 12)}</div>
  }

  renderArrow () {
    return (
      <div className={style.arrowWrapper} >
        <img
          className={style.arrow}
          src={require('../../../../../../images/arrow/arrow@2x.png')} />
      </div>
    )
  }

  renderImage () {
    const { media } = this.state.posts[0]
    let src

    if (this.props.background) {
      src = `url(${this.props.background})`
    } else

    if (media['featured_image'] && media['featured_image'].length > 0) {
      src = `url(${media['featured_image'][0]})`
    }

    if (src !== '') {
      return (
        <div
          style={{
            backgroundImage: src
          }}
          className={style.image} />
      )
    }
  }

  renderModule () {
    return (
      <React.Fragment>

        {this.renderImage()}

        <div className={`row ${this.containerClassName}`}>

          {this.renderHeadline()}

          <div className={style.contentWrapper} >

            {this.renderTitle()}

            {this.renderContent()}

          </div>

          {this.renderArrow()}

        </div>

      </React.Fragment>
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

SinglePostFeaturedModule.propTypes = {

  ...PostGettingModule.propTypes,

  headline: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string
}

export default SinglePostFeaturedModule
