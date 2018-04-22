// @flow
import React from 'react'
import style from './ShippingInfoButton.scss'

type Props = {
  onClick?: () => void,
  text: string
}

const ShippingInfoButton = (props: Props) => {
  return (
    <div className={style.buttonWrapper}>
      <button onClick={props.onClick} className={style.button}>
        {props.text}
      </button>
    </div>
  )
}

export default ShippingInfoButton
