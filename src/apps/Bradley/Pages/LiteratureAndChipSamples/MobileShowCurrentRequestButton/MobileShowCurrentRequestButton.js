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
    </div>
  )
}

export default MobileShowCurrentRequestButton
