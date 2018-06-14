// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../types/megaMenu_types'
import MegaMenuItemsHover from './MegaMenuItemsHover/MegaMenuItemsHover'

type Props = {
  // we have two styles of mega menu available to render
  type: 'hover' | 'tabs',
  menuItems: Array<MegaMenuNavMenuItem>,
  itemHeight: number,
  // expanded mega menus render in a portal relative to the document.
  // but we need to give it the distance from the top
  // which will depend on where the menu is implemented
  top: number
}

class MegaMenuItems extends React.Component<Props> {
  renderMegaMenuHovered () {
    return (
      <MegaMenuItemsHover
        menuItems={this.props.menuItems}
        itemHeight={this.props.itemHeight}
        top={this.props.top}
      />
    )
  }

  render () {
    return this.props.type === 'hover' ? this.renderMegaMenuHovered() : null
  }
}

function itemIsMegaMenuItem (menuItem: MegaMenuNavMenuItem) {
  return !!menuItem.bcorp_mega_menu_slug
}

export default MegaMenuItems
export { itemIsMegaMenuItem }
