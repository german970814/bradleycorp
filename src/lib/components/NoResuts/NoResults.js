// @flow
import * as React from 'react'
import Media from 'react-media'
import style from './Results.scss'

type Props = {
    children: React.ChildrenArray<React.Element<any>>,
    colClasses: Array<string>,
    message: string
  }
  
  /**
   * Given a number of child elements,
   * this component renders them into columns of user defined width.
   */
  class NoResults extends React.Component<Props> {
    renderNoResults () {
        return <div className={`${style.noResultsWrapper}`}>
          <img src={require('../../../images/warning-icon/warning-icon.png')} />
          <h1>{this.props.message}</h1>
          <span>PLEASE TRY AGAIN</span>
        </div>
      }
  
    render () {
      return <div className={'row'}>{this.renderNoResults()}</div>
    }
  }
  
  export default NoResults
  