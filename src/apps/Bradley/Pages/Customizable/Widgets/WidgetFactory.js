import React from 'react'
import PropTypes from 'prop-types'
import CTAWidget from './CTAWidget/CTAWidget'
import RecentPostsWidget from './RecentPostsWidget/RecentPostsWidget'
import NewsletterWidget from './NewsletterWidget/NewsletterWidget'

/**
 * Given data about a widget, we return the correct component with the necessary props
 *
 * @param {[object]} props
 * @return {[component]}
 */
const WidgetFactory = ({ type, data }) => {
  if (!type) {
    return null
  }

  const sharedProps = {
    title: data['title']
  }

  switch (type) {
    case 'bcorp_cta_widget':
      return (
        <CTAWidget
          {...sharedProps}
          text={data['display_text']}
          link={data['link_url']}
          linkText={data['link_text']} />
      )

    case 'bcorp_recent_posts_widget':
      return (
        <RecentPostsWidget
          {...sharedProps}
          numberposts={data['number']}
          blog={data['blog']} />
      )

    case 'bcorp_newsletter_widget':
      return (
        <NewsletterWidget
          {...sharedProps}
          description={data['description']}
          linkText={data['link_text']} />
      )

    default:
      return null
  }
}

WidgetFactory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

export default WidgetFactory
