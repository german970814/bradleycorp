import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import ArrowThumbnail from '../../../../../../components/Partials/ArrowThumbnail/ArrowThumbnail'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import addVideoIdFromSrc from '../../../../../../components/Partials/YoutubeThumbnail/YoutubeThumbnail'
import tabStyle from '../Tabs.scss'
import style from './TabDesign.scss'

class TabDesign extends Component {
  constructor (props) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
    this.renderLiterature = this.renderLiterature.bind(this)
    this.renderColors = this.renderColors.bind(this)
  }

  renderLinks () {
    return this.props.links.map((link, index) => {
      if (!link.text) {
        return
      }
      return (
        <li
          key={index} >
          <ArrowThumbnail
            arrowCustomClass={tabStyle.greyArrow}>
            <Link
              to={link.url}
              className={tabStyle.tabTextOrange}
              replace >
              {link.text}
            </Link>
          </ArrowThumbnail>
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

  renderLiterature () {
    return this.props.literature.map((literature, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={literature.post['post_title']}
            link={literature.meta['literature_pdf']}
            titleClass={tabStyle.tabTextOrange}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderColors () {
    return this.props.colors.map((color, index) => {
      return (
        <li
          key={index} >
          {color.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabDesign} >

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Links'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderLinks()}
          </ul>
        </div>

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderVideos()}
          </ul>
        </div>

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Literature'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderLiterature()}
          </ul>
        </div>

      </div>
    )
  }
}

TabDesign.propTypes = {
  videos: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
}

export default TabDesign
