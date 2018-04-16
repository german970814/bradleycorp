// @flow
import React from 'react'
import style from './MobileShowCurrentRequestButton.scss'

type Props = {
  mobileShowCurrentRequest: boolean,
  updateMobileShowCurrentRequest: (newValue: boolean) => void
}

const MobileShowCurrentRequestButton = (props: Props) => {
  return (
    <div
      onClick={() =>
        props.updateMobileShowCurrentRequest(!props.mobileShowCurrentRequest)
      }
      className={`row ${style.mobileShowCurrentRequestButton}`}>
      <h6 className={`col1 ${style.title}`}>
        {props.mobileShowCurrentRequest
          ? 'BACK TO OPTIONS'
          : 'VIEW CURRENT REQUEST'}
      </h6>
      {props.mobileShowCurrentRequest ? (
        <img
          className={`${style.arrowLeft} ${style.arrow}`}
          src={require('../../../../../images/slideshow-arrow/slideshow-arrow-l@2x.png')}
        />
      ) : (
        <img
          className={`${style.arrowRight} ${style.arrow}`}
          src={require('../../../../../images/slideshow-arrow/slideshow-arrow-r@2x.png')}
        />
      )}
    </div>
  )
}

export default MobileShowCurrentRequestButton
