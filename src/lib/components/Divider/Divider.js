import React from 'react'
import PropTypes from 'prop-types'
import style from './Divider.scss'

/**
 * A simple divider line to use between sections
 */
const Divider = props => {
  const inlineStyle = props.fullWidth
    ? { width: '100%', paddingLeft: '0px', paddingRight: '0px' }
    : undefined

  return (
    <div
      style={inlineStyle}
      className={`divider ${style.divider} ${props.className}`}>
      <div
        style={{
          backgroundColor: props.color
        }}
        className={style.color}
      />
    </div>
  )
}

Divider.propTypes = {
  /**
   * Extra css classes to add
   */
  className: PropTypes.string,
  /**
   * Hex color of the divider as string
   */
  color: PropTypes.string,
  /**
   * Will take fullwidth minus the theme body padding
   */
  fullWidth: PropTypes.bool
}

export default Divider
