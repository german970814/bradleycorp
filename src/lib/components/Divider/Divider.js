import React from 'react'
import PropTypes from 'prop-types'
import style from './Divider.scss'

const Divider = props => {
  const inlineStyle = props.fullWidth
    ? { width: '100%', paddingLeft: '0px', paddingRight: '0px' }
    : undefined

  return (
    <div
      style={inlineStyle}
      className={`divider ${style.divider} ${props.customClass}`} >
      <div
        style={{
          color: props.color
        }}
        className={style.color} />
    </div>
  )
}

Divider.propTypes = {
  customClass: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool
}

export default Divider
