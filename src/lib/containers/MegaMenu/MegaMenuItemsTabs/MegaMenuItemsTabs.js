// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../types/megaMenu_types'
import { itemIsMegaMenuItem } from '../MegaMenuItems'
import Tabs from '../../Tabs/Tabs/Tabs'
import Tab from '../../Tabs/Tab/Tab'
import WithoutThumbnails from './WithoutThumbnails/WithoutThumbnails'
import style from './MegaMenuItemsTabs.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

/**
 * Responsible for rendering mega menu primary items tabs
 * given an array of nav menu item posts
 */
class MegaMenuItemsTabs extends React.Component<Props> {
  renderTabContent (menuItem: MegaMenuNavMenuItem) {
    if (menuItem.bcorp_mega_menu_slug === 'mega-menu-without-thumbnails') {
      return <WithoutThumbnails menuItem={menuItem} />
    }
  }

  renderMenuItems () {
    return this.props.menuItems.map((menuItem, index) => {
      if (menuItem.menu_item_parent !== '0') {
        return null
      }

      return (
        <Tab
          text={menuItem.title}
          iconStyle={'plus'}
          cantOpen={!itemIsMegaMenuItem(menuItem)}>
          {this.renderTabContent(menuItem)}
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
        <Tabs
          defaultActiveTabIndex={0}
          tabsUlClassName={style.ul}
          tabClassName={style.tab}
          activeTabClassName={style.activeContent}>
          {this.renderMenuItems()}
        </Tabs>
      </div>
    )
  }
}

export default MegaMenuItemsTabs
