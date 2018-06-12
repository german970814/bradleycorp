// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../types/megaMenu_types'
import type { HoverExpandedPosition } from './MegaMenuItemsHover/MegaMenu/MegaMenuExpanded/MegaMenuExpanded'
import NavMenuApiClient from '../../../api/navMenu_client'
import MegaMenuItemsHover from './MegaMenuItemsHover/MegaMenuItemsHover'

type Props = {
  // we have two styles of mega menu available to render
  type: 'hover' | 'tabs',
  menuItems: Array<MegaMenuNavMenuItem>,
  itemHeight: number,
  hoverExpandedPosition?: HoverExpandedPosition
}

class MegaMenuItems extends React.Component<Props> {
  renderMegaMenuHovered () {
    if (!this.props.hoverExpandedPosition) {
      console.warn('Mega menu type hover expects a hoverExpandedPosition props')
      return null
    }

    return (
      <MegaMenuItemsHover
        menuItems={this.props.menuItems}
        itemHeight={this.props.itemHeight}
        hoverExpandedPosition={this.props.hoverExpandedPosition}
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
