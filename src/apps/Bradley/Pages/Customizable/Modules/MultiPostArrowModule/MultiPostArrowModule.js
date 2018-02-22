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
  constructor (props) {
    super(props)

    this.state = {
      ...this.state,
      node: undefined
    }
  }

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

  renderPosts (size) {
    const arrow = (size === 'tablet' || size === 'desktop')

    return this.state.posts.map((post, index) => {
      return (
        <PostColumn
          key={index}
          post={post}
          containerNode={this.state.node}
          arrow={arrow} />
      )
    })
  }

  /**
   * containerNode prop makes sure slider layout responds to whole module size,
   * not just the inner module
   */
  renderSlider (size) {
    return (
      <SimpleSlider
        numberMobile={2}
        numberTablet={3}
        numberDesktop={4}
        wrapperClassName={style.slider}
        desktopWrapperClassName={style.slider}
        containerNode={this.state.node}
        respondToContainer
        nextPrevButtonsForMobile
        alwaysUpdate >
        {this.renderPosts(size)}
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
        {(containerClassName, size) => {
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

              {this.renderSlider(size)}

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
