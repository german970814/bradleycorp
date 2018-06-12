// @flow
import React, { Component } from 'react'
import type { BlogName } from '../../../../types/blog_types'
import NewsletterWidget from '../NewsletterWidget'

type Props = {
  title: string,
  description?: string,
  linkText?: string,
  blog: BlogName,
  twoColsOnTablet?: boolean
};

/**
 * Class for the Blog Updates Widget
 *
 * This has the same style and layout as the Newsletter Widget,
 * we just need to send the form input to a different place on submit
 * It should instead send the email to the WP RSS
 */
class BlogUpdatesWidget extends Component<Props> {
  handleSubmit (event: SyntheticEvent<HTMLFormElement>) {
    console.log(`submitted blog updates form to ${this.props.blog}`)
    event.preventDefault()
  }

  render () {
    return (
      <NewsletterWidget
        title={this.props.title}
        description={this.props.description}
        linkText={this.props.linkText}
        blog={this.props.blog}
        handleSubmit={this.handleSubmit.bind(this)}
        twoColsOnTablet={this.props.twoColsOnTablet}
        form={`bim-blog-notifications`}
      />
    )
  }
}

export default BlogUpdatesWidget
