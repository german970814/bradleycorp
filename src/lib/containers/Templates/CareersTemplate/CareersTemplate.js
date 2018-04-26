// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../types/customPage_types'
import FullWidthTemplate from '../FullWidthTemplate/FullWidthTemplate'
import LeftSidebarTemplate from '../LeftSidebarTemplate/LeftSidebarTemplate'
import CTAModule from '../../Modules/CTAModule/CTAModule'
import style from './CareersTemplate.scss'

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

  renderImages () {}

  renderLeftSidebarTemplateModules () {
    return (
      <React.Fragment>
        {this.props.renderModules()}
        <div id="tgj-badges-container" />
        <script
          src="https://thegoodjobs.com/widget/badges_js/e695217b43d6da8d479ab41cb3df9c5b?overlay=true&stack=false&fade=true"
          type="text/javascript"
        />
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        <FullWidthTemplate
          data={this.props.data}
          renderModules={this.renderFullWidthTemplateModules.bind(this)}
          pagePath={this.props.pagePath}
        />
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'red'
          }}
        />
        {this.renderImages()}
        <div className={style.bottomSection}>
          <LeftSidebarTemplate
            data={{
              page_id: this.props.data.page_id,
              page_title: this.props.data.page_title
            }}
            renderModules={this.renderLeftSidebarTemplateModules.bind(this)}
            hideTitle
          />
        </div>
      </React.Fragment>
    )
  }
}

export default CareersTemplate
