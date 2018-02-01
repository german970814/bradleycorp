import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import ScrollableList from '../ScrollableList/ScrollableList'
import ButtonNext from './ButtonNext'
import ButtonPrev from './ButtonPrev'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './SimpleSlider.scss'

/**
 * Wraps the ScrollableList component with media queries and default button elements
 */
class SimpleSlider extends Component {
  renderTitle () {
    if (this.props.title !== undefined &&
    this.props.title !== '') {
      return (
        <h4
          className={`${style.title} ${style.buttonUp}`} >
          {this.props.title}
        </h4>
      )
    }
  }

  render () {
    const buttonUpMobile = this.props.nextPrevButtonsForMobile
      ? <ButtonPrev />
      : <ButtonLeft />

    const buttonDownMobile = this.props.nextPrevButtonsForMobile
      ? <ButtonNext />
      : <ButtonRight />

    return (
      <React.Fragment>

        {this.renderTitle()}

        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match ? (
              // mobile
              <ScrollableList
                numberToDisplay={this.props.numberMobile}
                touchMoveSensitivity={1}
                buttonUp={buttonUpMobile}
                buttonDown={buttonDownMobile}
                positionButtonsBelow={this.props.nextPrevButtonsForMobile}
                reverseScroll={this.props.reverseScroll}
                wrapperClassName={`${style.sliderWrapper} ${this.props.wrapperClassName}`} >
                {this.props.children}
              </ScrollableList>
            ) : (
              <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                {match =>
                  match ? (
                    // tablet
                    <ScrollableList
                      numberToDisplay={this.props.numberTablet}
                      touchMoveSensitivity={1.5}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      reverseScroll={this.props.reverseScroll}
                      wrapperClassName={`${style.sliderTabletDesktop} ${this.props.desktopWrapperClassName}`} >
                      {this.props.children}
                    </ScrollableList>
                  ) : (
                    // desktop
                    <ScrollableList
                      numberToDisplay={this.props.numberDesktop}
                      touchMoveSensitivity={2}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      reverseScroll={this.props.reverseScroll}
                      wrapperClassName={`${style.sliderTabletDesktop} ${this.props.desktopWrapperClassName}`} >
                      {this.props.children}
                    </ScrollableList>
                  )
                }
              </Media>
            )
          }
        </Media>

      </React.Fragment>
    )
  }
}

SimpleSlider.propTypes = {
  /**
   * Array of JSX elements for the scroller
   */
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  /**
   * Optional title to be displayed above the scroller
   */
  title: PropTypes.string,
  /**
   * Number of elements to display in the scroller on mobile sized devices
   */
  numberMobile: PropTypes.number,
  /**
   * Number of elements to display in the scroller on tablet sized devices
   */
  numberTablet: PropTypes.number,
  /**
   * Number of elements to display in the scroller on desktop sized devices
   */
  numberDesktop: PropTypes.number,
  /**
   * Display <Prev / Next> buttons underneath the slider on mobile
   * rather than buttons at the side
   */
  nextPrevButtonsForMobile: PropTypes.bool,
  /**
   * Reverse the direction of scroll on clicking the buttons
   */
  reverseScroll: PropTypes.bool,
  /**
   * Custom class name for the scroller's wrapper node on mobile
   */
  wrapperClassName: PropTypes.string,
  /**
   * Custom class name for the scroller's wrapper node on tablet and desktop
   */
  desktopWrapperClassName: PropTypes.string
}

SimpleSlider.defaultProps = {
  numberMobile: 2,
  numberTablet: 3,
  numberDesktop: 5
}

export default SimpleSlider
