// @flow
import * as React from 'react'
import style from './ShippingInfoOrderProcessed.scss'

type Props = {
  id: number
}

const ShippingInfoOrderProcessed = (props: Props) => {
  return (
    <div className={style.orderProcessed}>
      <div className={style.text}>
        {
          'Thank you for your order. Please expect an email confirmation of this order within 2-4 hours.'
        }
      </div>
      <h6>{'ORDER NUMBER'}</h6>
      <h5>{props.id}</h5>
      <div className={style.buttonWrapper}>
        <button>{'PRINT ORDER CONFIRMATION'}</button>
      </div>
    </div>
  )
}

export default ShippingInfoOrderProcessed
