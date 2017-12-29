import React from 'react'
import PropTypes from 'prop-types'
import style from './Divider.scss'

const Divider = props => {
  return (
    <div
      className={[style.divider, props.customClass].join(' ')} >
      <div className={style.color} />
    </div>
  )
}

Divider.propTypes = {
  customClass: PropTypes.string
}

export default Divider
