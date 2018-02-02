import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../VerticalAlignHelper/VerticalAlignHelper'
import style from './FixedAspectRatioBox.scss'

class FixedAspectRatioBox extends Component {
  render () {
    const aspectRatio100 = this.props.aspectRatio < 1
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
          className={`${style.aspectRatioBox} aspect-ratio-box`} >

          <div
            className={`${style.aspectRatioBoxContent} aspect-ratio-box-content`} >

            {/* this height controller div takes over the sizing when window height becomes significantly smaller than width */}
            <div
              style={{
                maxHeight: `calc(${this.props.maxHeight})`,
                maxWidth: `calc((${this.props.maxHeight}) * ${aspectRatioInverse})`
              }}
              className={`${style.aspectRatioBoxHeightController} aspect-ratio-box-height-controller`} >

              {this.props.children}

            </div>

          </div>

        </div>

      </React.Fragment>
    )
  }
}

FixedAspectRatioBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  maxHeight: PropTypes.string,
  aspectRatio: PropTypes.number,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
}

FixedAspectRatioBox.defaultProps = {
  /*
    if we want to pass a calc() string, pass the contents of the calc only
    eg. 'calc(100vh - 20px)' => '100vh - 20px'
   */
  maxHeight: '100vh',
  /* defaults to youtube aspect ratio */
  aspectRatio: 56.25,
  verticalAlign: 'middle'
}

export default FixedAspectRatioBox
