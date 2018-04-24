// @flow
import * as React from 'react'
import style from './ShippingInfoOrderProcessed.scss'

type Props = {}

const ShippingInfoOrderProcessed = (props: Props) => {
  return (
    <div className={style.orderProcessed}>
      <div className={style.text}>
        {
          'Thank you for your order. Please expect an email confirmation of this order within 2-4 hours.'
        }
      </div>
      <h6>{'ORDER NUMBER'}</h6>
      <h5>{'#1234567890-AJS1231817'}</h5>
      <div className={style.buttonWrapper}>
        <button>{'PRINT ORDER CONFIRMATION'}</button>
      </div>
    </div>
  )
}

export default ShippingInfoOrderProcessed
