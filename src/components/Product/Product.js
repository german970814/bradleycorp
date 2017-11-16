import React from 'react'
import style from './Product.scss'

const Product = ({ product }) => {

  return (
    <li>
      <h1>{product["post_title"]}</h1>
      <p>{product["post_content"]}</p>
    </li>
  )
}

export default Product
