// @flow
import type { Module } from './module_types'
import type { Widget } from './widget_types'
import type { WPFeaturedImageArrayTypes } from './post_types'

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

type BCorpMetaboxes = {
  sidebar_select?: string
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

export type { BCorpPageTemplateData, BCorpCustomPage }
