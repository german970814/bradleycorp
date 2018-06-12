// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../../../lib/bcorpUrl'
import { itemIsMegaMenuItem } from '../../MegaMenuItems'
import style from './MegaMenu.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem,
  itemHeight: number
}

type State = {
  hovered: boolean
}

class MegaMenu extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { hovered: false }
  }

  /**
   * If props change for any reason we want to make sure hovered returns to false
   */
  static getDerivedStateFromProps (): State {
    return { hovered: false }
  }

  handleMouseEnter () {
    console.log(this.props.menuItem, 'open')
    this.setState({ hovered: true })
  }

  handleMouseLeave () {
    console.log(this.props.menuItem, 'close')
    this.setState({ hovered: false })
  }

  renderMegaMenuClosed () {
    return (
      <Link to={removeHostFromUrl(this.props.menuItem['url']) || '#'}>
        <h6
          style={{
            lineHeight: `${this.props.itemHeight}px`
          }}
          className={style.menuItemLink}>
          {this.props.menuItem['title']}
        </h6>
      </Link>
    )
  }

  renderMegaMenuExpanded () {
    return (
      <div
        style={{
          top: `${this.props.itemHeight}px`
        }}
        onMouseOver={this.handleMouseEnter.bind(this)}
        className={style.menuItemExpanded}>
        {this.props.menuItem.bcorp_mega_menu_slug}
      </div>
    )
  }

  /**
   * We render in this way to unnecessary extra functionality
   * from items that are not mega menus
   */
  render () {
    return itemIsMegaMenuItem(this.props.menuItem) ? (
      <div
        className={style.menuItem}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        {this.renderMegaMenuClosed()}
        {this.state.hovered && this.renderMegaMenuExpanded()}
      </div>
    ) : (
      <div className={style.menuItem}>{this.renderMegaMenuClosed()}</div>
    )
  }
}

export default MegaMenu
