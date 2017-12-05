import React, { Component } from 'react'
import PropTypes from 'prop-types'



class Tab extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    this.props.onClick(this.props.tabIndex)
  }

  render() {
    return (
      <li className="tab">
        <a
          onClick={(e) => { this.handleClick(e) }}>
          CLICK
        </a>
      </li>
    )
  }

}

Tab.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
}

export default Tab
