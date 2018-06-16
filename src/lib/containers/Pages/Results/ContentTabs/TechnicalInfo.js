// @flow
import React from 'react'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import type { TemplateProps } from './Default'
import type { TechnicalInfo } from '../../../../../lib/types/cpt_types'
import { withScreenSize } from '../../../../contexts/ScreenSizeContext'
import FileDownloadLink from '../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'

type Props = {
  posts: Array<TechnicalInfo>,
  // from withScreenSize HOC
  screenSize: ScreenSize
} & TemplateProps

class SearchTechnicalInfo extends React.Component<Props> {
  renderTechicalInfo () {
    return (
      this.props.posts &&
      this.props.posts.map((post, ind) => {
        return (
          <div key={ind} className={`${style.techInfoItem}`}>
            <FileDownloadLink
              title={post.post['post_title'] || ''}
              link={post.meta['technical_info_pdf']}
              titleClass={`link-orange ${style.tabTextOrange}`}
              linkClass={style.tabTextOrangeLink}
              iconClass={style.wordPDFIcon}
            />
          </div>
        )
      })
    )
  }

  renderColumns (classes: string) {
    return (
      <div className={`${style.searchTechInfoWrapper}`}>
        <FillColumns colClasses={[`${classes}`, `${classes}`]}>
          {this.renderTechicalInfo()}
        </FillColumns>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.props.screenSize === 'mobile'
          ? this.renderColumns('col1')
          : this.props.screenSize === 'tablet'
            ? this.renderColumns('col2-tablet')
            : this.renderColumns('col2-desktop')}
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}

export default withScreenSize(SearchTechnicalInfo)
