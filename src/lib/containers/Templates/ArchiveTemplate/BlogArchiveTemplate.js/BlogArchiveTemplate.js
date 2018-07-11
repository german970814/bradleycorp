// @flow
import * as React from 'react'
import type { FiltersType } from '../ArchiveTemplate'
import ArchiveTemplate from '../ArchiveTemplate'
import BlogArchiveItems from './BlogArchiveItems/BlogArchiveItems'
import CentredTemplate from '../../CentredTemplate/CentredTemplate'
import style from './BlogArchiveTemplate.scss'

/**
 * Using the ArchiveTemplate as the filter state manager,
 * we combine the filters with the list of blog post items here.
 */

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string
  }
}

class BlogArchiveTemplate extends React.Component<Props> {
  renderBlogArchiveItems (filters: FiltersType) {
    return (
      <div className={style.blogArchiveTemplateContent}>
        <BlogArchiveItems filters={filters} pageID={this.props.data.page_id} />
      </div>
    )
  }

  renderContent () {
    return (
      <ArchiveTemplate
        data={this.props.data}
        yearStart={2000}
        renderContent={this.renderBlogArchiveItems.bind(this)}
      />
    )
  }

  render () {
    console.log(this.state)
    return (
      <div className={style.BlogArchiveTemplate}>
        <CentredTemplate
          data={this.props.data}
          renderModules={this.renderContent.bind(this)}
        />
      </div>
    )
  }
}

export default BlogArchiveTemplate
