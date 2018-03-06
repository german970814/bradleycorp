import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getExcerpt } from '../../../../../../lib/bcorpPost'
import { createCPTUrl } from '../../../../../../lib/bcorpUrl'
import PostGettingModule from '../PostGettingModule'
import ImageFrame from '../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import BCorpLink from '../../../../../../lib/components/BCorpLink/BCorpLink'
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
    const skinClass = this.size === 'tablet' || this.size === 'desktop' ? this.skinClass : ''
    const post = this.state.posts[0]

    if (!post.post['post_title']) {
      return
    }

    return (
      <h5 className={`${style.title} ${skinClass}`} >
        {post.post['post_title']}
      </h5>
    )
  }

  renderContent () {
    const post = this.state.posts[0]
    const excerpt = getExcerpt(post.post['post_excerpt'], null)
    const skinClass = this.size === 'tablet' || this.size === 'desktop' ? this.skinClass : ''

    if (!excerpt) {
      return
    }

    return (
      <div className={`${style.content} ${skinClass}`} >
        {excerpt}
      </div>
    )
  }

  renderButtons () {
    const { post } = this.state.posts[0]
    const skinClass = this.size === 'tablet' || this.size === 'desktop' ? this.skinClass : ''

    const button = (linkText) => {
      return <button className={`button-orange ${style.button1} ${this.accentColorClass}`}>{linkText}</button>
    }

    const button1 = this.props.linkText && this.props.link
      ? (
        <BCorpLink
          url={this.props.link}
          renderInternal={
            url => {
              return (
                <Link className={`${style.button}`} to={url} replace >
                  {button(this.props.linkText)}
                </Link>
              )
            }
          }
          renderExternal={
            url => {
              return (
                <a className={`${style.button}`} href={url} >
                  {button(this.props.linkText)}
                </a>
              )
            }
          } />
      ) : null

    return (
      <div className={`row ${style.buttonsWrapper}`} >

        {button1}

        <Link className={`${style.button}`} to={createCPTUrl(post)} replace >
          <button className={`button-border-slate-grey ${style.button2} ${skinClass}`}>{'LEARN MORE'}</button>
        </Link>

      </div>
    )
  }

  getBackgroundImage () {
    return this.props.background
      ? `url(${this.props.background})`
      : undefined
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
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string
}

export default SinglePostModule
