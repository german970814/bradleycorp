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
        <FileDownloadLink
          title={post.post.post_title || 'Case Study'}
          link={post.meta.case_study_pdf}
        />
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
