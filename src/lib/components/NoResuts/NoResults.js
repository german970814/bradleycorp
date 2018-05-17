// @flow
import * as React from 'react'
import style from './NoResults.scss'

type Props = {
  message: string
}

class NoResults extends React.Component<Props> {
  render () {
    return <div className={'row'}>
      <div className={`${style.noResultsWrapper}`}>
        <img src={require('../../../images/warning-icon/warning-icon.png')} />
        <h1>{this.props.message}</h1>
        <span>PLEASE TRY AGAIN</span>
      </div>
    </div>
  }
}

export default NoResults
  