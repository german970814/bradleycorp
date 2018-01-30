import React from 'react'
import PropTypes from 'prop-types'
import style from './Divider.scss'

const Divider = props => {
  return (
    <div
      className={`${style.divider} ${props.customClass}`} >
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
  color: PropTypes.string
}

export default Divider
