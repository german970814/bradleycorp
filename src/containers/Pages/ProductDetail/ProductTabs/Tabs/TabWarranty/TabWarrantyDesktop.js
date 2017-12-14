import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabWarrantyDesktop extends Component {
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
      <div>
        {this.renderWarranty()}
      </div>
    )
  }
}

TabWarrantyDesktop.propTypes = {
  warranty: PropTypes.array.isRequired
}

export default TabWarrantyDesktop
