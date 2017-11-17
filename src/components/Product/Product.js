import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import style from './Product.scss'

const Product = ({ product }) => {
  return (
    <li>
      <h1>
        <Link to={`product/${product.ID}`}>
          {product['post_title']}
        </Link>
      </h1>
      <p>{product['post_content']}</p>
    </li>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product
