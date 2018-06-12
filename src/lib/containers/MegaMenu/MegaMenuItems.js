// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../types/megaMenu_types'
import NavMenuApiClient from '../../../api/navMenu_client'
import MegaMenuItemsHover from './MegaMenuItemsHover/MegaMenuItemsHover'

type Props = {
  // we have two styles of mega menu available to render
  type: 'hover' | 'tabs',
  menuItems: Array<MegaMenuNavMenuItem>,
  itemHeight: number
}

class MegaMenuItems extends React.Component<Props> {
  render () {
    return this.props.type === 'hover' ? (
      <MegaMenuItemsHover
        menuItems={this.props.menuItems}
        itemHeight={this.props.itemHeight}
      />
    ) : null
  }
}

function itemIsMegaMenuItem (menuItem: MegaMenuNavMenuItem) {
  return !!menuItem.bcorp_mega_menu_slug
}

export default MegaMenuItems
export { itemIsMegaMenuItem }
