import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabApplicationGallery.scss'

class TabApplicationGallery extends Component {
  constructor (props) {
    super(props)

    this.renderApplicationGallery = this.renderApplicationGallery.bind(this)
  }

  renderApplicationGallery () {
    return this.props.applicationGalleries.map((applicationGallery, index) => {
      return (
        <li
          key={index} >
          {applicationGallery.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={[style.tabApplicationGallery, tabStyle.fullWidthColDesktopTab].join(' ')} >
        <ul
          className={tabStyle.tabColUl} >
          {this.renderApplicationGallery()}
        </ul>
      </div>
    )
  }
}

TabApplicationGallery.propTypes = {
  applicationGalleries: PropTypes.array.isRequired
}

export default TabApplicationGallery
