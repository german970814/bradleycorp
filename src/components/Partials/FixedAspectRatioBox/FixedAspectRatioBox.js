import React from 'react'
import PropTypes from 'prop-types'
import style from './FixedAspectRatioBox.scss'

const FixedAspectRatioBox = props => {
  const aspectRatio = props.aspectRatio < 1
    ? `${props.aspectRatio * 100}%`
    : `${props.aspectRatio}%`

  console.log(props.children)

  return (
    <div
      style={{
        paddingTop: aspectRatio
      }}
      className={`${style.aspectRatioBox} aspect-ratio-box`} >

      <div
        className={`${style.aspectRatioBoxContent} aspect-ratio-box-content`} >

        {props.children}

      </div>

    </div>
  )
}

FixedAspectRatioBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  aspectRatio: PropTypes.number
}

FixedAspectRatioBox.defaultProps = {
  aspectRatio: 56.25 // defaults to youtube aspect ratio
}

export default FixedAspectRatioBox
