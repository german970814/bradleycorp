// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import FileDownloadLink from '../../../../../components/FileDownloadLink/FileDownloadLink'
import PDFWithFeaturedImage from '../../../../../components/PDFWithFeaturedImage/PDFWithFeaturedImage'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match
}

class LiteratureLandingPage extends React.Component<Props> {
  renderLiteratureSpecificContent (post: BCorpPost) {
    if (post.meta.literature_pdf) {
      return (
        <div>
          <h6
            style={{
              marginBottom: '10px'
            }}>
            {'View PDF:'}
          </h6>
          {post.media.featured_image && post.media.featured_image.length ? (
            <div
              style={{
                width: '120px'
              }}>
              <PDFWithFeaturedImage
                title={post.post.post_title || 'Literature PDF'}
                url={post.meta.literature_pdf}
                imageSrc={post.media.featured_image[0]}
              />
            </div>
          ) : (
            <FileDownloadLink
              title={post.post.post_title || 'Literature PDF'}
              link={post.meta.literature_pdf}
            />
          )}
        </div>
      )
    }
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'literature'}
        renderPostTypeSpecificContent={post => {
          return this.renderLiteratureSpecificContent(post)
        }}
      />
    )
  }
}

export default LiteratureLandingPage
