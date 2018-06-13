// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import FileDownloadLink from '../../../../../components/FileDownloadLink/FileDownloadLink'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match
}

class TechInfoLandingPage extends React.Component<Props> {
  renderTechInfoSpecificContent (post: BCorpPost) {
    if (post.meta.technical_info_pdf) {
      return (
        <div>
          <h6
            style={{
              marginBottom: '10px'
            }}>
            {'View Technical Info:'}
          </h6>
          <FileDownloadLink
            title={post.post.post_title || 'Technical Info'}
            link={post.meta.technical_info_pdf}
          />
        </div>
      )
    }
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'technical-info'}
        renderPostTypeSpecificContent={post => {
          return this.renderTechInfoSpecificContent(post)
        }}
      />
    )
  }
}

export default TechInfoLandingPage
