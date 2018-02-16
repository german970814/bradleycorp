import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../../lib/bcorpObject'
import ModuleFactory from './Modules/ModuleFactory'
import CustomizableContentMarkup from './CustomizableContentMarkup'
import style from './Customizable.scss'

class Customizable extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      content: '',
      rows: [],
      htmlIsSet: false
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    if (!validChain(this.props, 'match', 'params', 'slug')) {
      return
    }

    const { slug } = this.props.match.params
    this.getPage(slug)
  }

  componentWillReceiveProps (nextProps) {
    if (!validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPage(nextProps.match.params.slug)
    }
  }

  renderPortals () {
    if (this.state.htmlIsSet) {
      return this.state.rows.map(row => {
        const rowNode = document.querySelector(`[data-row-id="${row.atts['row_id']}"]`)
        const columnNodes = Array.from(rowNode.querySelectorAll(`.bcorp-column`))

        return columnNodes.map((columnNode, index) => {
          const colData = row.columns[index]
          const moduleNodes = Array.from(columnNode.getElementsByClassName(`bcorp-module`))

          return moduleNodes.map((moduleNode, index) => {
            const moduleData = colData.modules[index]

            return ReactDOM.createPortal((
              <ModuleFactory data={moduleData} />
            ), moduleNode)
          })
        })
      })
    }
  }

  render () {
    return (
      <div className={style.customizable}>
        <CustomizableContentMarkup content={this.state.content} />
        {this.renderPortals()}
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.content !== this.state.content) {
      this.setState({ htmlIsSet: true })
    }
  }

  async getPage (slug) {
    try {
      const customPageAPIClient = new CustomPageApiClient()
      const page = await customPageAPIClient.getBySlug(slug)
      const pageData = page.data

      // set state leaving defaults where there exists no data in the request
      return this.setState(Object.assign({}, this.defaultState, pageData))
    } catch (err) {
      console.log(err)
    }
  }
}

Customizable.propTypes = {
  match: PropTypes.object.isRequired
}

export default Customizable
