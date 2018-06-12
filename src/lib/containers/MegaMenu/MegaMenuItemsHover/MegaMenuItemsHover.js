// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../types/megaMenu_types'
import MegaMenu from './MegaMenu/MegaMenu'
import style from './MegaMenuItemsHover.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
  itemHeight: number
}

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
        />
      )
    })
  }

  render () {
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
