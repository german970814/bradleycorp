// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import style from './FooterPanel.scss'

/**
 * A component we can use to control a footer panel
 * fixed to the bottom of the window.
 *
 * We can use this to portal in some nodes, and show and hide the panel.
 */

type Props = {
  children: React.Node,
  /**
   * State for the panel needs to be managed somewhere higher up the tree
   */
  show?: boolean,
  onShow?: () => void,
  onHide?: () => void
}

class FooterPanel extends React.PureComponent<Props> {
  portalNode: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.portalNode = document.getElementById('footer-panel')

    if (!this.portalNode) {
      console.warn('Footer Panel component expected node with id footer-panel')
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.show && !prevProps.show && this.props.onShow) {
      this.props.onShow()
    }

    if (!this.props.show && prevProps.show && this.props.onHide) {
      this.props.onHide()
    }
  }

  show () {
    if (!this.portalNode) {
      console.warn('FooterPanel component expected node with id footer-panel')
      return null
    }

    this.portalNode.style.bottom = '0'
    this.portalNode.style.maxHeight = '100%'
  }

  hide () {
    if (!this.portalNode) {
      console.warn('FooterPanel component expected node with id footer-panel')
      return null
    }

    this.portalNode.style.bottom = '-100%'
    this.portalNode.style.maxHeight = '0px'
  }

  /**
   * This is important.
   *
   * We make sure that if any components making use of the FooterPanel
   * finish using it, then it disappears.
   */
  componentWillUnmount () {
    this.hide()
  }

  render () {
    if (!this.portalNode) {
      console.warn('FooterPanel component expected node with id footer-panel')
      return null
    }

    this.props.show ? this.show() : this.hide()

    return ReactDOM.createPortal(
      <div className={style.footerPanelInner}>{this.props.children}</div>,
      this.portalNode
    )
  }
}

export default FooterPanel
