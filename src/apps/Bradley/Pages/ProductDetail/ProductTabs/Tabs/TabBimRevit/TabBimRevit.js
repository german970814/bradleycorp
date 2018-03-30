import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabBimRevit.scss'

class TabBimRevit extends Component {
  renderBimRevit () {
    return this.props.bimRevit.map((bimRevit, index) => {
      return (
        <li
          key={index} >
          <h5
            className={tabStyle.tabColTitle} >
            {bimRevit.name}
          </h5>
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={[style.tabBimRevit, tabStyle.fullWidthColDesktopTab].join(' ')} >
        <ul
          className={tabStyle.tabColUl} >
          {this.renderBimRevit()}
        </ul>
      </div>
    )
  }
}

TabBimRevit.propTypes = {
  bimRevit: PropTypes.array.isRequired
}

export default TabBimRevit
