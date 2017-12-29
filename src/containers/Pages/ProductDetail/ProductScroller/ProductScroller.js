import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import ScrollableList from '../../../ScrollableList/ScrollableList'
import ProductScrollerProduct from './ProductScrollerProduct/ProductScrollerProduct'
import ButtonUp from './ButtonUp'
import ButtonDown from './ButtonDown'
import style from './ProductScroller.scss'

class ProductScroller extends Component {
  constructor (props) {
    super(props)

    this.renderProducts = this.renderProducts.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
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

  renderTitle () {
    if (this.props.title !== undefined) {
      return (
        <h2
          className={style.title} >
          {this.props.title}
        </h2>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderTitle()}

        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match ? (
              <ScrollableList
                numberToDisplay={2}
                buttonUp={<ButtonUp />}
                buttonDown={<ButtonDown />}
                ulClassName={style.productScrollerUl}
                listItemClassName={style.listItem} >
                {this.renderProducts()}
              </ScrollableList>
            ) : (
              <Media query={{ minWidth: TABLETMAXWIDTH }}>
                {match =>
                  match ? (
                    <ScrollableList
                      numberToDisplay={5}
                      buttonUp={<ButtonUp />}
                      buttonDown={<ButtonDown />}
                      ulClassName={style.productScrollerUl}
                      listItemClassName={style.listItem} >
                      {this.renderProducts()}
                    </ScrollableList>
                  ) : (
                    <ScrollableList
                      numberToDisplay={3}
                      buttonUp={<ButtonUp />}
                      buttonDown={<ButtonDown />}
                      ulClassName={style.productScrollerUl}
                      listItemClassName={style.listItem} >
                      {this.renderProducts()}
                    </ScrollableList>
                  )
                }
              </Media>
            )
          }
        </Media>

      </div>
    )
  }
}

ProductScroller.propTypes = {
  title: PropTypes.string,
  productsArray: PropTypes.array.isRequired
}

export default ProductScroller
