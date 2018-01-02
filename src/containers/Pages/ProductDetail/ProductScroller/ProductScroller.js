import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import ScrollableList from '../../../Partials/ScrollableList/ScrollableList'
import ProductScrollerProduct from './ProductScrollerProduct/ProductScrollerProduct'
import ButtonNext from './ButtonNext'
import ButtonPrev from './ButtonPrev'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
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
              // mobile
              <ScrollableList
                numberToDisplay={2}
                buttonUp={<ButtonPrev />}
                buttonDown={<ButtonNext />}
                positionButtonsBelow={true}
                reverseScroll={true}
                ulClassName={style.productScrollerUl}
                listItemClassName={style.listItem}
                buttonUpContainerClassName={style.buttonUpContainer}
                buttonDownContainerClassName={style.buttonDownContainer}
                buttonsBelowClassName={style.buttonsBelow} >
                {this.renderProducts()}
              </ScrollableList>
            ) : (
              <Media query={{ minWidth: TABLETMAXWIDTH }}>
                {match =>
                  match ? (
                    // desktop
                    <ScrollableList
                      numberToDisplay={5}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      positionButtonsBelow={false}
                      reverseScroll={true}
                      wrapperClassName={style.productScrollerTabletDesktop}
                      ulClassName={style.productScrollerUlTablet}
                      listItemClassName={style.listItem}
                      buttonUpContainerClassName={style.buttonUpContainer}
                      buttonDownContainerClassName={style.buttonDownContainer}
                      buttonsBelowClassName={style.buttonsBelow} >
                      {this.renderProducts()}
                    </ScrollableList>
                  ) : (
                    // tablet
                    <ScrollableList
                      numberToDisplay={3}
                      buttonUp={<ButtonLeft />}
                      buttonDown={<ButtonRight />}
                      positionButtonsBelow={false}
                      reverseScroll={true}
                      wrapperClassName={style.productScrollerTabletDesktop}
                      ulClassName={style.productScrollerUlTablet}
                      listItemClassName={style.listItem}
                      buttonUpContainerClassName={style.buttonUpContainer}
                      buttonDownContainerClassName={style.buttonDownContainer}
                      buttonsBelowClassName={style.buttonsBelow} >
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
