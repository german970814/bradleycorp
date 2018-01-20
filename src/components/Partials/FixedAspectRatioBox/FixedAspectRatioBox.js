import React from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../VerticalAlignHelper/VerticalAlignHelper'
import style from './FixedAspectRatioBox.scss'

const FixedAspectRatioBox = props => {
  const aspectRatio100 = props.aspectRatio < 1
    ? props.aspectRatio * 100
    : props.aspectRatio

  const aspectRatio = `${aspectRatio100}%`
  const aspectRatioInverse = 100 / aspectRatio100

  return (
    <React.Fragment>

      <VerticalAlignHelper />

      <div
        style={{
          paddingTop: aspectRatio,
          verticalAlign: props.verticalAlign
        }}
        className={`${style.aspectRatioBox} aspect-ratio-box`} >

        <div
          className={`${style.aspectRatioBoxContent} aspect-ratio-box-content`} >

          {/* this height controller div takes over the sizing when window height becomes significantly smaller than width */}
          <div
            style={{
              maxHeight: `calc(${props.maxHeight})`,
              maxWidth: `calc((${props.maxHeight}) * ${aspectRatioInverse})`
            }}
            className={`${style.aspectRatioBoxHeightController} aspect-ratio-box-height-controller`} >

            {props.children}

          </div>

        </div>

      </div>

    </React.Fragment>
  )
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
  maxHeight: '100vh',
  /*
    if we want to pass a calc() string, pass the contents of the calc only
    eg. 'calc(100vh - 20px)' => '100vh - 20px'
   */
  aspectRatio: 56.25,
  /* defaults to youtube aspect ratio */
  verticalAlign: 'middle'
}

export default FixedAspectRatioBox
