// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import WithThumbnails from './WithThumbnails/WithThumbnails'
import style from './MegaMenuExpanded.scss'

/**
 * The hover expanded area renders in a portal relative to the document.
 * It will always be 100% of the document width,
 * but we need to give it the distance from the top
 * which will depend on where the menu is implemented
 */
type HoverExpandedPosition = {
  top: number
}

type Props = {
  menuItem: MegaMenuNavMenuItem,
  hoverExpandedPosition: HoverExpandedPosition
}

/**
 * Responsible for the area that expands out the bottom
 * of a hovered mega menu item
 */
class MegaMenuExpanded extends React.PureComponent<Props> {
  portalNode: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.portalNode = document.getElementById('mega-menu-expanded')
  }

  renderMegaMenuConent () {
    if (
      this.props.menuItem.bcorp_mega_menu_slug === 'mega-menu-with-thumbnails'
    ) {
      return <WithThumbnails menuItem={this.props.menuItem} />
    }
  }

  render () {
    if (!this.portalNode) {
      console.warn('Mega menu expected DOM node with id mega-menu-expanded')
      return null
    }
    const portalNode = this.portalNode

    // since the expanded area must be relative to the document,
    // we need to give it a top value
    portalNode.style.top = `${this.props.hoverExpandedPosition.top}px`

    // then render it in a portal to break out of the DOM structure
    // and render relative to the document
    return ReactDOM.createPortal(
      <div className={style.megaMenuExpanded}>
        {this.renderMegaMenuConent()}
      </div>,
      portalNode
    )
  }
}

export default MegaMenuExpanded
export type { HoverExpandedPosition }
