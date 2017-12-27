import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentText.scss'

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
      ? '- Less Detail'
      : '+ More Detail'
  }

  render () {
    return (
      <div>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{__html: this.renderText()}} />
        <div
          className={style.moreDetail}>
          <div
            onClick={this.handleMoreDetailsButtonClick.bind(this)} >
            {this.renderMoreDetailsButtonText()}
          </div>
        </div>
      </div>
    )
  }
}

ProductContentText.propTypes = {
  content: PropTypes.string
}

export default ProductContentText
