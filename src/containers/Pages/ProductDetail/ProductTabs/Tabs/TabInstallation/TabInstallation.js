import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderVideoThumbnail from '../renderVideoThumbnail'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabInstallation.scss'

class TabInstallation extends Component {
  constructor (props) {
    super(props)

    this.renderGuides = this.renderGuides.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
  }

  getColumnWidth () {
    return this.props.guides.length && this.props.videos.length
      ? tabStyle.halfWidthColDesktopTab
      : tabStyle.fullWidthColDesktopTab
  }

  renderGuidesList () {
    return this.props.guides.map((guide, index) => {
      return (
        <li
          key={index} >
          <FileDownloadLink
            title={guide.name}
            link={guide.description}
            titleClass={tabStyle.tabTextOrange}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderGuides () {
    if (this.props.guides.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Guides'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderGuidesList()}
          </ul>
        </div>
      )
    }
  }

  renderVideosList () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          {renderVideoThumbnail(video.meta['video_gallery_video'])}
        </li>
      )
    })
  }

  renderVideos () {
    if (this.props.videos.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderVideosList()}
          </ul>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.tabInstallation}>

        {this.renderGuides()}

        {this.renderVideos()}

      </div>
    )
  }
}

TabInstallation.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabInstallation
