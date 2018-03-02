import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import ScrollableList from '../../../../../../lib/containers/ScrollableList/ScrollableList'
import SliderItem from './SliderItem/SliderItem'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './SliderModule.scss'

class SliderModule extends PostGettingModule {
  renderHeading () {
    if (!this.props.title || this.size !== 'mobile') {
      return
    }

    return (
      <h5 className={style.heading} >
        {this.props.title}
      </h5>
    )
  }

  renderSliderItems () {
    return this.state.posts.map((post, index) => {
      return (
        <SliderItem
          key={index}
          post={post}
          heading={this.props.title}
          containerNode={this.node}
          size={this.size} />
      )
    })
  }

  renderSlider () {
    let args = {
      wrapperClassName: style.sliderWrapper,
      animation: ['fade','slide'],
      transitionSpeed: 1500,
      vertical: false,
      positionCirclesVertical: false,
      reverseScroll: false
    }
    
    if (this.size === 'tablet' || this.size === 'desktop') {
      args = {
        ...args,
        wrapperClassName: style.sliderWrapperTabletDesktop,
        animation: ['fade'],
        transitionSpeed: 1500,
        vertical: true,
        positionCirclesVertical: true,
        reverseScroll: true
      }
    }
    
    console.log(this.size)
    console.log(args)
    
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

  render () {
    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={`${moduleStyle.module} ${style.sliderModule}`} >

        <ContainerMediaQuery
          node={this.node} >
          {(containerClassName, size) => {
            
            this.size = size 
            
            return (
              <div
                className={containerClassName} >

                {this.renderHeading()}

                {this.renderSlider()}

              </div>
            )
          }}
        </ContainerMediaQuery >

      </div>
    )
  }
}

SliderModule.propTypes = {
  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  skin: PropTypes.string
}

export default SliderModule
