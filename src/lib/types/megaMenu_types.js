import type { WPPost } from './post_types'
import type { WPTerm } from './term_types'

type MegaMenuProductsProperties = {
  bcorp_mega_menu_slug: 'mega-menu-products',
  bcorp_mega_menu_product_categories_col_1: Array<WPTerm>,
  bcorp_mega_menu_product_categories_col_2: Array<WPTerm>,
  bcorp_mega_menu_product_categories_col_3: Array<WPTerm>
}

type MegaMenuWithThumbnailsProperties = {
  bcorp_mega_menu_slug: 'mega-menu-with-thumbnails',
  bcorp_mega_menu_featured_post_type: string,
  bcorp_mega_menu_featured_post: WPPost
}

type MegaMenuWithoutThumbnailsProperties = {
  bcorp_mega_menu_slug: 'mega-menu-without-thumbnails'
}

type NavMenuItemPost = {
  ID: number,
  post_author: number,
  post_title?: string,
  post_parent: number,
  guid: string,
  menu_order: number,
  post_type: 'nav_menu_item',
  db_id: number,
  menu_item_parent: number,
  object_id: number,
  object: string,
  type: string,
  type_label: string,
  title: string,
  url: string,
  object_featured_image: string | false,
  children: Array<NavMenuItemPost>
}

type MegaMenuType =
  | MegaMenuProductsProperties
  | MegaMenuWithThumbnailsProperties
  | MegaMenuWithoutThumbnailsProperties
  | {}

type MegaMenuNavMenuItem = NavMenuItemPost & MegaMenuType

export type { MegaMenuNavMenuItem, NavMenuItemPost }
