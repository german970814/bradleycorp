// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import style from './FooterPanel.scss'

type Props = {
  children: React.Node,
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

  /**
   * This is important.
   *
   * We make sure that if any components making use of the FooterPanel
   * finish using it, then it disappears.
   */
  componentWillUnmount () {
    if (!this.portalNode) {
      console.warn('FooterPanel component expected node with id footer-panel')
      return null
    }

    this.portalNode.style.bottom = '-100%'
  }

  render () {
    if (!this.portalNode) {
      console.warn('FooterPanel component expected node with id footer-panel')
      return null
    }
    const portalNode = this.portalNode

    const bottom = this.props.show ? 0 : -100
    portalNode.style.bottom = `${bottom}px`

    return ReactDOM.createPortal(
      <div className={style.footerPanelInner}>{this.props.children}</div>,
      portalNode
    )
  }
}

export default FooterPanel
