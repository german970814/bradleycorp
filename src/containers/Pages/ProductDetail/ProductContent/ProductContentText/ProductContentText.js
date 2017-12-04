import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProductContentText extends Component {
  constructor (props) {
    super(props)

    this.state = {
      moreDetails: false
    }

    this.renderText = this.renderText.bind(this)
    this.renderMoreDetailsButtonText = this.renderMoreDetailsButtonText.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ moreDetails: false })
    }
  }

  handleMoreDetailsButtonClick (e) {
    e.preventDefault()

    this.setState({ moreDetails: !this.state.moreDetails })
  }

  renderText () {
    if (!this.props.content) {
      return
    }
    return this.state.moreDetails
      ? this.props.content
      : this.props.content.substring(0, 401)
  }

  renderMoreDetailsButtonText () {
    return this.state.moreDetails
      ? 'Fewer Details'
      : 'More Details'
  }

  render () {
    return (
      <div>
        {this.renderText()}
        <button
          onClick={this.handleMoreDetailsButtonClick.bind(this)} >
          {this.renderMoreDetailsButtonText()}
        </button>

      </div>
    )
  }
}

ProductContentText.propTypes = {
  content: PropTypes.string
}

export default ProductContentText
