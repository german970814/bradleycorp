import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import SimpleSlider from '../../../../../../lib/containers/SimpleSlider/SimpleSlider'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import PostColumn from './PostColumn/PostColumn'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './MultiPostArrowModule.scss'

/**
 * Handles the presentational logic for the Multi Post Arrow Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostArrowModule extends PostGettingModule {
  renderTitle () {
    if (!this.props.title) {
      return
    }

    return (
      <h5 className={`${style.title}`} >
        {this.props.title}
      </h5>
    )
  }

  renderPosts () {
    return this.state.posts.map((post, index) => {
      return (
        <PostColumn
          key={index}
          post={post} />
      )
    })
  }

  renderSlider () {
    return (
      <SimpleSlider
        numberMobile={2}
        numberTablet={3}
        numberDesktop={5}
        wrapperClassName={style.slider}
        desktopWrapperClassName={style.sliderDesktop}
        nextPrevButtonsForMobile
        respondToContainer >
        {this.renderPosts()}
      </SimpleSlider>
    )
  }

  getBackground () {
    const image = this.props.background
      ? `url(${this.props.background})`
      : `url(${require('../../../../../../images/verge-background-image/verge-background-image.jpg')})`

    return `linear-gradient(rgba(47, 61, 112, 0.7),rgba(47, 61, 112, 0.7)), ${image}`
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
                background: this.getBackground(),
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
              className={`row ${containerClassName} ${moduleStyle.module} ${style.multiPostArrowModule}`} >

              {this.renderTitle()}

              {this.renderSlider()}

            </div>
          )
        }}
      </ContainerMediaQuery >
    )
  }
}

MultiPostArrowModule.propTypes = {

  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default MultiPostArrowModule
