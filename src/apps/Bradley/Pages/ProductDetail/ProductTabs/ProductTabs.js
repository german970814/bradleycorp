import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../../globals'
import ProductDetailTabsException from '../../../../../exceptions/ProductDetailTabsException'
import getTheTabs from './theTabs'
import Tabs from '../../../../../lib/containers/Tabs/Tabs/Tabs'
import TabsDesktop from '../../../../../lib/containers/Tabs/Tabs/TabsDesktop'
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
    const theTabs = this.getTabs()
    const tabWidth = `120px`// `calc(${100 / theTabs.length}% - 3px)`
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            <Tabs
              defaultActiveTabIndex={0}
              tabWrapperClassName={style.tabsWrapper}
              activeTabClassName={`${style.activeTabContent} row`}
              tabClassName={style.productDetailTabs}
              tabsUlClassName={style.productDetailTabsUl} >
              {theTabs}
            </Tabs>
          ) : (
            <TabsDesktop
              defaultActiveTabIndex={0}
              tabWidth={tabWidth}
              tabWrapperClassName={style.tabsWrapperDesktop}
              activeTabClassName={`${style.activeTabContentDesktop} row`}
              tabClassName={style.productDetailTabsDesktop}
              tabsUlClassName={style.productDetailTabsUlDesktop} >
              {theTabs}
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
