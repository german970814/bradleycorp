// @flow

type Module = {
  name:
    | 'module_all_purpose'
    | 'module_cta'
    | 'module_menu'
    | 'module_multi_post_no_excerpt'
    | 'module_multi_post_button'
    | 'module_multi_post_arrow'
    | 'module_single_post'
    | 'module_single_post_featured'
    | 'module_slider'
    | 'module_text_background_peeler'
}

type MenuModuleLink = {
  /**
   * Optional so we can have menu blocks without the parent link
   */
  url?: string,
  /**
   * Optional so we can have menu blocks without the parent link
   */
  title?: string
}

type MenuModuleMenuBlockData = {
  ...MenuModuleLink,
  children: Array<MenuModuleLink>
}

export type { Module, MenuModuleMenuBlockData }
