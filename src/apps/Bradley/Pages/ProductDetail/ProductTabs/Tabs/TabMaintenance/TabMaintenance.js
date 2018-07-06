import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScreenSize } from '../../../../../../../lib/contexts/ScreenSizeContext'
import renderVideoThumbnail from '../renderVideoThumbnail'
import FileDownloadLink from '../../../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabMaintenance.scss'

class TabMaintenance extends Component {
  constructor (props) {
    super(props)

    this.columnObject = this.getColumnObject()
  }

  renderGuidesList () {
    return this.props.guides.map((guide, index) => {
      return (
        <li key={index}>
          <FileDownloadLink
            title={guide.post['post_title'] || ''}
            link={guide.meta['technical_info_pdf']}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            linkClass={tabStyle.tabTextOrangeLink}
            iconClass={tabStyle.wordPDFIcon}
          />
        </li>
      )
    })
  }

  renderGuides () {
    if (this.props.guides.length) {
      return (
        <div className={this.columnObject.class}>
          <h5 className={tabStyle.tabColTitle}>{'Guides'}</h5>
          <ul className={tabStyle.tabColUl}>{this.renderGuidesList()}</ul>
        </div>
      )
    }
  }

  renderVideos () {
    if (this.props.videos.length) {
      return (
        <div className={this.columnObject.class}>
          <div className={tabStyle.videoColMaxWidth}>
            <h5 className={tabStyle.tabColTitle}>{'Videos'}</h5>
            <div className={tabStyle.videoApectRatioWrapper}>
              <div className={tabStyle.videoAspectRatioInside}>
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
      <div className={style.tabMaintenance}>
        {this.columnObject.rows ? (
          <React.Fragment>
            <div className={`row ${tabStyle.row}`}>{this.renderGuides()}</div>
            <div className={`row ${tabStyle.row}`}>{this.renderVideos()}</div>
          </React.Fragment>
        ) : (
          <div className={`row ${tabStyle.row}`}>
            {this.renderGuides()}

            {this.renderVideos()}
          </div>
        )}
      </div>
    )
  }

  getColumnObject () {
    // start by assuming we have both columns and its not mobile
    let columnObject = {
      class: tabStyle.halfWidthColDesktopTab,
      rows: false
    }

    // if its mobile we want both columns full width in their own row
    if (this.props.screenSize === 'mobile') {
      columnObject = {
        class: tabStyle.fullWidthColDesktopTab,
        rows: true
      }
    }

    // if one of the columns is missing, we only want one row
    if (!this.props.guides.length || !this.props.videos.length) {
      columnObject = {
        class: tabStyle.fullWidthColDesktopTab,
        rows: false
      }
    }

    return columnObject
  }
}

TabMaintenance.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired,
  // from withScreenSize HOC
  screenSize: PropTypes.string
}

export default withScreenSize(TabMaintenance)
