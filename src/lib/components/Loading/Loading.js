// @flow
import React from 'react'
import {ReactPropTypes} from 'prop-types'
import styles from './Loading.scss'

type Props = {
  center?: boolean,
  style?: ReactPropTypes.object,
};

type State = {
  message?: string,
};

/**
 * Will be created in a future sprint with designs
 */
class Loading extends React.Component<Props, State> {
  state: State

  constructor (props: Props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  render () {
    let __styles = {}

    if (this.props.center) {
      __styles = {...__styles, display: 'block', margin: '30px auto'}
    }

    return <div className={styles.skFadingCircle} style={{...__styles, ...this.props.style}}>
      <div className={styles.skCircle}></div>
      <div className={[styles.skCircle2, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle3, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle4, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle5, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle6, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle7, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle8, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle9, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle10, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle11, styles.skCircle].join(' ')}></div>
      <div className={[styles.skCircle12, styles.skCircle].join(' ')}></div>
    </div>
  }
}

export default Loading
