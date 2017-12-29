import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabInstallation.scss'

class TabInstallation extends Component {
  constructor (props) {
    super(props)

    this.renderGuides = this.renderGuides.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
  }

  renderGuides () {
    return this.props.guides.map((guide, index) => {
      return (
        <li
          key={index} >
          {guide['term_id']}
        </li>
      )
    })
  }

  renderVideos () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          <iframe src={video} />
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabInstallation}>

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Guides'}
          </h5>
          <ul>
            {this.renderGuides()}
          </ul>
        </div>

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul>
            {this.renderVideos()}
          </ul>
        </div>

      </div>
    )
  }
}

TabInstallation.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabInstallation
