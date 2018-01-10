import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import ProductDetailTabsException from '../../../../exceptions/ProductDetailTabsException'
import getTheTabs from './theTabs'
import Tabs from '../../../Partials/Tabs/Tabs/Tabs'
import TabsDesktop from '../../../Partials/Tabs/Tabs/TabsDesktop'
import style from './ProductTabs.scss'

class ProductTabs extends Component {
  getTabs () {
    try {
      const tabs = getTheTabs(this.props.tabsData)
      return tabs
    } catch (err) {
      console.log(new ProductDetailTabsException(err))
      return []
    }
  }

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            <Tabs
              defaultActiveTabIndex={0}
              tabWrapperClassName={style.tabsWrapper}
              activeTabClassName={style.activeTabContent}
              tabClassName={style.productDetailTabs}
              tabsUlClassName={style.productDetailTabsUl} >
              {this.getTabs()}
            </Tabs>
          ) : (
            <TabsDesktop
              defaultActiveTabIndex={0}
              tabWrapperClassName={style.tabsWrapperDesktop}
              activeTabClassName={style.activeTabContentDesktop}
              tabClassName={style.productDetailTabsDesktop}
              tabsUlClassName={style.productDetailTabsUlDesktop} >
              {this.getTabs()}
            </TabsDesktop>
          )
        }
      </Media>
    )
  }
}

ProductTabs.propTypes = {
  productID: PropTypes.number.isRequired,
  tabsData: PropTypes.object.isRequired
}

export default ProductTabs
