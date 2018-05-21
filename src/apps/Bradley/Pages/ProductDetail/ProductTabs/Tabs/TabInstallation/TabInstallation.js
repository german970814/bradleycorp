import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderVideoThumbnail from '../renderVideoThumbnail'
import FileDownloadLink from '../../../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabInstallation.scss'

class TabInstallation extends Component {
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
            title={guide.post['post_title'] || ''}
            link={guide.meta['technical_info_pdf']}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            linkClass={tabStyle.tabTextOrangeLink}
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
            {'Manuals'}
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
