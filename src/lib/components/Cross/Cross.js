// @flow
import * as React from 'react'
import style from './Cross.scss'

type Props = {
  onClick?: () => void,
  // height will be equal width,
  // this is the number of pixels for one side of a square containing the cross
  size: number
}

class Cross extends React.PureComponent<Props> {
  render () {
    return (
      <div
        style={{
          width: `${this.props.size}px`,
          height: `${this.props.size}px`
        }}
        className={style.crossWrapper}
        onClick={this.props.onClick}>
        <div className={style.cross} />
      </div>
    )
  }
}

export default Cross
