// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../types/customPage_types'
import FullWidthTemplate from './FullWidthTemplate/FullWidthTemplate'
import RightSidebarTemplate from './RightSidebarTemplate/RightSidebarTemplate'
import LeftSidebarTemplate from './LeftSidebarTemplate/LeftSidebarTemplate'
import DefaultTemplate from './DefaultTemplate/DefaultTemplate'

type Props = {
  /*
    The slug of the template to render, eg full-width-page
   */
  templateSlug: string,
  /**
   * The page template data, this will simply be passed through to the resulting template
   */
  data: BCorpPageTemplateData,
  /**
   * A render function for the modules, this is just passed on to the template
   */
  renderModules: () => React.Node,
  /**
   * A render function for the widgets, this is just passed on to the template
   */
  renderRightSidebarWidgets: () => React.Node,
  /**
   * Used in the templates to know when to re run any init functions
   */
  pageSlug: string
}

/**
 * Given page template data, we pass it through to the correct template component
 * along with render functions for the modules and widgets, to be inserted into the correct position
 * by the template component
 *
 * @param {[object]} props
 * @return {[component]}
 */
const TemplateFactory = (props: Props): React.Node => {
  const template = props.data.template
  switch (template) {
    case 'full-width-page':
      return (
        <FullWidthTemplate
          data={props.data}
          renderModules={props.renderModules}
          pageSlug={props.pageSlug}
        />
      )

    case 'right-sidebar':
      return (
        <RightSidebarTemplate
          data={props.data}
          renderModules={props.renderModules}
          renderRightSidebarWidgets={props.renderRightSidebarWidgets}
        />
      )

    case 'default':
      if (props.data.has_parent || props.data.has_children) {
        return (
          <LeftSidebarTemplate
            data={props.data}
            renderModules={props.renderModules}
          />
        )
      }
      return <DefaultTemplate {...props} />

    default:
      console.warn(`Couldn't find component for template ${template}`)
      return (
        <DefaultTemplate
          data={props.data}
          renderModules={props.renderModules}
        />
      )
  }
}

export default TemplateFactory
