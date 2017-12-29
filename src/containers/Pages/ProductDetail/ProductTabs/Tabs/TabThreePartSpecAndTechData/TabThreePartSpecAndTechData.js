import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
import style from './TabThreePartSpecAndTechData.scss'

class TabThreePartSpecAndTechData extends Component {
  constructor (props) {
    super(props)

    this.renderThreePartSpec = this.renderThreePartSpec.bind(this)
    this.renderTechnicalData = this.renderTechnicalData.bind(this)
  }

  renderThreePartSpec () {
    return this.props.threePartSpec.map((threePartSpec, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={threePartSpec.name}
            link={threePartSpec.description} />
        </li>
      )
    })
  }

  renderTechnicalData () {
    return this.props.technicalData.map((technicalData, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={technicalData.name}
            link={technicalData.description} />
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabThreePartSpecAndTechData}>

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'3 Part Spec'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderThreePartSpec()}
          </ul>
        </div>

        <div
          className={tabStyle.halfWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Technical Data'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderTechnicalData()}
          </ul>
        </div>

      </div>
    )
  }
}

TabThreePartSpecAndTechData.propTypes = {
  threePartSpec: PropTypes.array.isRequired,
  technicalData: PropTypes.array.isRequired
}

export default TabThreePartSpecAndTechData
