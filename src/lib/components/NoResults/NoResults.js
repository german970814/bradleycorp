// @flow
import * as React from 'react'
import style from './NoResults.scss'

type Props = {
  message: string,
  className?: string
}

class NoResults extends React.Component<Props> {
  render () {
    return (
      <div className={`row ${this.props.className || ''}`}>
        <div className={`col1 ${style.noResultsWrapper}`}>
          <img src={require('../../../images/warning-icon/warning-icon.png')} />
          <h1>{this.props.message}</h1>
          <h6>PLEASE TRY AGAIN</h6>
        </div>
      </div>
    )
  }
}

export default NoResults
