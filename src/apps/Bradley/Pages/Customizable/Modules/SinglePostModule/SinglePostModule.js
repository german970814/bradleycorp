import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
// import CPTApiClient from '../../../../../../api/cpt_client'
import { getExcerpt } from '../../../../../../lib/bcorpPost'
import ImageFrame from '../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
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
    super(props)

    this.state = {
      ...this.state,
      node: undefined
    }
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
          aspectRatioDesktop={386 / 420} />
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
    const excerpt = getExcerpt(post.post['post_excerpt'], post.post['post_content'])

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

  render () {
    return (
      <ContainerMediaQuery
        node={this.state.node} >
        {(containerClassName) => {
          return (
            <div
              ref={(node) => {
                if (!this.state.node) {
                  this.setState({ node })
                }
              }}
              style={{
                backgroundImage: this.getBackgroundImage()
              }}
              className={`row ${containerClassName} ${style.singlePostModule} ${moduleStyle.module}`}>

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
        }}
      </ContainerMediaQuery >
    )
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
