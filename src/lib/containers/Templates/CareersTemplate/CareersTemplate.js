// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../types/customPage_types'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import FullWidthTemplate from '../FullWidthTemplate/FullWidthTemplate'
import LeftSidebarTemplate from '../LeftSidebarTemplate/LeftSidebarTemplate'
import CTAModule from '../../Modules/CTAModule/CTAModule'
import ImageFrame from '../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import FixedAspectRatioBox from '../../../components/FixedAspectRatioBox/FixedAspectRatioBox'
import ScrollableList from '../../ScrollableList/ScrollableList'
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

  renderImages () {
    if (
      !this.props.data.metaboxes ||
      !this.props.data.metaboxes.careers_template
    ) {
      return null
    } else {
      const media = [
        this.props.data.metaboxes.careers_template.media_1,
        this.props.data.metaboxes.careers_template.media_2,
        this.props.data.metaboxes.careers_template.media_3,
        this.props.data.metaboxes.careers_template.media_4
      ]

      return (
        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match ? (
              this.renderSlider(media)
            ) : (
              <div className={'row'}>
                {media.map((media, index) => {
                  return (
                    <div key={index} className={`col2-tablet col4-desktop`}>
                      <ImageFrame
                        src={media}
                        aspectRatio={200 / 385}
                        aspectRatioTablet={200 / 385}
                        aspectRatioDesktop={250 / 320}
                      />
                    </div>
                  )
                })}
              </div>
            )
          }
        </Media>
      )
    }
  }

  renderSlider (media: Array<string>) {
    return (
      <ScrollableList
        showPosition
        animation={['slide']}
        slideShow
        wrapperClassName={style.slider}>
        {media.map((media, index) => {
          return (
            <FixedAspectRatioBox key={index} aspectRatio={180 / 320}>
              <div
                style={{
                  backgroundImage: `url(${media})`
                }}
                className={`${style.imageInSlider}`}
              />
            </FixedAspectRatioBox>
          )
        })}
      </ScrollableList>
    )
  }

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
