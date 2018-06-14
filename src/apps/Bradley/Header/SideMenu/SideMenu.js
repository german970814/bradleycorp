// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../lib/types/megaMenu_types'
import SidePanel from '../../../../lib/containers/SidePanel/SidePanel'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
  top: number,
  show?: boolean
}

class SideMenu extends React.Component<Props> {
  render () {
    return (
      <SidePanel top={this.props.top} show={this.props.show}>
        {'working'}
      </SidePanel>
    )
  }
}

export default SideMenu
