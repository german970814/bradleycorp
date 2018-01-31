import React from 'react'
import PropTypes from 'prop-types'
import style from './PositionCircle.scss'

const PositionCircle = props => {
  const activeClass = props.selected
    ? style.active
    : style.notActive
  return (
    <div
      className={activeClass}
      onClick={(e) => props.onClick(e)}>
    </div>
  )
}

PositionCircle.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default PositionCircle
