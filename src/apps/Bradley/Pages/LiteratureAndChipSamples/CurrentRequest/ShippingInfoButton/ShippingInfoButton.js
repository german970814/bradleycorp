// @flow
import React from 'react'
import style from './ShippingInfoButton.scss'

type Props = {
  onClick?: () => void
}

const ShippingInfoButton = (props: Props) => {
  return (
    <div className={style.buttonWrapper}>
      <button onClick={props.onClick} className={style.button}>
        {'ENTER SHIPPING INFO'}
      </button>
    </div>
  )
}

export default ShippingInfoButton
