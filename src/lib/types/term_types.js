// @flow

type WPTerm = {
  count: number,
  description?: string,
  filter: string,
  name: string,
  parent: number,
  slug: string,
  taxonomy: string,
  term_group: number,
  term_id: number,
  term_taxonomy_id: number,
  featured_image?: string,
  children?: Array<WPTerm>
}

type BCorpTermsResponse = {
  string: Array<WPTerm>,
  tax_names: Array<string>
}

type WPPostTagTerm = WPTerm & { taxonomy: 'post_tag' }

type WPCategoryTerm = WPTerm & { taxonomy: 'category' }

type WPMaterialTypeTerm = WPTerm & { taxonomy: 'material_type' }

export type {
  WPTerm,
  BCorpTermsResponse,
  WPPostTagTerm,
  WPCategoryTerm,
  WPMaterialTypeTerm
}
