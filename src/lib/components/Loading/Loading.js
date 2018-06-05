import React from 'react'
import styles from './Loading.scss'

/**
 * Will be created in a future sprint with designs
 */
const Loading = props => {
  return (
    <div className={styles.skFadingCircle}>
      <div className={styles.skCircle} />
      <div className={[styles.skCircle2, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle3, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle4, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle5, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle6, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle7, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle8, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle9, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle10, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle11, styles.skCircle].join(' ')} />
      <div className={[styles.skCircle12, styles.skCircle].join(' ')} />
    </div>
  )
}

export default Loading
