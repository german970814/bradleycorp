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

  renderVideos () {
    if (this.props.videos.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <div
            className={tabStyle.videoColMaxWidth} >
            <h5
              className={tabStyle.tabColTitle} >
              {'Videos'}
            </h5>
            <div
              className={tabStyle.videoApectRatioWrapper} >
              <div
                className={tabStyle.videoAspectRatioInside}>
                {renderVideoThumbnail(this.props.videos)}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.tabMaintenance} >

        {this.renderGuides()}

        {this.renderVideos()}

      </div>
    )
  }
}

TabMaintenance.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabMaintenance
