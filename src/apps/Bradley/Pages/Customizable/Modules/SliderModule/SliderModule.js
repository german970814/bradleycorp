import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import ScrollableList from '../../../../../../lib/containers/ScrollableList/ScrollableList'
import SliderItem from './SliderItem/SliderItem'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './SliderModule.scss'

class SliderModule extends PostGettingModule {
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

  renderSliderItems () {
    return this.state.posts.map((post, index) => {
      return (
        <SliderItem
          key={index}
          post={post}
          containerNode={this.node} />
      )
    })
  }

  renderSliderMobile () {
    return (
      <ScrollableList
        numberToDisplay={1}
        touchMoveSensitivity={1.5}
        wrapperClassName={style.sliderWrapper}
        animation={['fade', 'slide']}
        transitionSpeed={1500}
        alwaysUpdate
        showPosition >
        {this.renderSliderItems()}
      </ScrollableList>
    )
  }

  renderSliderTablet () {
    return (
      <ScrollableList
        numberToDisplay={1}
        touchMoveSensitivity={1}
        wrapperClassName={style.sliderWrapper}
        animation={['fade']}
        transitionSpeed={1500}
        alwaysUpdate
        showPosition >
        {this.renderSliderItems()}
      </ScrollableList>
    )
  }

  renderSliderDesktop () {
    return (
      <ScrollableList
        numberToDisplay={1}
        touchMoveSensitivity={1}
        wrapperClassName={style.sliderWrapper}
        animation={['fade']}
        transitionSpeed={1500}
        alwaysUpdate
        showPosition >
        {this.renderSliderItems()}
      </ScrollableList>
    )
  }

  renderSlider (size) {
    if (size === 'mobile') {
      return this.renderSliderMobile()
    } else

    if (size === 'tablet') {
      return this.renderSliderTablet()
    } else

    if (size === 'desktop') {
      return this.renderSliderDesktop()
    }
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
            return (
              <div
                className={`row ${containerClassName}`} >

                {this.renderTitle()}

                {this.renderSlider(size)}

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
