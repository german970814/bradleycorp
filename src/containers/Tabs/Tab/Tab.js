import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Tab.scss'

class Tab extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    this.props.onClick(this.props.tabIndex)
  }

  render () {
    const active = this.props.isActive ? style.active : ''
    return (
      <li
        className={`tab ${this.props.tabClassName} ${active}`}
        onClick={(e) => { this.handleClick(e) }} >
        {this.props.text}
      </li>
    )
  }
}

Tab.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  tabClassName: PropTypes.string
}

export default Tab
