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
    return this.props.compliance.map((compliance, index) => {
      return (
        <li
          key={index} >
          <FileDownloadLink
            title={compliance.name}
            link={compliance.description}
            titleClass={tabStyle.tabTextOrange}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
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
