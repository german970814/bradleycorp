// @flow
import * as React from 'react'
import style from './ShipmentContent.scss'

const ShipmentLegal = () => {
  return (
    <div className={style.legalWrapper}>
      <p className={`legal ${style.legal}`}>
        {
          'Note: Most orders ship within 2 business days. Larger orders may require additional processing time.'
        }
      </p>
      <p className={`legal ${style.legal}`}>
        {'For questions about your order, please contact '}
        <a href="mailto:litrequest@bradleycorp.com">
          {'litrequest@bradleycorp.com'}
        </a>
      </p>
      <p className={`legal ${style.legal}`}>
        {
          'Please include the order number provided at the end of this transaction.'
        }
      </p>
    </div>
  )
}

export default ShipmentLegal
