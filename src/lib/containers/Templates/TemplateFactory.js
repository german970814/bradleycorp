// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../types/customPage_types'
import FullWidthTemplate from './FullWidthTemplate/FullWidthTemplate'
import RightSidebarTemplate from './RightSidebarTemplate/RightSidebarTemplate'
import LeftSidebarTemplate from './LeftSidebarTemplate/LeftSidebarTemplate'
import FAQTemplate from './LeftSidebarTemplate/FAQTemplate/FAQTemplate'
import NewsTemplate from './LeftSidebarTemplate/NewsTemplate/NewsTemplate'
import CareersTemplate from './CareersTemplate/CareersTemplate'
import ProductLandingPageTemplate from './FullWidthTemplate/ProductLandingPageTemplate/ProductLandingPageTemplate'
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
  pagePath: string
}

/**
 * Given page template data, we pass it through to the correct template component
 * along with render functions for the modules and widgets, if required by the template,
 * to be inserted into the correct position by the template component
 *
 * @param {[object]} props
 * @return {[component]}
 */
const TemplateFactory = (props: Props): React.Node => {
  const template = props.data.template

  if (!template) {
    return null
  }

  switch (template) {
    case 'full-width-page':
      return (
        <FullWidthTemplate
          data={props.data}
          renderModules={props.renderModules}
          pagePath={props.pagePath}
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

    case 'faq':
      return <FAQTemplate data={props.data} />

    case 'news':
      return <NewsTemplate data={props.data} />

    case 'case-studies':
      return <NewsTemplate data={props.data} isCaseStudyTemplate />

    case 'careers':
      return (
        <CareersTemplate
          data={props.data}
          renderModules={props.renderModules}
          pagePath={props.pagePath}
        />
      )

    case 'product-landing-page':
      return (
        <ProductLandingPageTemplate
          data={props.data}
          renderModules={props.renderModules}
          pagePath={props.pagePath}
        />
      )

    // this isn't technically an option in the drop down
    // but it looks like it got added when importing the pages
    case 'left-sidebar':
      return (
        <LeftSidebarTemplate
          data={props.data}
          renderModules={props.renderModules}
        />
      )

    case 'default':
      /**
       * Just to reiterate documentation in back end..
       *
       * has_children true => existence of immediate children.
       *
       * @see bcorp-custom-page-response-shape-class.php
       */
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
