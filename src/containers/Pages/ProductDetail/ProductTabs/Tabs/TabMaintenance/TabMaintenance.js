import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import addVideoIdFromSrc from '../../../../../../components/Partials/YoutubeThumbnail/YoutubeThumbnail'
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
      const youtubeOpts = {
        playerVars: {
          autoplay: 0,
          showinfo: 0
        }
      }
      const YoutubeThumbnail = addVideoIdFromSrc(YouTube, video.meta['video_gallery_video'])

      return (
        <li
          key={index} >
          <YoutubeThumbnail
            className={tabStyle.videoIframe}
            opts={youtubeOpts} />
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
