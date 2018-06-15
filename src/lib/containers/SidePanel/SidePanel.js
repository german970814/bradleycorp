// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import style from './SidePanel.scss'

type Props = {
  children: React.Node,
  top: number,
  paddingBottom?: number,
  show?: boolean,
  onShow?: () => void,
  onHide?: () => void
}

class SidePanel extends React.PureComponent<Props> {
  componentDidUpdate (prevProps: Props) {
    if (this.props.show && !prevProps.show) {
      this.freezeBodyScroll(true)

      if (this.props.onShow) {
        this.props.onShow()
      }
    }

    if (!this.props.show && prevProps.show) {
      this.freezeBodyScroll(false)

      if (this.props.onHide) {
        this.props.onHide()
      }
    }
  }

  freezeBodyScroll (freeze: boolean) {
    const body = document.getElementById('body')

    if (body) {
      // prevent scrolling behind the lightbox
      if (freeze) {
        body.style.position = 'relative'
        body.style.overflow = 'hidden'
      } else {
        body.style.position = ''
        body.style.overflow = ''
      }
    }
  }

  render () {
    const portalNode = document.getElementById('side-panel')

    if (!portalNode) {
      console.warn('SidePanel component expected node with id side-panel')
      return null
    }

    // position correct distance from top of window
    // and add bottom padding making sure it ends at the bottom of the screen
    const paddingBottom =
      parseInt(this.props.paddingBottom || 0) + parseInt(this.props.top)
    portalNode.style.top = `${this.props.top}px`
    portalNode.style.paddingBottom = `${paddingBottom}px`
    portalNode.style.left = this.props.show ? '0' : '-100%'

    return ReactDOM.createPortal(
      <div className={style.sidePanelInner}>{this.props.children}</div>,
      portalNode
    )
  }
}

export default SidePanel
