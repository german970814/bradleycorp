import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getTheTabs from './theTabs'
import Tabs from '../../../../components/Tabs/Tabs/Tabs'
import style from './ProductTabs.scss'


class ProductTabs extends Component {
  constructor(props) {
    super(props)

    this.renderTabs = this.renderTabs.bind(this)
  }

  renderTabs() {
    const product = this.props.product
    return getTheTabs(product)
  }

  render () {
    return (
      <Tabs
        defaultActiveTabIndex={0}
        tabWrapperClassName={style.tabsWrapper}
        tabClassName={style.productDetailTabs} >
        {this.renderTabs()}
      </Tabs>
    )
  }
}

ProductTabs.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductTabs
