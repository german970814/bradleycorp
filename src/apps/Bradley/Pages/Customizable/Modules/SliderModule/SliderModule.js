import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import ScrollableList from '../../../../../../lib/containers/ScrollableList/ScrollableList'
import SliderItem from './SliderItem/SliderItem'
import style from './SliderModule.scss'

class SliderModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'sliderModule', 4)
  }

  renderHeading () {
    if (!this.props.title || this.size !== 'mobile') {
      return
    }

    return (
      <h3 className={`${style.heading} ${this.accentColorClass} module-accent-color-change-text ${this.skinClass}`} >
        {this.props.title}
      </h3>
    )
  }

  renderSliderItems () {
    return this.state.posts.map((post, index) => {
      return (
        <SliderItem
          key={index}
          post={post}
          heading={this.props.title}
          containerNode={this.state.node}
          size={this.size}
          accentColorClass={this.accentColorClass}
          skinClass={this.skinClass} />
      )
    })
  }

  renderSlider () {
    let args = {
      wrapperClassName: `${style.sliderWrapper} ${this.accentColorClass}`,
      animation: ['fade', 'slide'],
      transitionSpeed: 1500,
      vertical: false,
      positionCirclesVertical: false,
      reverseScroll: false
    }

    if (this.size === 'tablet' || this.size === 'desktop') {
      args = {
        ...args,
        wrapperClassName: `${style.sliderWrapperTabletDesktop} ${this.accentColorClass}`,
        animation: ['fade'],
        transitionSpeed: 1500,
        vertical: true,
        positionCirclesVertical: true,
        reverseScroll: true
      }
    }

    return (
      <ScrollableList
        numberToDisplay={1}
        touchMoveSensitivity={1.5}
        wrapperClassName={args.wrapperClassName}
        animation={args.animation}
        transitionSpeed={args.transitionSpeed}
        vertical={args.vertical}
        reverseScroll={args.reverseScroll}
        positionCirclesVertical={args.positionCirclesVertical}
        alwaysUpdate
        showPosition >
        {this.renderSliderItems()}
      </ScrollableList>
    )
  }

  getBackgroundColorClass () {
    if (this.props.postType === 'product') {
      return 'module-skin-dark-background-black'
    } else {
      return 'module-skin-dark-background-navy module-skin-light-background-light-gray'
    }
  }

  renderModule () {
    return (
      <div
        className={`${this.containerClassName} ${this.skinClass} ${this.getBackgroundColorClass()}`} >

        {this.renderHeading()}

        {this.renderSlider()}

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.state.posts || this.state.posts.length < 1 || this.state.posts.length > this.maxPosts) {
      return false
    }

    return true
  }
}

SliderModule.propTypes = {
  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string
}

export default SliderModule
