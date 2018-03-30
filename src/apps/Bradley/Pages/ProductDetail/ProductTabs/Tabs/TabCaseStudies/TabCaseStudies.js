import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PDFWithFeaturedImage from '../../../../../../../lib/components/PDFWithFeaturedImage/PDFWithFeaturedImage'
import tabStyle from '../Tabs.scss'
import style from './TabCaseStudies.scss'

class TabCaseStudies extends Component {
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
              titleClassName={`link-orange ${tabStyle.tabTextOrange}`} />
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
