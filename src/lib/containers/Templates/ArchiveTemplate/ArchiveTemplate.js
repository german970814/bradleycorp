// @flow
import * as React from 'react'
import Filters from './Filters/Filters'
import style from './ArchiveTemplate.scss'

/**
 * This component acts as a state manager for archive pages
 * which use both a year and search filter.
 *
 * The filter state is managed here,
 * and can be made use of via the renderContent function
 * (ie to request and display items)
 *
 * See the NewsTemplate for a use example.
 */

type FiltersType = {
  search?: string,
  year: string
}

type Props = {
  /**
   * The page template data,
   * this is passed through to the Left Sidebar Template
   */
  data: {
    page_id: number,
    page_title: string
  },
  /**
   * The year filters will always finish in the current year,
   * but we can define the start year here
   */
  yearStart: number,
  /**
   * Defaults to `Search {data.page_title}`
   */
  searchPlaceholder?: string,
  /**
   * Receives the filters as an argument
   * and should return the node which will appear under the filters
   */
  renderContent: (filters: FiltersType) => React.Node
}

type State = {
  filters: FiltersType
}

class ArchiveTemplate extends React.Component<Props, State> {
  yearEnd: number
  yearOptions: {
    [number | string]: ?string
  }

  constructor (props: Props) {
    super(props)

    // is always the current year
    this.yearEnd = (() => {
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

  render () {
    console.log(this.state)
    return (
      <div className={style.archiveTemplateContent}>
        <Filters
          pageTitle={this.props.data.page_title}
          searchPlaceholder={this.props.searchPlaceholder}
          filters={this.state.filters}
          updateFilters={this.updateFilters.bind(this)}
          yearOptions={this.yearOptions}
        />
        {this.props.renderContent(this.state.filters)}
      </div>
    )
  }

  getYearOptions () {
    let filterOptions = {}

    for (let year = this.props.yearStart; year <= this.yearEnd; year++) {
      const newYear = {}
      // We use the _ to make sure the object key is a non numeric string.
      // This ensures that the order of the object keys
      // remains as the order in which we added them
      newYear[`${year.toString()}_`] = year.toString()
      filterOptions = {
        ...newYear,
        ...filterOptions
      }
    }

    return filterOptions
  }
}

export default ArchiveTemplate
export type { FiltersType }
