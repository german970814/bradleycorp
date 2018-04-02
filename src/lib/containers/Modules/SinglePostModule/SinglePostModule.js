import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getExcerpt } from '../../../bcorpPost'
import { createCPTUrl } from '../../../bcorpUrl'
import BCorpBackground from '../../../components/BCorpBackground/BCorpBackground'
import PostGettingModule from '../PostGettingModule'
import ImageFrame from '../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import BCorpLink from '../../../components/BCorpLink/BCorpLink'
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
    super(props, style, 'singlePostModule', 1)
  }

  renderImage () {
    const post = this.state.posts[0]
    if (
      !post.media['featured_image'] ||
      post.media['featured_image'].length === 0
    ) {
      return
    }

    const src = post.media['featured_image'][0]

    return (
      <div className={style.imagePadding}>
        <ImageFrame
          src={src}
          aspectRatio={180 / 270}
          aspectRatioTablet={300 / 311}
          aspectRatioDesktop={386 / 420}
          containerNode={this.state.node}
          respondToContainer
        />
      </div>
    )
  }

  renderTitle () {
    const { post } = this.state.posts[0]

    if (!post['post_title']) {
      return
    }

    return (
      <Link to={createCPTUrl(post)} replace>
        <h2 className={`${style.title} ${this.skinClass}`}>
          {post['post_title']}
        </h2>
      </Link>
    )
  }

  renderContent () {
    const post = this.state.posts[0]
    const excerpt = getExcerpt(
      post.post['post_excerpt'],
      post.post['post_content'],
      'long'
    )

    if (!excerpt) {
      return
    }

    return (
      <div
        className={`${style.content} ${this.skinClass}`}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    )
  }

  renderButtons () {
    const { post } = this.state.posts[0]

    const button = linkText => {
      return (
        <button
          className={`button-border-slate-grey ${style.button2} ${
            this.skinClass
          }`}>
          {linkText}
        </button>
      )
    }

    const button2 =
      this.props.linkText && this.props.link ? (
        <BCorpLink
          url={this.props.link}
          renderInternal={url => {
            return (
              <Link className={`${style.button}`} to={url} replace>
                {button(this.props.linkText)}
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a className={`${style.button}`} href={url}>
                {button(this.props.linkText)}
              </a>
            )
          }}
        />
      ) : null

    return (
      <div className={`row ${style.buttonsWrapper}`}>
        <Link className={`${style.button}`} to={createCPTUrl(post)} replace>
          <button
            className={`button-orange ${style.button1} ${
              this.accentColorClass
            }`}>
            {'READ MORE'}
          </button>
        </Link>

        {button2}
      </div>
    )
  }

  renderModule () {
    return (
      <div className={`row ${this.containerClassName} ${this.skinClass}`}>
        <BCorpBackground
          imageSrc={this.props.background}
          overlay={this.props.backgroundOverlay}
          skin={this.props.skin}
        />

        <div className={`${style.stretchToHeight} ${style.imageCol}`}>
          {this.renderImage()}
        </div>

        <div className={`${style.stretchToHeight} ${style.contentCol}`}>
          <div className={style.contentWrapper}>
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
  backgroundOverlay: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string
}

export default SinglePostModule
