import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScreenSize } from '../../../../../lib/contexts/ScreenSizeContext'
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

    if (theTabs.length === 0) {
      // just creates some space at the bottom of the page
      return <div style={{ height: '60px' }} />
    }

    const tabWidth = `120px` // `calc(${100 / theTabs.length}% - 3px)`
    return this.props.screenSize === 'mobile' ? (
      <Tabs
        defaultActiveTabIndex={0}
        tabWrapperClassName={style.tabsWrapper}
        activeTabClassName={`${style.activeTabContent} row`}
        tabClassName={style.productDetailTabs}
        tabsUlClassName={style.productDetailTabsUl}>
        {theTabs}
      </Tabs>
    ) : (
      <TabsDesktop
        defaultActiveTabIndex={0}
        tabWidth={tabWidth}
        tabWrapperClassName={style.tabsWrapperDesktop}
        activeTabClassName={`${style.activeTabContentDesktop} row`}
        tabClassName={style.productDetailTabsDesktop}
        tabsUlClassName={style.productDetailTabsUlDesktop}>
        {theTabs}
      </TabsDesktop>
    )
  }
}

ProductTabs.propTypes = {
  productID: PropTypes.number.isRequired,
  tabsData: PropTypes.object.isRequired,
  screenSize: PropTypes.string
}

export default withScreenSize(ProductTabs)
