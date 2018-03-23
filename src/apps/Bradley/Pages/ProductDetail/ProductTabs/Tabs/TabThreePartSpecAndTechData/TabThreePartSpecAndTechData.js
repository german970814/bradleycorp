import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import FileDownloadLink from '../../../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import style from './TabThreePartSpecAndTechData.scss'

class TabThreePartSpecAndTechData extends Component {
  constructor (props) {
    super(props)

    this.renderThreePartSpec = this.renderThreePartSpec.bind(this)
    this.renderTechnicalData = this.renderTechnicalData.bind(this)
  }

  getColumnWidth () {
    return this.props.threePartSpec.length && this.props.technicalData.length
      ? tabStyle.halfWidthColDesktopTab
      : tabStyle.fullWidthColDesktopTab
  }

  renderThreePartSpecList () {
    return this.props.threePartSpec.map((threePartSpec, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={threePartSpec.post['post_title'] || ''}
            link={threePartSpec.meta['technical_info_pdf']}
            linkClass={tabStyle.tabTextOrangeLink}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderThreePartSpec () {
    if (this.props.threePartSpec.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={tabStyle.tabColTitle} >
            {'3-Part Spec'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderThreePartSpecList()}
          </ul>
        </div>
      )
    }
  }

  renderTechnicalDataList () {
    return this.props.technicalData.map((technicalData, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={technicalData.post['post_title'] || ''}
            link={technicalData.meta['technical_info_pdf']}
            linkClass={tabStyle.tabTextOrangeLink}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderTechnicalData () {
    if (this.props.technicalData.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Technical Data'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderTechnicalDataList()}
          </ul>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.tabThreePartSpecAndTechData}>

        {this.renderThreePartSpec()}

        {this.renderTechnicalData()}

      </div>
    )
  }
}

TabThreePartSpecAndTechData.propTypes = {
  threePartSpec: PropTypes.array.isRequired,
  technicalData: PropTypes.array.isRequired
}

export default TabThreePartSpecAndTechData
