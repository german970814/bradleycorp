// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../../../../lib/bcorpUrl'
import style from './MegaMenuClosed.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem,
  itemHeight: number,
  hovered?: boolean
}

/**
 * Handles the style of the mega menu closed state
 */
class MegaMenuClosed extends React.PureComponent<Props> {
  render () {
    return (
      <Link to={removeHostFromUrl(this.props.menuItem['url']) || '#'}>
        <h6
          style={{
            lineHeight: `${this.props.itemHeight}px`
          }}
          className={`${style.menuItemLink} ${
            this.props.hovered ? style.hovered : ''
          }`}>
          <span>{this.props.menuItem['title']}</span>
        </h6>
      </Link>
    )
  }
}

export default MegaMenuClosed
