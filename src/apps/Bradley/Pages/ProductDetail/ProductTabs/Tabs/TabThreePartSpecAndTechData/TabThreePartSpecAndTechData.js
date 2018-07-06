import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScreenSize } from '../../../../../../../lib/contexts/ScreenSizeContext'
import tabStyle from '../Tabs.scss'
import FileDownloadLink from '../../../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import style from './TabThreePartSpecAndTechData.scss'

class TabThreePartSpecAndTechData extends Component {
  constructor (props) {
    super(props)

    this.columnObject = this.getColumnObject()
  }

  renderThreePartSpecList () {
    return this.props.threePartSpec.map((threePartSpec, index) => {
      return (
        <li key={index}>
          <FileDownloadLink
            title={threePartSpec.post['post_title'] || ''}
            link={threePartSpec.meta['technical_info_pdf']}
            linkClass={tabStyle.tabTextOrangeLink}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            iconClass={tabStyle.wordPDFIcon}
          />
        </li>
      )
    })
  }

  renderThreePartSpec () {
    if (this.props.threePartSpec.length) {
      return (
        <div className={this.columnObject.class}>
          <h5 className={tabStyle.tabColTitle}>{'3-Part Spec'}</h5>
          <ul className={tabStyle.tabColUl}>
            {this.renderThreePartSpecList()}
          </ul>
        </div>
      )
    }
  }

  renderTechnicalDataList () {
    return this.props.technicalData.map((technicalData, index) => {
      return (
        <li key={index}>
          <FileDownloadLink
            title={technicalData.post['post_title'] || ''}
            link={technicalData.meta['technical_info_pdf']}
            linkClass={tabStyle.tabTextOrangeLink}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            iconClass={tabStyle.wordPDFIcon}
          />
        </li>
      )
    })
  }

  renderTechnicalData () {
    if (this.props.technicalData.length) {
      return (
        <div className={this.columnObject.class}>
          <h5 className={tabStyle.tabColTitle}>{'Technical Data'}</h5>
          <ul className={tabStyle.tabColUl}>
            {this.renderTechnicalDataList()}
          </ul>
        </div>
      )
    }
  }

  render () {
    return (
      <div className={style.tabThreePartSpecAndTechData}>
        {this.columnObject.rows ? (
          <React.Fragment>
            <div className={`row ${tabStyle.row}`}>
              {this.renderThreePartSpec()}
            </div>
            <div className={`row ${tabStyle.row}`}>
              {this.renderTechnicalData()}
            </div>
          </React.Fragment>
        ) : (
          <div className={`row ${tabStyle.row}`}>
            {this.renderThreePartSpec()}

            {this.renderTechnicalData()}
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
    if (!this.props.technicalData.length || !this.props.threePartSpec.length) {
      columnObject = {
        class: tabStyle.fullWidthColDesktopTab,
        rows: false
      }
    }

    return columnObject
  }
}

TabThreePartSpecAndTechData.propTypes = {
  threePartSpec: PropTypes.array.isRequired,
  technicalData: PropTypes.array.isRequired,
  // from withScreenSize HOC
  screenSize: PropTypes.string
}

export default withScreenSize(TabThreePartSpecAndTechData)
