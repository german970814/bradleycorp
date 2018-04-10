// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../types/customPage_types'
import PageHero from '../../PageHero/PageHero'

type Props = {
  data: BCorpPageTemplateData,
  renderModules: () => React.Node,
  pagePath: string
}

class FullWidthTemplate extends React.Component<Props> {
  renderHero () {
    const { data } = this.props

    return data.metaboxes && data.metaboxes['page_hero'] ? (
      <PageHero
        tagline={data.metaboxes['page_hero'].tagline}
        title={data.metaboxes['page_hero'].title}
        copy={data.metaboxes['page_hero'].copy}
        videoUrl={data.metaboxes['page_hero']['video_url']}
        imgSrc={
          data['featured_image'] && data['featured_image'][0]
            ? data['featured_image'][0].toString()
            : undefined
        }
        overlay={data.metaboxes['page_hero'].overlay}
      />
    ) : (
      <PageHero
        imgSrc={
          data['featured_image'] && data['featured_image'][0]
            ? data['featured_image'][0].toString()
            : undefined
        }
      />
    )
  }

  render () {
    const { data } = this.props

    if (!data) {
      return null
    }

    return (
      <div className={'full-width-template'}>
        {this.renderHero()}

        {this.props.renderModules()}
      </div>
    )
  }
}

export default FullWidthTemplate
