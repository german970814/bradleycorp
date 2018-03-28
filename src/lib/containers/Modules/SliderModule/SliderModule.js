import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import { lookupColor } from '../../../bcorpStyles'
import ScrollableList from '../../ScrollableList/ScrollableList'
import SliderItem from './SliderItem/SliderItem'
import style from './SliderModule.scss'

class SliderModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'sliderModule', 4)
  }

  /**
   * Skin is a bit different for slider module,
   * since it needs to always have a white background if post type is product
   *
   * We can override the parent setSkinClass function
   * to allow us to still use this.skinClass as we would in any other module
   *
   * @param {[object]} props
   */
  setSkinClass (props) {
    if (props.postType === 'product') {
      this.skinClass = `module-skin-light`
    } else {
      super.setSkinClass(props)
    }
  }

  /**
   * use this to get slider skin instead of this.props.skin
   *
   * @return {[string]} the skin
   */
  getSliderSkin () {
    if (this.props.postType === 'product') {
      return 'light'
    }
    return this.props.skin
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
          skin={this.getSliderSkin()}
          accentColor={this.props.accentColor}
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
        reverseSwipeScroll: true
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
        reverseSwipeScroll={args.reverseSwipeScroll}
        positionCirclesVertical={args.positionCirclesVertical}
        slideShow
        alwaysUpdate
        showPosition >
        {this.renderSliderItems()}
      </ScrollableList>
    )
  }

  renderModule () {
    return (
      <div
        className={`${this.containerClassName} ${this.skinClass} module-skin-dark-background-navy module-skin-light-background-light-gray`}
        style={{
          minHeight: this.state.minHeight,
          backgroundColor: this.props.postType === 'product' ? lookupColor('white') : undefined
        }} >

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
