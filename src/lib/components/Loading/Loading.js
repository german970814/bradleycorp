// @flow
import React from 'react'
import style from './Loading.scss'

type Props = {
  pageSize?: boolean,
  style?: {}
}

type State = {
  message?: string
}

class Loading extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  render () {
    return (
      <div
        className={`${style.skFadingCircle} ${
          this.props.pageSize ? style.pageSize : ''
        }`}
        style={this.props.style}>
        <div className={style.skCircle} />
        <div className={[style.skCircle2, style.skCircle].join(' ')} />
        <div className={[style.skCircle3, style.skCircle].join(' ')} />
        <div className={[style.skCircle4, style.skCircle].join(' ')} />
        <div className={[style.skCircle5, style.skCircle].join(' ')} />
        <div className={[style.skCircle6, style.skCircle].join(' ')} />
        <div className={[style.skCircle7, style.skCircle].join(' ')} />
        <div className={[style.skCircle8, style.skCircle].join(' ')} />
        <div className={[style.skCircle9, style.skCircle].join(' ')} />
        <div className={[style.skCircle10, style.skCircle].join(' ')} />
        <div className={[style.skCircle11, style.skCircle].join(' ')} />
        <div className={[style.skCircle12, style.skCircle].join(' ')} />
      </div>
    )
  }
}

export default Loading
