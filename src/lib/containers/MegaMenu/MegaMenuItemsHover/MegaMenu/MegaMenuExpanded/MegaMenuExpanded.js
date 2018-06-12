// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
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

class MegaMenuExpanded extends React.Component<Props> {
  portalNode: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.portalNode = document.getElementById('mega-menu-expanded')
  }

  render () {
    if (!this.portalNode) {
      console.warn('Mega menu expected DOM node with id mega-menu-expanded')
      return null
    }

    this.portalNode.style.top = `${this.props.hoverExpandedPosition.top}px`

    return ReactDOM.createPortal(
      <div className={style.expanded} />,
      this.portalNode
    )
  }
}

export default MegaMenuExpanded
export type { HoverExpandedPosition }
