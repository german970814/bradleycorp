// @flow
import * as React from 'react'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import debounce from 'debounce'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import style from './RightSidebarTemplate.scss'
import defaultStyle, { titlemarginbottom } from '../Templates.scss'

/**
 * Defines a layout with a main content area and a right sidebar
 * which both accept custom content.
 *
 * The real complexity here is fixing the sidebar ot the screen
 * when we scroll on desktop,
 * but also keeping it between the header and footer.
 */

type Props = {
  /**
   * The page template data
   */
  data: {
    page_title: string
  },
  /**
   * A render function for the modules
   */
  renderModules: () => React.Node,
  /**
   * A render function for the widgets
   */
  renderRightSidebarWidgets: () => React.Node,
  widgetsMoveWithScroll?: boolean,

  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  isSidebarFixed?: boolean,
  sidebarScrollClass?: string,
  width?: number,
  top?: number,
  bottom?: number
}

class RightSidebarTemplate extends React.Component<Props, State> {
  sidebarNode: ?HTMLDivElement
  contentNode: ?HTMLDivElement
  titleMarginBottom: number
  snappedAtY: ?number
  maxScroll: number
  onScroll: () => void

  constructor (props: Props) {
    super(props)

    this.state = {
      isSidebarFixed: false
    }

    // get the offset from the top from the scss where we want to snap to fixed
    if (this.props.widgetsMoveWithScroll) {
      this.titleMarginBottom = parseInt(titlemarginbottom.replace('px', ''))
    }

    this.maxScroll = 0

    this.onScroll = debounce(this.onScroll, 200)
  }

  componentDidMount () {
    if (
      this.props.widgetsMoveWithScroll &&
      this.props.screenSize === 'desktop'
    ) {
      // find function at the bottom, just to keep it out the way
      this._bindSidebarScroll()
    }
  }

  componentWillUnmount () {
    this._removeSidebarScroll()
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    // screen size changed
    if (prevProps.screenSize !== this.props.screenSize) {
      if (this.props.screenSize === 'desktop') {
        // will not add a duplicate
        this._bindSidebarScroll()
        // calling this will work out if we need to set the state back to false or not
        this.onScroll()
      } else {
        // make sure we remove fixed sidebar if not desktop
        this._removeSidebarScroll()
        this.unfixSidebar()
      }
    }

    // widgetsMoveWithScroll changed
    if (this.props.widgetsMoveWithScroll !== prevProps.widgetsMoveWithScroll) {
      if (
        this.props.widgetsMoveWithScroll &&
        this.props.screenSize === 'desktop'
      ) {
        // will not add a duplicate
        this._bindSidebarScroll()
        // calling this will work out if we need to set the state back to false or not
        this.onScroll()
      } else {
        this._removeSidebarScroll()
        this.unfixSidebar()
      }
    }
  }

  _bindSidebarScroll () {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  _removeSidebarScroll () {
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }

  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.RightSidebarTemplate
        }`}>
        {renderTitle(this.props.data.page_title, 'col1')}

        <div
          ref={node => {
            // only applied when widgets move with scroll
            if (this.props.widgetsMoveWithScroll) {
              this.contentNode = node
            }
          }}
          className={`col1 col3x2-desktop ${style.content}`}>
          {this.props.renderModules()}
        </div>

        <div
          ref={node => {
            // only applied when widgets move with scroll
            if (this.props.widgetsMoveWithScroll) {
              this.sidebarNode = node
            }
          }}
          className={`col1 col3-desktop ${style.sidebar} ${this.state
            .sidebarScrollClass || ''}`}>
          <div className={style.innerSidebar}>
            {this.props.renderRightSidebarWidgets()}
          </div>
        </div>
      </div>
    )
  }

  _setupSidebarForScroll () {
    // if no sidebar node (or content node), why continue?
    if (!this.sidebarNode || !this.contentNode) {
      return this.setState({ isSidebarFixed: false })
    }

    // reference our nodes
    const sidebarNode = this.sidebarNode
    const innerSidebarNode = sidebarNode.children[0]
    const contentNode = this.contentNode

    // get our elements boundaries
    const boundingClientRect = sidebarNode.getBoundingClientRect()
    const contentBoundingClientRect = contentNode.getBoundingClientRect()

    // set the max scroll during which the sidebar should be fixed
    this.maxScroll =
      contentBoundingClientRect.height +
      contentNode.offsetTop -
      window.innerHeight

    // set min heights of content and sidebar
    if (contentBoundingClientRect.height < boundingClientRect.height) {
      contentNode.style.minHeight = `${boundingClientRect.height}px`
      sidebarNode.style.minHeight = `${boundingClientRect.height}px`
    } else {
      sidebarNode.style.minHeight = `${contentBoundingClientRect.height}px`
    }

    // note the 50 to cancel out effects of adding extra padding
    // to be able to still see the border shadow
    innerSidebarNode.style.width = `${boundingClientRect.width - 50}px`
    innerSidebarNode.style.left = boundingClientRect.left + 25 + 'px'
  }

  onScroll () {
    if (this.props.screenSize !== 'desktop') {
      return
    }

    // TODO: move this out of here
    this._setupSidebarForScroll()

    if (!this.sidebarNode || !this.contentNode || !this.titleMarginBottom) {
      // if we dont have necessary DOM nodes then we cant move with scroll
      return this.setState({ isSidebarFixed: false })
    }

    // get current scroll top
    let scrollTop: number = 0
    if (window.pageYOffset !== undefined) {
      scrollTop = parseInt(window.pageYOffset)
    } else {
      const scrollTopOfThis =
        document.documentElement ||
        (document.body && document.body.parentNode) ||
        document.body
      scrollTop =
        scrollTopOfThis && scrollTopOfThis !== null && scrollTopOfThis.scrollTop
          ? parseInt(scrollTopOfThis.scrollTop)
          : 0
    }

    // set these as constants in this scope so flow knows they havent changed
    // since we checked their existence
    const sidebarNode = this.sidebarNode
    const innerSidebarNode = sidebarNode.children[0]
    const contentNode = this.contentNode
    const titleMarginBottomNumber = this.titleMarginBottom

    // const boundingClientRect = sidebarNode.getBoundingClientRect()
    const contentBoundingClientRect = contentNode.getBoundingClientRect()

    this.setState({
      isSidebarFixed: titleMarginBottomNumber > contentBoundingClientRect.top,
      sidebarScrollClass:
        scrollTop > this.maxScroll
          ? style.attachToBottom
          : titleMarginBottomNumber > contentBoundingClientRect.top
            ? style.sidebarFixed
            : ''
    })

    // if sidebar is fixed and content height is larger than
    // window height force the sidebar to a height that does not
    // exceed that of the window. This way the user can see all of
    // the sidebar's content.
    if (
      this.state.isSidebarFixed &&
      contentBoundingClientRect.height > window.innerHeight
    ) {
      innerSidebarNode.style.height = window.innerHeight - 60 + 'px'
    } else {
      innerSidebarNode.style.height = 'auto'
    }
  }

  unfixSidebar () {
    this.setState({
      isSidebarFixed: false,
      sidebarScrollClass: ''
    })
  }
}

export default withScreenSize(RightSidebarTemplate)
