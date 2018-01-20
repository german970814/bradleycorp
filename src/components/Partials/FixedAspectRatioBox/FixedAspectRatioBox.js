import React from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../VerticalAlignHelper/VerticalAlignHelper'
import style from './FixedAspectRatioBox.scss'

const FixedAspectRatioBox = props => {
  const aspectRatio = props.aspectRatio < 1
    ? `${props.aspectRatio * 100}%`
    : `${props.aspectRatio}%`

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

          {props.children}

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
  aspectRatio: PropTypes.number,
  verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
}

FixedAspectRatioBox.defaultProps = {
  aspectRatio: 56.25, /* defaults to youtube aspect ratio */
  verticalAlign: 'middle'
}

export default FixedAspectRatioBox
