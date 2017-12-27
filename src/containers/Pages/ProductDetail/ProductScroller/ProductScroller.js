import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableList from '../../../ScrollableList/ScrollableList'
import ButtonUp from './ButtonUp'
import ButtonDown from './ButtonDown'

class ProductScroller extends Component {
  constructor (props) {
    super(props)

    this.renderProducts = this.renderProducts.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
  }

  renderProducts () {
    return this.props.productsArray.map((product, index) => {
      return (
        <img
          key={index}
          src={product.media['featured_image'][0]} />
      )
    })
  }

  renderTitle () {
    if (this.props.title !== undefined) {
      return (
        <h2>
          {this.props.title}
        </h2>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderTitle()}
        <ScrollableList
          numberToDisplay={2}
          buttonUp={<ButtonUp />}
          buttonDown={<ButtonDown />} >
          {this.renderProducts()}
        </ScrollableList>
      </div>
    )
  }
}

ProductScroller.propTypes = {
  title: PropTypes.string,
  productsArray: PropTypes.array.isRequired
}

export default ProductScroller
