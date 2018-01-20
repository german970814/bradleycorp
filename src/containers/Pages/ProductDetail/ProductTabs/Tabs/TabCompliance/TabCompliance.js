import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import tabStyle from '../Tabs.scss'
import style from './TabCompliance.scss'

class TabCompliance extends Component {
  constructor (props) {
    super(props)

    this.renderCompliance = this.renderCompliance.bind(this)
  }

  renderCompliance () {
    if ( this.props.compliance.compliance.length ) {
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
  }

  render () {
    return (
      <div
        className={[style.tabCompliance, tabStyle.halfWidthColDesktopTab].join(' ')} >
        <h5
          className={tabStyle.tabColTitle}>
          {'Compliance'}
        </h5>
        <ul
          className={tabStyle.tabColUl} >
          {this.renderCompliance()}
        </ul>
      </div>
    )
  }
}

TabCompliance.propTypes = {
  compliance: PropTypes.array.isRequired
}

export default TabCompliance
