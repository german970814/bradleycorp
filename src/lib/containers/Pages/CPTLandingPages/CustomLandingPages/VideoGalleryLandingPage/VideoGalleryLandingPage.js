// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import VideoGalleryItem from '../../../../../components/BCorpVideo/VideoGalleryItem/VideoGalleryItem'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match
}

class VideoGalleryLandingPage extends React.Component<Props> {
  renderVideoGallerySpecificContent (post: BCorpPost) {
    return (
      <div>
        <VideoGalleryItem video={post} />
      </div>
    )
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'video-gallery'}
        renderPostTypeSpecificContent={post => {
          return this.renderVideoGallerySpecificContent(post)
        }}
      />
    )
  }
}

export default VideoGalleryLandingPage
