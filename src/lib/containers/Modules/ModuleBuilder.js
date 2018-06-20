import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ContentTransformer from '../../components/ContentTransformer/ContentTransformer'
import ModuleFactory from './ModuleFactory'

/**
 * This component is responsible for building the grid of modules to match the backend UI
 *
 * This is the main entry point for rendering modules,
 * if you need modules, you'll need to use this component and pass it the modules data
 *
 * To do this we:
 *
 *  1. Render the structure of span nodes from the backend,
 *     making sure to use our ContentTransformer ather than dangerouslySetInnerHtml.
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
   * Very important... To re run the module build process
   * you need to unmount and remount this component
   */
  componentDidMount () {
    this.setState({ htmlIsSet: false })
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
    return this.props.moduleData.rows.map(row => {
      // const centerVertically = Boolean(Number(row.atts.centered))
      const rowNode = document.querySelector(
        `[data-row-id="${row.atts['row_id']}"]`
      )
      if (rowNode) {
        const columnNodes = Array.from(
          rowNode.querySelectorAll(`.bcorp-column`)
        )
        // make sure there is no space on the p element holding
        // this row. This allows us to mix formatted text with our
        // rows without disrupting the layout
        rowNode.parentNode.style.marginBottom = 0
        rowNode.parentNode.style.marginTop = 0

        // rowNode.className += centerVertically ? ' align-vertically' : ''

        return this.renderColumns(columnNodes, row, rowNode)
      }
    })
  }

  renderColumns (columnNodes, row, rowNode) {
    // const centerVertically = Boolean(Number(row.atts.centered))
    return columnNodes.map((columnNode, index) => {
      const colData = row.columns[index]
      const moduleNodes = Array.from(
        columnNode.getElementsByClassName(`bcorp-module`)
      )

      // columnNode.className += centerVertically ? ' align-vertically' : ''

      return this.renderModules(moduleNodes, colData, rowNode)
    })
  }

  renderModules (moduleNodes, colData, rowNode) {
    return moduleNodes.map((moduleNode, index) => {
      const moduleData = colData.modules[index]

      return ReactDOM.createPortal(
        <ModuleFactory data={moduleData} rowNode={rowNode} />,
        moduleNode
      )
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
    if (!this.props.moduleData) {
      return null
    }

    return (
      <React.Fragment>
        <ContentTransformer content={this.props.moduleData.content} />

        {this.renderModulePortals()}
      </React.Fragment>
    )
  }
}

ModuleBuilder.propTypes = {
  /**
   * Data required to render modules should have the shape:
   *
   * {
   *   @var content string: The html output by the module shortcodes ,
   *   @var rows array: The data for individual modules sorted by rows and columns
   * }
   *
   * @type {[Object]}
   */
  moduleData: PropTypes.shape({
    content: PropTypes.string,
    rows: PropTypes.array
  }),
  /**
   * The page path, so we know when to re run the whole build sequence
   *
   * @type {[string]}
   */
  pagePath: PropTypes.string
}

export default ModuleBuilder
