// @flow
import React, { Component } from 'react'
import type { Match } from 'react-router-dom'
import type { CPTName } from '../../../types/cpt_types'
import type { BCorpPost } from '../../../types/post_types'
import CPTApiClient from '../../../../api/cpt_client'
import DefaultTemplate from '../../Templates/DefaultTemplate/DefaultTemplate'
import style from './DefaultCPTLandingPage.scss'

type Props = {
  match: Match
}

type State = {
  post?: BCorpPost
}

class DefaultCPTLandingPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { match } = this.props
    if (match.params.slug && match.params.postType) {
      this.getPost(match.params.postType, match.params.slug)
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    const { match } = this.props
    const nextMatch = nextProps.match
    if (
      nextMatch.params.slug &&
      nextMatch.params.postType &&
      match.params.slug &&
      match.params.postType &&
      (nextMatch.params.slug !== match.params.slug ||
        nextMatch.params.postType !== match.params.postType)
    ) {
      this.getPost(nextMatch.params.postType, nextMatch.params.slug)
    }
  }

  render () {
    if (!this.state.post) {
      return null
    }
    const { post } = this.state

    return (
      <div className={`Default-CPT-Landing-Page`}>
        <DefaultTemplate
          data={{
            page_title: post.post.post_title || ''
          }}
          renderModules={() => {
            return (
              <div className={`row ${style.content}`}>
                <div className={`col1`}>{post.post.post_content || ''}</div>
              </div>
            )
          }}
        />
      </div>
    )
  }

  async getPost (postType: CPTName, slug: string) {
    try {
      const client = new CPTApiClient(postType)
      const response = await client.getBySlug(slug)
      const post: BCorpPost = response.data

      return this.setState({ post })
    } catch (err) {
      console.log(err)
    }
  }
}

export default DefaultCPTLandingPage
