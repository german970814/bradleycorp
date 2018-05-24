// @flow
import * as React from 'react'
import type { BCorpMetaboxes } from '../../../../types/customPage_types'
import LeftSidebarTemplate from '../LeftSidebarTemplate'
import Filters from './Filters/Filters'
import NewsItems from './NewsItems/NewsItems'
import style from './NewsTemplate.scss'

type FiltersType = {
  search?: string,
  year: string
}

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string,
    metaboxes: false | BCorpMetaboxes
  },
  isCaseStudyTemplate?: boolean
}

type State = {
  filters: FiltersType
}

class NewsTemplate extends React.Component<Props, State> {
  yearStartDate: number
  yearEndDate: number
  yearOptions: {
    [number | string]: ?string
  }

  constructor (props: Props) {
    super(props)

    this.yearStartDate = 2000
    this.yearEndDate = (() => {
      const today = new Date()
      return parseInt(today.getFullYear())
    })()
    this.yearOptions = this.getYearOptions()

    this.state = {
      filters: { year: '0_' }
    }
  }

  updateFilters (filters: FiltersType) {
    this.setState({ ...this.state, filters })
  }

  renderContent () {
    const category =
      this.props.data.metaboxes && this.props.data.metaboxes.news_category
        ? this.props.data.metaboxes.news_category
        : ''

    return (
      <div className={style.newsTemplateContent}>
        <Filters
          title={this.props.data.page_title}
          filters={this.state.filters}
          updateFilters={this.updateFilters.bind(this)}
          yearOptions={this.yearOptions}
        />
        <NewsItems
          filters={this.state.filters}
          category={category}
          pageID={this.props.data.page_id}
          isCaseStudyTemplate={this.props.isCaseStudyTemplate}
        />
      </div>
    )
  }

  render () {
    console.log(this.state)
    return (
      <div className={style.NewsTemplate}>
        <LeftSidebarTemplate
          data={this.props.data}
          renderModules={this.renderContent.bind(this)}
        />
      </div>
    )
  }

  getYearOptions () {
    let filterOptions = {}

    for (let year = this.yearStartDate; year <= this.yearEndDate; year++) {
      const newYear = {}
      newYear[`${year.toString()}_`] = year.toString()
      filterOptions = {
        ...newYear,
        ...filterOptions
      }
    }

    return filterOptions
  }
}

export default NewsTemplate
export type { FiltersType }
