import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TechnicalInfoApiClient from '../../../../../../api/technicalInfo_client'
import TechnicalInfoException from '../../../../../../exceptions/TechnicalInfoException'
import TabThreePartSpecAndTechInfoDesktop from './TabThreePartSpecAndTechInfoDesktop'

class TabThreePartSpecAndTechInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      threePartSpec: [],
      technicalData: []
    }

    this.getTechnicalInfo = this.getTechnicalInfo.bind(this)
  }

  componentDidMount () {
    this.setInitState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.techInfoTerms !== this.props.techInfoTerms) {
      this.setInitState(nextProps)
    }
  }

  render () {
    return (
      <TabThreePartSpecAndTechInfoDesktop
        threePartSpec={this.state.threePartSpec}
        technicalData={this.state.technicalData} />
    )
  }

  async setInitState (props) {
    try {
      const technicalInfo = await this.getTechnicalInfo(props)

      let threePartSpec = []
      let technicalData = []
      technicalInfo.forEach(technicalInfo => {
        threePartSpec = [ ...threePartSpec, ...technicalInfo.terms['three_part_spec'] ]
        technicalData = [ ...technicalData, { pdf: technicalInfo.meta['technical_info_pdf'], title: technicalInfo.post['post_title'] } ]
      })

      return this.setState({ threePartSpec, technicalData })
    } catch (err) {
      console.log(new TechnicalInfoException(err))
    }
  }

  async getTechnicalInfo (props) {
    try {
      const technicalInfo = await this.requestTechnicalInfo(props.techInfoTerms)
      return technicalInfo.data
    } catch (err) {
      console.log(new TechnicalInfoException(err))
      return []
    }
  }

  requestTechnicalInfo (techInfoTerms) {
    const technicalInfoApiClient = new TechnicalInfoApiClient()

    let slugs = []
    techInfoTerms.forEach(techInfoTerm => {
      slugs = [ ...slugs, techInfoTerm.slug ]
    })

    return technicalInfoApiClient.getByTaxAndTermArray('technical_info_product_tag', slugs)
  }
}

TabThreePartSpecAndTechInfo.propTypes = {
  techInfoTerms: PropTypes.array.isRequired
}

export default TabThreePartSpecAndTechInfo
