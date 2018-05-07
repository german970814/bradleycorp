// @flow
import type { Module } from './module_types'
import type { Widget } from './widget_types'
import type { WPFeaturedImageArrayTypes } from './post_types'
import type { BCorpColor } from './styleguide_types'

type BCorpCustomPageColumn = {
  atts: {
    column: string,
    col_width: string
  },
  modules: Array<Module>
}

type BCorpCustomPageRow = {
  atts: {
    row: string,
    row_id: string
  },
  columns: Array<BCorpCustomPageColumn>
}

type BCorpPageHeroData = {
  title?: string,
  tagline?: string,
  copy?: string,
  video_url?: string,
  overlay?: BCorpColor
}

type BCorpCareersTemplateData = {
  cta_text: string,
  cta_link_text: string,
  cta_link: string,
  media_1: string,
  media_2: string,
  media_3: string,
  media_4: string
}

type BCorpProductLandingPageTemplateData = {
  title: string,
  description: string,
  product_image: string,
  logo: string
}

type BCorpMetaboxes = {
  page_hero?: BCorpPageHeroData,
  sidebar_select?: string,
  careers_template?: BCorpCareersTemplateData,
  faq_category?: string,
  product_landing_page?: BCorpProductLandingPageTemplateData
}

type BCorpPageTemplateData = {
  page_id: number,
  page_title: string,
  template: string,
  metaboxes: false | BCorpMetaboxes,
  featured_image: false | Array<WPFeaturedImageArrayTypes>,
  has_parent: boolean,
  has_children: boolean
}

type BCorpCustomPage = {
  module_data: {
    content?: string,
    rows?: Array<BCorpCustomPageRow>
  },
  widget_data: {
    [key: string]: ?Array<Widget>
  },
  page_template_data: BCorpPageTemplateData
}

export type { BCorpPageTemplateData, BCorpCustomPage, BCorpMetaboxes }
