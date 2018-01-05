import React from 'react'
import PropTypes from 'prop-types'
import style from './Lightbox.scss'

const LightboxCloseButton = props => {
  return (
    <div
      className={style.closeButtonWrapper}
      onClick={props.onClick} >
      <img
        className={style.closeButton}
        src={require('../../../images/icon-close/icon-close@2x.png')} />
    </div>
  )
}

LightboxCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default LightboxCloseButton
