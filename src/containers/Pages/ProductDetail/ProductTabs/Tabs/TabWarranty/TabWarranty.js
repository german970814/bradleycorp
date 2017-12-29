import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabWarranty.scss'

class TabWarranty extends Component {
  constructor (props) {
    super(props)

    this.renderWarranty = this.renderWarranty.bind(this)
  }

  renderWarranty () {
    return this.props.warranty.map((warranty, index) => {
      return (
        <li
          key={index} >
          {warranty.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={[style.tabWarranty, tabStyle.fullWidthColDesktopTab].join(' ')}>
        <h5
          className={tabStyle.tabColTitle} >
          {'Warranty'}
        </h5>
        {this.renderWarranty()}
      </div>
    )
  }
}

TabWarranty.propTypes = {
  warranty: PropTypes.array.isRequired
}

export default TabWarranty
