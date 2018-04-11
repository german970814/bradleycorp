// @flow
import * as React from 'react'
import type { Widget } from '../../types/widget_types'
import CTAWidget from './CTAWidget/CTAWidget'
import RecentPostsWidget from './RecentPostsWidget/RecentPostsWidget'
import NewsletterWidget from './NewsletterWidget/NewsletterWidget'
import BlogUpdatesWidget from './NewsletterWidget/BlogUpdatesWidget/BlogUpdatesWidget'

type Props = Widget & {
  widgetClass?: string,
  twoColsOnTablet?: boolean
}

/**
 * Given data about a widget, we return the correct component with the necessary props
 *
 * @param {object} props
 * @return {component}
 */
const WidgetFactory = (props: Props): React.Node => {
  const { data, type, twoColsOnTablet } = props

  const sharedProps = {
    title: data['title'],
    className: props.widgetClass,
    twoColsOnTablet
  }

  switch (type) {
    case 'bcorp_cta_widget':
      return (
        <CTAWidget
          {...sharedProps}
          text={data['display_text']}
          link={data['link_url']}
          linkText={data['link_text']}
        />
      )

    case 'bcorp_recent_posts_widget':
      return (
        <RecentPostsWidget
          {...sharedProps}
          numberposts={data['number']}
          blog={data['blog']}
        />
      )

    case 'bcorp_newsletter_widget':
      return (
        <NewsletterWidget
          {...sharedProps}
          description={data['description']}
          linkText={data['link_text']}
        />
      )

    case 'bcorp_blog_updates_widget':
      return (
        <BlogUpdatesWidget
          {...sharedProps}
          description={data['display_text']}
          linkText={data['link_text']}
          blog={data['blog']}
        />
      )

    default:
      return null
  }
}

export default WidgetFactory
