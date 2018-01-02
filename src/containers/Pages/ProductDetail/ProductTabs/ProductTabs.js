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
  constructor (props) {
    super(props)

    this.state = {
      tabs: []
    }

    this.updateTabs = this.updateTabs.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.productID !== this.props.productID) {
      this.updateTabs(nextProps.tabsData)
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
              {this.state.tabs}
            </Tabs>
          ) : (
            <TabsDesktop
              defaultActiveTabIndex={0}
              tabWrapperClassName={style.tabsWrapperDesktop}
              activeTabClassName={style.activeTabContentDesktop}
              tabClassName={style.productDetailTabsDesktop}
              tabsUlClassName={style.productDetailTabsUlDesktop} >
              {this.state.tabs}
            </TabsDesktop>
          )
        }
      </Media>
    )
  }

  updateTabs (tabsData) {
    try {
      const tabs = getTheTabs(tabsData)
      return this.setState({ tabs })
    } catch (err) {
      console.log(new ProductDetailTabsException(err))
      this.setState({ tabs: [] })
    }
  }
}

ProductTabs.propTypes = {
  productID: PropTypes.number.isRequired,
  tabsData: PropTypes.object.isRequired
}

export default ProductTabs
