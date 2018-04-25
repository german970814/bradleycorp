// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../types/customPage_types'
import FullWidthTemplate from '../FullWidthTemplate/FullWidthTemplate'
import CTAModule from '../../Modules/CTAModule/CTAModule'

type Props = {
  data: BCorpPageTemplateData,
  renderModules: () => React.Node,
  pagePath: string
}

class CareersTemplate extends React.Component<Props> {
  renderFullWidthTemplateModules () {
    if (
      !this.props.data.metaboxes ||
      !this.props.data.metaboxes.careers_template
    ) {
      return null
    } else {
      const ctaText = this.props.data.metaboxes.careers_template.cta_text
      const ctaLinkText = this.props.data.metaboxes.careers_template
        .cta_link_text
      const ctaLink = this.props.data.metaboxes.careers_template.cta_link

      return (
        <CTAModule
          title={'Careers'}
          text={ctaText}
          link={ctaLink}
          linkText={ctaLinkText}
        />
      )
    }
  }

  render () {
    return (
      <FullWidthTemplate
        data={this.props.data}
        renderModules={this.renderFullWidthTemplateModules.bind(this)}
        pagePath={this.props.pagePath}
      />
    )
  }
}

export default CareersTemplate
