import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import ModuleFactory from '../Modules/ModuleFactory'
import FullWidthTemplate from './FullWidthTemplate/FullWidthTemplate'
import style from './Template.scss'

class Template extends Component {
  constructor (props) {
    super(props)

    this.state = {
      htmlIsSet: false
    }
  }

  componentDidUpdate () {
    if (document.querySelector(`.bcorp-row`) && !this.state.htmlIsSet) {
      this.setState({ htmlIsSet: true })
    }
  }

  renderRows () {
    return this.props.pageData['module_data'].rows.map(row => {
      const rowNode = document.querySelector(`[data-row-id="${row.atts['row_id']}"]`)
      const columnNodes = Array.from(rowNode.querySelectorAll(`.bcorp-column`))

      return this.renderColumns(columnNodes, row)
    })
  }

  renderColumns (columnNodes, row) {
    return columnNodes.map((columnNode, index) => {
      const colData = row.columns[index]
      const moduleNodes = Array.from(columnNode.getElementsByClassName(`bcorp-module`))

      return this.renderModules(moduleNodes, colData)
    })
  }

  renderModules (moduleNodes, colData) {
    return moduleNodes.map((moduleNode, index) => {
      const moduleData = colData.modules[index]

      return ReactDOM.createPortal((
        <ModuleFactory data={moduleData} />
      ), moduleNode)
    })
  }

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
      <div className={style.template} >

        <FullWidthTemplate
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

      </div>
    )
  }
}

Template.propTypes = {
  pageData: PropTypes.object
}

export default Template
