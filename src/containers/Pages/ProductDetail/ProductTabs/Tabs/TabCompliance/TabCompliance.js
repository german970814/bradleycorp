import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileDownloadLink from '../../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabCompliance.scss'

class TabCompliance extends Component {
  constructor (props) {
    super(props)

    this.renderCompliance = this.renderCompliance.bind(this)
    this.renderComplianceLinks = this.renderComplianceLinks.bind(this)
    this.renderComplianceIcons = this.renderComplianceIcons.bind(this)
    this.renderComplianceIconsHtml = this.renderComplianceIconsHtml.bind(this)
  }

  renderCompliance () {
    if (this.props.compliance.compliance.length) {
      return (
        <div
          className={[tabStyle.halfWidthColDesktopTab, style.complianceSide].join(' ')} >
          <h5
            className={tabStyle.tabColTitle}>
            {'Compliance'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderComplianceLinks()}
          </ul>
        </div>
      )
    }
  }

  renderComplianceLinks () {
    return this.props.compliance.compliance.map((compliance, index) => {
      return (
        <li
          key={index} >
          <FileDownloadLink
            title={compliance.post['post_title'] || ''}
            link={compliance.meta['technical_info_pdf']}
            titleClass={tabStyle.tabTextOrange}
            linkClass={tabStyle.tabTextOrangeLink}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderComplianceIcons () {
    if (this.props.compliance.compliance_icons.length) {
      return (
        <div
          className={[tabStyle.halfWidthColDesktopTab, style.iconSide].join(' ')} >

          <ul
            className={tabStyle.tabColUl} >
            {this.renderComplianceIconsHtml()}
          </ul>
        </div>
      )
    }
  }

  renderComplianceIconsHtml () {
    return this.props.compliance.compliance_icons.map((icon, index) => {
      if (typeof icon.media === 'undefined' &&
        !icon.media.featured_image.length) {
        return
      }
      return (
        <li
          key={index}
          className={style.complianceIcon}>
          {(icon.meta && icon.meta.compliance_link.length)
            ? <a
              href={icon.meta.compliance_link}
              className={style.complianceLink}
              target="_blank" >
              <img
                src={icon.media.featured_image[0]} />
            </a>
            : <img
              src={icon.media.featured_image[0]} />}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabCompliance} >

        {this.renderCompliance()}

        {this.renderComplianceIcons()}

      </div>
    )
  }
}

TabCompliance.propTypes = {
  compliance: PropTypes.object.isRequired
}

export default TabCompliance
