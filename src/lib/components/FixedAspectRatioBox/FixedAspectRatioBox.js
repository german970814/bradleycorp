import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../VerticalAlignHelper/VerticalAlignHelper'
import style from './FixedAspectRatioBox.scss'

/**
 * Creates a box that keeps the same aspect ratio regardless of screen size
 */
class FixedAspectRatioBox extends Component {
  render () {
    const aspectRatio100 =
      this.props.aspectRatio < 1
        ? this.props.aspectRatio * 100
        : this.props.aspectRatio

    const aspectRatio = `${aspectRatio100}%`
    const aspectRatioInverse = 100 / aspectRatio100

    return (
      <React.Fragment>
        <VerticalAlignHelper />

        <div
          style={{
            paddingTop: aspectRatio,
            verticalAlign: this.props.verticalAlign
          }}
          className={`${style.aspectRatioBox} aspect-ratio-box`}>
          <div
            className={`${
              style.aspectRatioBoxContent
            } aspect-ratio-box-content`}>
            {/* this height controller div takes over the sizing when window height becomes significantly smaller than width */}
            <div
              style={{
                maxHeight: `calc(${this.props.maxHeight})`,
                maxWidth: `calc((${
                  this.props.maxHeight
                }) * ${aspectRatioInverse})`
              }}
              className={`${
                style.aspectRatioBoxHeightController
              } aspect-ratio-box-height-controller`}>
              {this.props.children}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

FixedAspectRatioBox.propTypes = {
  /**
   * Content for the box.
   * Usually this is something we want to give an aspect ratio, so it would have width and height 100%.
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  /**
   * If we have strange screen sizes (very thin but wide) this ensures we keep the aspect ratio.
   * Usually best to leave it as default.
   */
  maxHeight: PropTypes.string,
  /**
   *  The aspect ratio as a decimal, or number between 1 and 100 representing a percentage
   *  YouTube default is 56.25%
   */
  aspectRatio: PropTypes.number,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
}

FixedAspectRatioBox.defaultProps = {
  /**
    if we want to pass a calc() string, pass the contents of the calc only
    eg. 'calc(100vh - 20px)' => '100vh - 20px'
   */
  maxHeight: '100vh',
  aspectRatio: 56.25,
  verticalAlign: 'middle'
}

export default FixedAspectRatioBox
