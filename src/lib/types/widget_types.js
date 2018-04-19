// @flow
import type { BlogName } from './blog_types'

type WidgetType =
  | ''
  | 'bcorp_cta_widget'
  | 'bcorp_recent_posts_widget'
  | 'bcorp_newsletter_widget'
  | 'bcorp_blog_updates_widget'

type Widget = {
  type: WidgetType,
  data: {
    title: string,
    description?: string,
    display_text?: string,
    link_text?: string,
    link_url?: string,
    number?: number,
    blog?: BlogName,
    media?: string
  }
}

export type { WidgetType, Widget }
