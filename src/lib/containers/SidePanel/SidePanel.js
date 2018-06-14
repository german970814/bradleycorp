// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import style from './SidePanel.scss'

type Props = {
  children: React.Node,
  top: number,
  show?: boolean,
  onShow?: () => void,
  onHide?: () => void
}

class SidePanel extends React.PureComponent<Props> {
  componentDidUpdate (prevProps: Props) {
    if (this.props.show && !prevProps.show && this.props.onShow) {
      this.props.onShow()
    }

    if (!this.props.show && prevProps.show && this.props.onHide) {
      this.props.onHide()
    }
  }

  render () {
    const portalNode = document.getElementById('side-panel')

    if (!portalNode) {
      console.warn('SidePanel component expected node with id side-panel')
      return null
    }

    // position correct distance from top of window
    // and make sure it always ends at the bottom of the window
    portalNode.style.top = `${this.props.top}px`
    portalNode.style.paddingBottom = `${this.props.top}px`
    portalNode.style.left = this.props.show ? '0' : '-100%'

    return ReactDOM.createPortal(
      <div className={style.sidePanelInner}>{this.props.children}</div>,
      portalNode
    )
  }
}

export default SidePanel
