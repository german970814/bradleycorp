// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import { itemIsMegaMenuItem } from '../../MegaMenuItems'
import MegaMenuClosed from './MegaMenuClosed/MegaMenuClosed'
import MegaMenuExpanded from './MegaMenuExpanded/MegaMenuExpanded'
import style from './MegaMenu.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem,
  itemHeight: number,
  top: number
}

type State = {
  hovered: boolean
}

/**
 * Handles the logic for displaying the expanded area of the mega menu
 */
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

  renderMegaMenuExpanded () {
    return (
      <React.Fragment>
        <div className={style.menuItemExpandedArrow} />
        <MegaMenuExpanded menuItem={this.props.menuItem} top={this.props.top} />
      </React.Fragment>
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
        <MegaMenuClosed
          menuItem={this.props.menuItem}
          itemHeight={this.props.itemHeight}
          hovered={this.state.hovered}
        />
        {this.state.hovered && this.renderMegaMenuExpanded()}
      </div>
    ) : (
      <div className={style.menuItem}>
        <MegaMenuClosed
          menuItem={this.props.menuItem}
          itemHeight={this.props.itemHeight}
        />
      </div>
    )
  }
}

export default MegaMenu
