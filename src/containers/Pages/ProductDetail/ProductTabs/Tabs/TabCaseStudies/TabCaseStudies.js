import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PDFWithFeaturedImage from '../../../../../../components/Partials/PDFWithFeaturedImage/PDFWithFeaturedImage'
import tabStyle from '../Tabs.scss'
import style from './TabCaseStudies.scss'

class TabCaseStudies extends Component {
  constructor (props) {
    super(props)

    this.renderCaseStudies = this.renderCaseStudies.bind(this)
  }

  renderCaseStudies () {
    return this.props.caseStudies.map((caseStudy, index) => {
      return (
        <li
          key={index}
          className={style.caseStudy} >

          <a href={caseStudy.meta['case_study_pdf']}>
            <PDFWithFeaturedImage
              title={caseStudy.post['post_title']}
              imageSrc={caseStudy.media['featured_image'][0]}
              titleClassName={tabStyle.tabTextOrange} />
          </a>

        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={`${style.tabCaseStudies} ${tabStyle.fullWidthColDesktopTab}`} >
        <h5
          className={`${tabStyle.tabColTitle} ${style.colTitle}`}>
          {'Case Studies'}
        </h5>
        <ul
          className={tabStyle.tabColUl} >
          {this.renderCaseStudies()}
        </ul>
      </div>
    )
  }
}

TabCaseStudies.propTypes = {
  caseStudies: PropTypes.array.isRequired
}

export default TabCaseStudies
