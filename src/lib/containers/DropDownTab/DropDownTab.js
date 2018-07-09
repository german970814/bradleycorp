// @flow
import React, { Component } from 'react'
import Divider from '../../components/Divider/Divider'
import ContentTransformer from '../../components/ContentTransformer/ContentTransformer'
import style from './DropDownTab.scss'

/**
 * A simple tab with just a title and an arrow that, when clicked,
 * open and closes a div underneath containing a string.
 */

type Props = {
  title: string,
  content: string
}

type State = {
  open: boolean
}

class DropDownTab extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggleOpen (event: SyntheticEvent<HTMLDivElement>) {
    this.setState({ open: !this.state.open })
  }

  renderUpDownArrow () {
    return this.state.open ? (
      <img
        className={style.arrow}
        src={require('../../../images/icon-arrow/icon-arrow-up@2x.png')}
      />
    ) : (
      <img
        className={style.arrow}
        src={require('../../../images/icon-arrow/icon-arrow-down@2x.png')}
      />
    )
  }

  renderContent () {
    return this.state.open ? (
      <div className={style.content}>
        <ContentTransformer
          content={decodeURIComponent(
            this.props.content.replace(/%/g, encodeURIComponent('%'))
          )}
        />
      </div>
    ) : null
  }

  render () {
    return (
      <div className={`drop-down-tab ${style.DropDownTab}`}>
        <div className={style.tab}>
          <div
            className={style.titleArrowGroup}
            onClick={this.toggleOpen.bind(this)}>
            <h5 className={`${style.title}`}>{this.props.title}</h5>
            {this.renderUpDownArrow()}
          </div>
          {this.renderContent()}
        </div>
        <Divider fullWidth />
      </div>
    )
  }
}

export default DropDownTab
