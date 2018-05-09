// @flow
import * as React from 'react'
import type { BCorpMetaboxes } from '../../../../types/customPage_types'
import LeftSidebarTemplate from '../LeftSidebarTemplate'
import Filters from './Filters/Filters'
import NewsItems from './NewsItems/NewsItems'
import style from './NewsTemplate.scss'

type FiltersType = {
  search?: string,
  year: number
}

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string,
    metaboxes: false | BCorpMetaboxes
  }
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
      filters: { year: 0 }
    }
  }

  updateFilters (filters: FiltersType) {
    this.setState({ filters })
  }

  renderContent () {
    return (
      <div className={style.NewsTemplate}>
        <Filters
          filters={this.state.filters}
          updateFilters={this.updateFilters.bind(this)}
          yearOptions={this.yearOptions}
        />
        <NewsItems filters={this.state.filters} />
      </div>
    )
  }

  render () {
    console.log(this.state)
    return (
      <LeftSidebarTemplate
        data={this.props.data}
        renderModules={this.renderContent.bind(this)}
      />
    )
  }

  getYearOptions () {
    const filterOptions = {}

    for (let year = this.yearStartDate; year <= this.yearEndDate; year++) {
      filterOptions[year] = year.toString()
    }

    return filterOptions
  }
}

export default NewsTemplate
export type { FiltersType }
