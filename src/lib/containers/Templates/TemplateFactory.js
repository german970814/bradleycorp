import React from 'react'
import PropTypes from 'prop-types'
import { validChain } from '../../bcorpObject'
import FullWidthTemplate from './FullWidthTemplate/FullWidthTemplate'
import RightSidebarTemplate from './RightSidebarTemplate/RightSidebarTemplate'
import DefaultTemplate from './DefaultTemplate/DefaultTemplate'

/**
 * Given page template data, we pass it through to the correct template component
 * along with render functions for the modules and widgets, to be inserted into the correct position
 * by the template component
 *
 * @param {[object]} props
 * @return {[component]}
 */
const TemplateFactory = props => {
  if (!validChain(props, 'data', 'template')) {
    return null
  }

  const templateProps = {
    data: props.data,
    renderModules: props.renderModules,
    renderRightSidebarWidgets: props.renderRightSidebarWidgets,
    pageSlug: props.pageSlug
  }

  return getTemplateComponent(props.data.template, templateProps)
}

/**
 * Get the correct template component with props
 *
 * @param  {[string]} template      the template slug
 * @param  {[object]} templateProps props to pass to the correct template component
 * @return {[component]}               [description]
 */
function getTemplateComponent (template, templateProps) {
  if (!template || !templateProps) {
    return
  }

  switch (template) {
    case 'full-width-page':
      return <FullWidthTemplate {...templateProps} />

    case 'right-sidebar':
      return <RightSidebarTemplate {...templateProps} />

    case 'default':
      return <DefaultTemplate {...templateProps} />

    default:
      console.warn(`Couldn't find component for template ${template}`)
      return <DefaultTemplate {...templateProps} />
  }
}

TemplateFactory.propTypes = {
  /**
   * The page data (featured image, metaboxes etc)
   */
  data: PropTypes.object,
  /**
   * A render function for the modules, this is just passed on to the template
   */
  renderModules: PropTypes.func.isRequired,
  /**
   * A render function for the widgets, this is just passed on to the template
   */
  renderRightSidebarWidgets: PropTypes.func.isRequired,
  /**
   * Used in the templates to know when to re run any init functions
   */
  pageSlug: PropTypes.string
}

export default TemplateFactory
