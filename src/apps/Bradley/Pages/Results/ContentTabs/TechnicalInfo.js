// @flow
import React from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FileDownloadLink from '../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'
import type { TemplateProps } from './Default'
import type { TechnicalInfo } from '../../../../../lib/types/cpt_types'

type Props = {
  posts: Array<TechnicalInfo>
} & TemplateProps

export default class SearchTechnicalInfo extends React.Component<Props> {
  renderTechicalInfo () {
    return this.props.posts && this.props.posts.map((post, ind) => {
      return <div key={ind} className={`${style.techInfoItem}`}>
        <FileDownloadLink
          title={post.post['post_title'] || ''}
          link={post.meta['technical_info_pdf']}
          titleClass={`link-orange ${style.tabTextOrange}`}
          linkClass={style.tabTextOrangeLink}
          iconClass={style.wordPDFIcon} />
      </div>
    })
  }

  renderColumns (classes: string) {
    return <div className={`${style.searchTechInfoWrapper}`}>
      <FillColumns colClasses={[`${classes}`, `${classes}`]}>
        {this.renderTechicalInfo()}
      </FillColumns>
    </div>
  }

  renderContent () {
    return <div>
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        { match =>
          match ? (
            this.renderColumns('col1') // mobile
          ) : <Media query={{ maxWidth: TABLETMAXWIDTH }}>
            { match =>
              match ? (
                this.renderColumns('col2-tablet') // tablet
              ) : this.renderColumns('col2-desktop') // desktop
            }
          </Media>
        }
      </Media>
    </div>
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
