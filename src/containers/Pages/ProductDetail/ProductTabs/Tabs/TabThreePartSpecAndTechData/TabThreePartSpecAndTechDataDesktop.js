import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabThreePartSpecAndTechDataDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderThreePartSpec = this.renderThreePartSpec.bind(this)
    this.renderTechnicalData = this.renderTechnicalData.bind(this)
  }

  renderThreePartSpec () {
    return this.props.threePartSpec.map((threePartSpec, index) => {
      return (
        <li
          key={index}>
          {threePartSpec.name}
        </li>
      )
    })
  }

  renderTechnicalData () {
    return this.props.technicalData.map((technicalData, index) => {
      return (
        <li
          key={index}>
          <div>
            {technicalData.pdf}
          </div>
          <div>
            {technicalData.title}
          </div>
        </li>
      )
    })
  }

  render () {
    return (
      <div>

        <div>
          <h4>
            {'3 Part Spec'}
          </h4>
          <ul>
            {this.renderThreePartSpec()}
          </ul>
        </div>

        <div>
          <h4>
            {'Technical Data'}
          </h4>
          <ul>
            {this.renderTechnicalData()}
          </ul>
        </div>

      </div>
    )
  }
}

TabThreePartSpecAndTechDataDesktop.propTypes = {
  threePartSpec: PropTypes.array.isRequired,
  technicalData: PropTypes.array.isRequired
}

export default TabThreePartSpecAndTechDataDesktop