// @flow
import * as React from 'react'
import style from './ShippingInfoDisplayBox.scss'

type Props = {
  title: string,
  children: React.Node
}

class ShippingInfoDisplayBox extends React.Component<Props> {
  render () {
    return (
      <div className={style.shippingInfo}>
        <h5 className={style.title}>{this.props.title}</h5>
        <div className={style.contentContainer}>{this.props.children}</div>
      </div>
    )
  }
}

export default ShippingInfoDisplayBox
