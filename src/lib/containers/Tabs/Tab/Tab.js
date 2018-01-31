import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Tab.scss'

class Tab extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.renderUpDownArrow = this.renderUpDownArrow.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    this.props.onClick(this.props.tabIndex)
  }

  renderUpDownArrow () {
    if (this.props.isDesktop) {
      return
    }

    return this.props.isOpen
      ? <img src={require('../../../../images/icon-arrow/icon-arrow-up@2x.png')} />
      : <img src={require('../../../../images/icon-arrow/icon-arrow-down@2x.png')} />
  }

  render () {
    const active = this.props.isActive ? style.active : ''
    const tabClass = this.props.isDesktop ? [style.tab, style.tabDesktop].join(' ') : style.tab
    const inlineStyle = {
      width: this.props.tabWidth
    }

    return (
      <li
        style={inlineStyle}
        className={[tabClass, `${this.props.tabClassName} ${active}`].join(' ')}
        onClick={(e) => { this.handleClick(e) }} >
        <span>{this.props.text}</span>
        {this.renderUpDownArrow()}
      </li>
    )
  }
}

Tab.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  tabClassName: PropTypes.string,
  tabWidth: PropTypes.string
}

export default Tab
