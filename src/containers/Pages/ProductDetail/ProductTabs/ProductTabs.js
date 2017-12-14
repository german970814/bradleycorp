import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductApiClient from '../../../../api/product_client'
import ProductDetailTabsException from '../../../../exceptions/ProductDetailTabsException'
import getTheTabs from './theTabs'
import Tabs from '../../../Tabs/Tabs/Tabs'
import style from './ProductTabs.scss'

class ProductTabs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tabs: []
    }

    this.updateTabs = this.updateTabs.bind(this)
    this.getTheTabsData = this.getTheTabsData.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.product.post.ID !== this.props.product.post.ID) {
      this.updateTabs(nextProps.product)
    }
  }

  render () {
    return (
      <Tabs
        defaultActiveTabIndex={0}
        tabWrapperClassName={style.tabsWrapper}
        activeTabClassName={style.activeTabContent}
        tabClassName={style.productDetailTabs} >
        {this.state.tabs}
      </Tabs>
    )
  }

  async updateTabs (product) {
    try {
      if (!product.post.ID || !product.meta['product_sku']) {
        return
      }
      const tabsData = await this.getTheTabsData(product.meta['product_sku'])
      const tabs = getTheTabs(tabsData)
      return this.setState({ tabs })
    } catch (err) {
      console.log(new ProductDetailTabsException(err))
      this.setState({ tabs: [] })
    }
  }

  async getTheTabsData (sku) {
    try {
      const tabsDataRequest = await this.requestTabsData(sku)
      return tabsDataRequest.data
    } catch (err) {
      console.log(new ProductDetailTabsException(err))
      return []
    }
  }

  requestTabsData (sku) {
    const productApiClient = new ProductApiClient()
    return productApiClient.getTabs(sku)
  }
}

ProductTabs.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductTabs
