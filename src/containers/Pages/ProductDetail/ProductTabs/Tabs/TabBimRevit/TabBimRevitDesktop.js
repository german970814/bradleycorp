import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabBimRevitDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderBimRevit = this.renderBimRevit.bind(this)
  }

  renderBimRevit () {
    return this.props.bimRevit.map((bimRevit, index) => {
      return (
        <li
          key={index} >
          {bimRevit.name}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderBimRevit()}
      </div>
    )
  }
}

TabBimRevitDesktop.propTypes = {
  bimRevit: PropTypes.array.isRequired
}

export default TabBimRevitDesktop
