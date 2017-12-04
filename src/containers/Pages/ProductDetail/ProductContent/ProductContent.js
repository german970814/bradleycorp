import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContent.scss'

class ProductContent extends Component {
  render () {
    return (
      <div
        className={style.productContent}>
        <div
          className={style.details}>
          <h1
            className={style.title}>
            {this.props.title}</h1>
          <p
            className={style.content}>
            {this.props.content}</p>
        </div>
        <div
          className={style.image}>
          <img src={this.props.imgSrc}></img>
        </div>
      </div>
    )
  }
}

ProductContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imgSrc: PropTypes.string
}

export default ProductContent
