// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../types/megaMenu_types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../../lib/bcorpUrl'
import style from './MegaMenuHover.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

class MegaMenuHover extends React.Component<Props> {
  renderMenuItems () {
    return this.props.menuItems.map((menuItem, index) => {
      return (
        <div key={index} className={style.menuItem}>
          <Link to={removeHostFromUrl(menuItem['url']) || '#'}>
            <h6 className={style.menuItemLink}>{menuItem['title']}</h6>
          </Link>
        </div>
      )
    })
  }

  render () {
    if (!this.props.menuItems || this.props.menuItems === []) {
      return null
    }

    return this.renderMenuItems()
  }
}

export default MegaMenuHover
