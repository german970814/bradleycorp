// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../../types/megaMenu_types'
import ProductCategoryBlock from '../../../../lib/Products/ProductCategoryBlock/ProductCategoryBlock'
import BottomBar from '../../../../lib/Products/BottomBar/BottomBar'
import style from './Products.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

const numberColumns = 3

class Products extends React.Component<Props> {
  renderColumn (colIndex: number) {
    const { menuItem } = this.props

    return (
      <div className={`col${numberColumns} ${style.column}`}>
        {menuItem[`bcorp_mega_menu_product_categories_col_${colIndex}`] &&
          menuItem[`bcorp_mega_menu_product_categories_col_${colIndex}`].map(
            (productCategory, index) => {
              return (
                <ProductCategoryBlock
                  key={index}
                  productCategory={productCategory}
                  withImage
                />
              )
            }
          )}
      </div>
    )
  }

  render () {
    return (
      <div className={style.productsWrapper}>
        <div className={`row ${style.productsInner}`}>
          {this.renderColumn(1)}
          {this.renderColumn(2)}
          {this.renderColumn(3)}
        </div>
        <BottomBar productMegaMenuItem={this.props.menuItem} greyIcon />
      </div>
    )
  }
}

export default Products
