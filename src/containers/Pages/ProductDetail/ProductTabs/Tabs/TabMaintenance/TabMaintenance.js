import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderVideoThumbnail from '../renderVideoThumbnail'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabMaintenance.scss'

class TabMaintenance extends Component {
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
          <FileDownloadLink
            title={guide.name}
            link={guide.description}
            titleClass={tabStyle.tabTextOrange}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderVideos () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          {renderVideoThumbnail(video.meta['video_gallery_video'])}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabMaintenance} >

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Guides'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderGuides()}
          </ul>
        </div>

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderVideos()}
          </ul>
        </div>

      </div>
    )
  }
}

TabMaintenance.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabMaintenance
