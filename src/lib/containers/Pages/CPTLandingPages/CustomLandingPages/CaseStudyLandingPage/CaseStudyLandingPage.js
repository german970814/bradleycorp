// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../../types/post_types'
import FileDownloadLink from '../../../../../components/FileDownloadLink/FileDownloadLink'
import DefaultCPTLandingPage from '../../DefaultCPTLandingPage/DefaultCPTLandingPage'

type Props = {
  match: Match
}

class CaseStudyLandingPage extends React.Component<Props> {
  renderCaseStudySpecificContent (post: BCorpPost) {
    if (post.meta.case_study_pdf) {
      return (
        <div>
          <h6
            style={{
              marginBottom: '10px',
              paddingTop: '20px'
            }}>
            {'View Case Study Document:'}
          </h6>
          <FileDownloadLink
            title={post.post.post_title || 'Case Study'}
            link={post.meta.case_study_pdf}
          />
        </div>
      )
    }
  }

  render () {
    return (
      <DefaultCPTLandingPage
        match={this.props.match}
        postType={'case-study'}
        renderPostTypeSpecificContent={post => {
          return this.renderCaseStudySpecificContent(post)
        }}
      />
    )
  }
}

export default CaseStudyLandingPage
