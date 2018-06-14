// @flow
import * as React from 'react'
import style from './Tab.scss'

type Props = {
  children: React.Node,
  text: string,
  isDesktop?: boolean,
  isOpen?: boolean,
  tabWidth?: string,
  iconStyle?: 'arrow' | 'plus',
  cantOpen?: boolean,
  // passed by Tabs component
  onClick?: (tabIndex: number) => void,
  tabIndex?: number,
  isActive?: boolean,
  tabClassName?: string
}

class Tab extends React.Component<Props> {
  handleClick: (e: SyntheticEvent<HTMLDivElement>) => void

  constructor (props: Props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e: SyntheticEvent<HTMLDivElement>) {
    e.preventDefault()

    if (this.props.cantOpen) {
      return
    }

    this.props.onClick && this.props.onClick(this.props.tabIndex || 0)
  }

  renderUpDownArrow () {
    if (this.props.isDesktop || this.props.cantOpen) {
      return
    }

    if (this.props.iconStyle === 'plus') {
      return (
        <div className={`bcorp-tab-open-close-icon ${style.openCloseIcon}`}>
          {this.props.isOpen ? '--' : '+'}
        </div>
      )
    } else {
      return (
        <img
          src={
            this.props.isOpen
              ? require('../../../../images/icon-arrow/icon-arrow-up@2x.png')
              : require('../../../../images/icon-arrow/icon-arrow-down@2x.png')
          }
        />
      )
    }
  }

  render () {
    const active =
      this.props.isActive && !this.props.cantOpen ? style.active : ''
    const inlineStyle = {
      width: this.props.tabWidth
    }

    return (
      <li
        style={inlineStyle}
        className={`${style.tab} ${this.props.tabClassName || ''} ${active}`}
        onClick={e => {
          this.handleClick(e)
        }}>
        <h5 className={`tab-text ${style.tabText}`}>{this.props.text}</h5>
        {this.renderUpDownArrow()}
      </li>
    )
  }
}

export default Tab
