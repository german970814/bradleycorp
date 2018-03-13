import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import ModuleFactory from './Modules/ModuleFactory'
import TemplateFactory from './Templates/TemplateFactory'

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

                {ReactHtmlParser(this.props.pageData['module_data'].content)}

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
  pageData: PropTypes.object
}

export default ModuleBuilder
