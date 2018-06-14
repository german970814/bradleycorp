// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../types/megaMenu_types'
import Tabs from '../../Tabs/Tabs/Tabs'
import Tab from '../../Tabs/Tab/Tab'
import style from './MegaMenuItemsTabs.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

/**
 * Responsible for rendering the correct list of mega menu primary items
 * given an array of nav menu item posts
 */
class MegaMenuItemsTabs extends React.Component<Props> {
  renderMenuItems () {
    return this.props.menuItems.map((menuItem, index) => {
      if (menuItem.menu_item_parent !== '0') {
        return null
      }

      return (
        <Tab key={index} text={menuItem.title}>
          {menuItem.title}
        </Tab>
      )
    })
  }

  render () {
    // no need to render anything if we have no menu items
    if (!this.props.menuItems || this.props.menuItems === []) {
      return null
    }

    return (
      <div className={style.megaMenuItems}>
        <Tabs defaultActiveTabIndex={0}>{this.renderMenuItems()}</Tabs>
      </div>
    )
  }
}

export default MegaMenuItemsTabs
