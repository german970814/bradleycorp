import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import CADDownloadLink from '../../../../../../../lib/components/FileDownloadLink/CADDownloadLink/CADDownloadLink'
import style from './TabCad.scss'

class TabCad extends Component {
  renderCadList () {
    return this.props.cad.map((cad, index) => {
      return (
        <li
          key={index}>
          <CADDownloadLink
            title={cad.post['post_title'] || ''}
            link={cad.meta['technical_info_pdf']}
            linkClass={tabStyle.tabTextOrangeLink}
            titleClass={`link-orange ${tabStyle.tabTextOrange}`}
            iconClass={tabStyle.wordPDFIcon} />
        </li>
      )
    })
  }

  renderCad () {
    if (this.props.cad.length) {
      return (
        <div
          className={tabStyle.fullWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'CAD Files'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderCadList()}
          </ul>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.tabThreePartSpecAndTechData}>

        {this.renderCad()}

      </div>
    )
  }
}

TabCad.propTypes = {
  cad: PropTypes.array.isRequired
}

export default TabCad
