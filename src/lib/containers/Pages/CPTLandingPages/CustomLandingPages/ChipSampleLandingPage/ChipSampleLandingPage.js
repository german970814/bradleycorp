// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import type { ScreenSize } from '../../../../../contexts/ScreenSizeContext'
import { withScreenSize } from '../../../../../contexts/ScreenSizeContext'
import FeaturedImage from '../../../../../../apps/Bradley/Pages/LiteratureAndChipSamples/Options/Option/FeaturedImage/FeaturedImage'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

class ChipSampleLandingPage extends React.Component<Props> {
  renderChipSampleSpecificContent (post: BCorpPost) {
    return post.media.featured_image && post.media.featured_image.length ? (
      <div>
        <h6
          style={{
            marginBottom: '10px',
            paddingTop: '20px'
          }}>
          {'Preview:'}
        </h6>
        <div
          style={{
            width: '200px',
            height: '200px'
          }}>
          <FeaturedImage
            post={post}
            isMobile={this.props.screenSize === 'mobile'}
          />
        </div>
      </div>
    ) : (
      <h6
        style={{
          marginBottom: '10px',
          paddingTop: '20px'
        }}>
        {'No preview currently available'}
      </h6>
    )
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'chip'}
        renderPostTypeSpecificContent={post => {
          return this.renderChipSampleSpecificContent(post)
        }}
      />
    )
  }
}

export default withScreenSize(ChipSampleLandingPage)
