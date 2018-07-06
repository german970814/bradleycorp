// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import PDFWithFeaturedImage from '../../../../../components/PDFWithFeaturedImage/PDFWithFeaturedImage'
import FileDownloadLink from '../../../../../components/FileDownloadLink/FileDownloadLink'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match
}

class NewsLandingPage extends React.Component<Props> {
  /**
   * Renders source and document, if they exist, in two columns
   */
  renderNewsSpecificContent (post: BCorpPost) {
    return (
      <div className={'row'}>
        {post.meta.news_source &&
          post.meta.news_source.url &&
          post.meta.news_source.name && (
            <div className={'col1 col2-tablet'}>
              <h6
                style={{
                  marginBottom: '10px',
                  paddingTop: '10px'
                }}>
                {'View News Source: '}
              </h6>
              <a href={post.meta.news_source.url} target="_blank">
                <div className={'link-orange'}>
                  {post.meta.news_source.name}
                </div>
              </a>
            </div>
          )}
        {post.meta.news_pdf && (
          <div className={'col1 col2-tablet'}>
            <h6
              style={{
                marginBottom: '10px',
                paddingTop: '10px'
              }}>
              {'View News Document: '}
            </h6>
            {post.media.featured_image && post.media.featured_image.length ? (
              <div
                style={{
                  width: '100px'
                }}>
                <PDFWithFeaturedImage
                  title={post.post.post_title || ''}
                  url={post.meta.news_pdf}
                  imageSrc={post.media.featured_image[0]}
                />
              </div>
            ) : (
              <FileDownloadLink
                title={post.post.post_title || 'News Document'}
                link={post.meta.news_pdf}
              />
            )}
          </div>
        )}
      </div>
    )
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'news'}
        renderPostTypeSpecificContent={post => {
          return this.renderNewsSpecificContent(post)
        }}
      />
    )
  }
}

export default NewsLandingPage
