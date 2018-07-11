// @flow
import * as React from 'react'
import type { BCorpMetaboxes } from '../../../../types/customPage_types'
import type { FiltersType } from '../ArchiveTemplate'
import ArchiveTemplate from '../ArchiveTemplate'
import LeftSidebarTemplate from '../../LeftSidebarTemplate/LeftSidebarTemplate'
import NewsItems from './NewsItems/NewsItems'
import style from './NewsTemplate.scss'

/**
 * Using the ArchiveTemplate as the filter state manager,
 * we combine the filters with the list of news items,
 * and place them both into a Left Sidebar Template
 *
 * With the isCaseStudyTemplate prop, this becomes a Case Study template.
 * In that case, we request a different post type,
 * and the styling of the individual items is slightly different
 */

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

class NewsTemplate extends React.Component<Props> {
  renderNewsItems (filters: FiltersType) {
    const category =
      this.props.data.metaboxes && this.props.data.metaboxes.news_category
        ? this.props.data.metaboxes.news_category
        : ''

    return (
      <div className={style.newsTemplateContent}>
        <NewsItems
          filters={filters}
          category={category}
          pageID={this.props.data.page_id}
          isCaseStudyTemplate={this.props.isCaseStudyTemplate}
        />
      </div>
    )
  }

  renderContentWithFilters () {
    return (
      <ArchiveTemplate
        data={this.props.data}
        yearStart={2000}
        renderContent={this.renderNewsItems.bind(this)}
      />
    )
  }

  render () {
    return (
      <div className={style.NewsTemplate}>
        <LeftSidebarTemplate
          data={this.props.data}
          renderModules={this.renderContentWithFilters.bind(this)}
        />
      </div>
    )
  }
}

export default NewsTemplate
