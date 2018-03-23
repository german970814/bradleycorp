import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import ModuleFactory from './Modules/ModuleFactory'
import TemplateFactory from './Templates/TemplateFactory'

import FileDownloadLink from '../../../../lib/components/FileDownloadLink/FileDownloadLink'

/**
 * This component is responsible for building the grid of modules to match the backend UI
 *
 * To do this we:
 *
 *  1. Render the structure of span nodes from the backend,
 *     making sure to use ReactHtmlParser rather than dangerouslySetInnerHtml.
 *     Using dangerouslySetInnerHtml doesnt render to the React tree, just the actual DOM.
 *
 *  2. Run another render cycle once we've confirmed the span nodes exist in the DOM.
 *     This time we parse the nodes, and for each module span that has matching data
 *     we insert the correct module to the React tree via a React Portal.
 *     We get modules via the ModuleFactory component
 *
 * We use the state htmlIsSet to keep track of the span nodes' existence.
 */
class ModuleBuilder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      htmlIsSet: false
    }
  }

  /**
   * TODO: I can't see a better way of knowing when to update the page than checking the whole content string,
   *       but it can sometimes be massive.
   *       Definitelt some optimisation to be done here
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.pageData['module_data'].content !== this.props.pageData['module_data'].content) {
      this.setState({ htmlIsSet: false })
    }
  }

  /**
   * If the span nodes exist but htmlIsSet is still false, then it means that we're ready to render the portals.
   * We set htmlIsSet to true which triggers a new render cycle, this time rendering the actual module components.
   */
  componentDidUpdate () {
    if (document.querySelector(`.bcorp-row`) && !this.state.htmlIsSet) {
      this.setState({ htmlIsSet: true })
    }
  }

  /**
   * Parse the DOM matching row data to its' corresponding row.
   * If the data doesnt exist for a certain row node (which shouldn't be possible unless there's a bug in the back end)
   * then the row just won't be filled and will fill no space on the page.
   *
   * This is the same logic for renderColumns and renderModules
   */
  renderRows () {
    return this.props.pageData['module_data'].rows.map(row => {
      const rowNode = document.querySelector(`[data-row-id="${row.atts['row_id']}"]`)
      const columnNodes = Array.from(rowNode.querySelectorAll(`.bcorp-column`))
      // make sure there is no space on the p element holding
      // this row. This allows us to mix formatted text with our
      // rows without disrupting the layout
      rowNode.parentNode.style.marginBottom = 0
      rowNode.parentNode.style.marginTop = 0

      return this.renderColumns(columnNodes, row, rowNode)
    })
  }

  renderColumns (columnNodes, row, rowNode) {
    return columnNodes.map((columnNode, index) => {
      const colData = row.columns[index]
      const moduleNodes = Array.from(columnNode.getElementsByClassName(`bcorp-module`))

      return this.renderModules(moduleNodes, colData, rowNode)
    })
  }

  renderModules (moduleNodes, colData, rowNode) {
    return moduleNodes.map((moduleNode, index) => {
      const moduleData = colData.modules[index]

      return ReactDOM.createPortal((
        <ModuleFactory data={moduleData} rowNode={rowNode} />
      ), moduleNode)
    })
  }

  /**
   * We only want to render the module portals if we know the grid html is already in the DOM.
   * Otherwise the app will throw an error.
   */
  renderModulePortals () {
    if (this.state.htmlIsSet) {
      return this.renderRows()
    }
  }

  render () {
    if (!this.props.pageData) {
      return null
    }
    return (
      <TemplateFactory
        data={this.props.pageData['page_template_data']}
        renderModules={
          () => {
            return (
              <React.Fragment>

                {ReactHtmlParser(this.props.pageData['module_data'].content, {
                  transform: function (node, i) {
                    // console.log( node )
                    if (node &&
                      node.name === 'a' &&
                      node.attribs &&
                      node.attribs.href.match(/\.(pdf|doc|docx|docm|docb)$/) !== null) {
                      return <FileDownloadLink
                        key={i}
                        title={node.children[0].data}
                        titleClass={`link-orange`}
                        link={node.attribs.href} />
                    }
                  }
                })}

                {this.renderModulePortals()}

              </React.Fragment>
            )
          }
        }
        renderWidgets={
          () => {
            return null
          }
        } />
    )
  }
}

ModuleBuilder.propTypes = {
  /**
   * All the data for the page; modules, widgets and template meta
   *
   * @type {[Object]}
   */
  pageData: PropTypes.object,
  /**
   * The page slug, so we know when to re run the whole build sequence
   *
   * @type {[string]}
   */
  pageSlug: PropTypes.string
}

export default ModuleBuilder
