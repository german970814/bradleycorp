// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import Tabs from '../../../Tabs/Tabs/Tabs'
import Tab from '../../../Tabs/Tab/Tab'
import style from './Products.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class Products extends React.Component<Props> {
  renderTabs () {
    let tabsArray = []

    // loop through all columns
    Object.keys(this.props.menuItem).forEach((key, index1) => {
      if (key.includes('bcorp_mega_menu_product_categories_col_')) {
        this.props.menuItem[key].forEach((prodCat, index2) => {
          tabsArray = [
            ...tabsArray,
            <Tab
              key={`${index1}_${index2}`}
              text={prodCat.name}
              image={prodCat.featured_image}>
              {'working'}
            </Tab>
          ]
        })
      }
    })

    return tabsArray
  }

  render () {
    return (
      <div className={`row ${style.productsWrapper}`}>
        <Tabs defaultActiveTabIndex={0} tabClassName={style.productTab}>
          {this.renderTabs()}
        </Tabs>
      </div>
    )
  }
}

export default Products
