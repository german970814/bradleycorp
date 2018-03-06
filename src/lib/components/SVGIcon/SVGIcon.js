import React from 'react'
import PropTypes from 'prop-types'

const icons = {
  arrow: 'M391.6 388.5l27.3-29.7-27.3-27.3M418.9 358.8H301.1'
}

const SVGIcon = props => (
  <svg width={props.width} height={props.height} viewBox="0 0 1024 1024">
    <path d={icons[props.icon]} className={props.className}></path>
  </svg>
)

SVGIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

SVGIcon.defaultProps = {
  width: '41',
  height: '20'
}

export default SVGIcon
