import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import bcorpUrl from '../../lib/bcorpUrl'
// import style from './Product.scss'

const Product = ({ product }) => {
  return (
    <li>
      <h1>
        <Link to={bcorpUrl.createCPTUrl(product)} replace>
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
