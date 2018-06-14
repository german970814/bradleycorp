// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../types/megaMenu_types'
import MegaMenu from './MegaMenu/MegaMenu'
import style from './MegaMenuItemsHover.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
  itemHeight: number,
  top: number
}

/**
 * Responsible for rendering the correct list of mega menu primary items
 * given an array of nav menu item posts
 */
class MegaMenuItemsHover extends React.Component<Props> {
  renderMenuItems () {
    return this.props.menuItems.map((menuItem, index) => {
      if (menuItem.menu_item_parent !== '0') {
        return null
      }

      return (
        <MegaMenu
          key={index}
          menuItem={menuItem}
          itemHeight={this.props.itemHeight}
          top={this.props.top}
        />
      )
    })
  }

  render () {
    // no need to render anything if we have no menu items
    if (!this.props.menuItems || this.props.menuItems === []) {
      return null
    }

    return (
      <div
        style={{
          height: `${this.props.itemHeight}px`
        }}
        className={style.megaMenuItems}>
        {this.renderMenuItems()}
      </div>
    )
  }
}

export default MegaMenuItemsHover
