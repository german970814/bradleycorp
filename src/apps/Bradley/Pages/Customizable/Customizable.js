import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../../lib/bcorpObject'
import Template from './Templates/Template'

class Customizable extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      'module_data': {
        content: '',
        rows: []
      },
      'page_template_data': {}
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

  render () {
    return <Template pageData={this.state} />
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
