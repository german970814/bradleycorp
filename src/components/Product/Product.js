import React from 'react'
import PropTypes from 'prop-types'
// import style from './Product.scss'

const Product = ({ product }) => {
  return (
    <li>
      <h1>{product['post_title']}</h1>
      <p>{product['post_content']}</p>
    </li>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
