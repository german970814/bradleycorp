// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import WithThumbnails from './WithThumbnails/WithThumbnails'
import WithoutThumbnails from './WithoutThumbnails/WithoutThumbnails'
import Products from './Products/Products'
import style from './MegaMenuExpanded.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem,
  top: number
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

    if (
      this.props.menuItem.bcorp_mega_menu_slug ===
      'mega-menu-without-thumbnails'
    ) {
      return <WithoutThumbnails menuItem={this.props.menuItem} />
    }

    if (this.props.menuItem.bcorp_mega_menu_slug === 'mega-menu-products') {
      return <Products menuItem={this.props.menuItem} />
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
    portalNode.style.top = `${this.props.top}px`

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
