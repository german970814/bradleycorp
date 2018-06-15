// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../lib/types/megaMenu_types'
import SidePanel from '../../../../lib/containers/SidePanel/SidePanel'
import MegaMenuItemsTabs from '../../../../lib/containers/MegaMenu/MegaMenuItemsTabs/MegaMenuItemsTabs'
import LoginCountryButtons from './LoginCountryButtons/LoginCountryButtons'
import { height } from './LoginCountryButtons/LoginCountryButtons.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
  top: number,
  show?: boolean,
  showLoginCountryButtons?: boolean
}

class SideMenu extends React.Component<Props> {
  render () {
    return (
      <SidePanel
        top={this.props.top}
        show={this.props.show}
        paddingBottom={this.props.showLoginCountryButtons ? height : 0}>
        <MegaMenuItemsTabs menuItems={this.props.menuItems} />
        {this.props.showLoginCountryButtons && (
          // using this.props.top since this will be the padding
          // at the bottom of the side panel
          <LoginCountryButtons bottom={this.props.top} />
        )}
      </SidePanel>
    )
  }
}

export default SideMenu
