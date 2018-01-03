import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SimpleSlider from '../SimpleSlider/SimpleSlider'
import ProductScrollerProduct from './ProductScrollerProduct/ProductScrollerProduct'

class ProductScroller extends Component {
  constructor (props) {
    super(props)

    this.renderProducts = this.renderProducts.bind(this)
  }

  renderProducts () {
    return this.props.productsArray.map((product, index) => {
      return (
        <ProductScrollerProduct
          key={index}
          product={product} />
      )
    })
  }

  render () {
    return (
      <SimpleSlider
        title={this.props.title || ''}
        numberMobile={2}
        numberTablet={3}
        numberDesktop={5}
        nextPrevButtonsForMobile={true}>
        {this.renderProducts()}
      </SimpleSlider>
    )
  }
}

ProductScroller.propTypes = {
  title: PropTypes.string,
  productsArray: PropTypes.array.isRequired
}

export default ProductScroller
