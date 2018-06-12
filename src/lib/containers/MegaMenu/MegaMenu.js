// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../types/megaMenu_types'
import NavMenuApiClient from '../../../api/navMenu_client'
import MegaMenuHover from './MegaMenuHover/MegaMenuHover'

type Props = {
  // we have two styles of mega menu available to render
  type: 'hover' | 'tabs',
  menuItems: Array<MegaMenuNavMenuItem>
}

class MegaMenu extends React.Component<Props> {
  render () {
    return this.props.type === 'hover' ? (
      <MegaMenuHover menuItems={this.props.menuItems} />
    ) : null
  }
}

export default MegaMenu
