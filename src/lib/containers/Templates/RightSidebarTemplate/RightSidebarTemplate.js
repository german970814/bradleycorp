// @flow
import * as React from 'react'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import style from './RightSidebarTemplate.scss'
import defaultStyle, { titlemarginbottom } from '../Templates.scss'
import { TABLETMAXWIDTH } from '../../../../globals'

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
  widgetsMoveWithScroll?: boolean
}

type State = {
  isSidebarFixed?: boolean,
  sidebarScrollClass?: string,
  width?: number,
  top?: number,
  bottom?: number
};

class RightSidebarTemplate extends React.Component<Props, State> {
  sidebarNode: ?HTMLDivElement
  contentNode: ?HTMLDivElement
  titleMarginBottom: number
  snappedAtY: ?number

  constructor (props: Props) {
    super(props)

    this.state = {
      isSidebarFixed: false
    }

    // get the offset from the top from the scss where we want to snap to fixed
    if (this.props.widgetsMoveWithScroll) {
      this.titleMarginBottom = parseInt(titlemarginbottom.replace('px', ''))
    }

    this.maxScroll = 0;
  }

  componentDidMount () {
    if (this.props.widgetsMoveWithScroll) {
      // find function at the bottom, just to keep it out the way
      this._bindSidebarScroll()
    }
  }

  componentWillUnmount () {
    this._removeSidebarScroll()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (!nextProps.widgetsMoveWithScroll) {
      this._removeSidebarScroll()
    } else {
      // will not add a duplicate
      this._bindSidebarScroll()
      // calling this will work out if we need to set the state back to false or not
      this.onScroll()
    }
  }

  _bindSidebarScroll() {
    ( window.innerWidth > TABLETMAXWIDTH )
      && window.addEventListener('scroll', this.onScroll.bind(this))
  }

  _removeSidebarScroll() {
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }

  render () {
    const sidebarFixed =
      this.props.widgetsMoveWithScroll && this.state.isSidebarFixed
        ? style.sidebarFixed
        : ''

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
          className={`col1 col3-desktop ${style.sidebar} ${this.state.sidebarScrollClass}`}>
          <div className={style.innerSidebar}>
            {this.props.renderRightSidebarWidgets()}
          </div>
        </div>
      </div>
    )
  }

  _setupSidebarForScroll() {
    // if no sidebar node, why continue?
    if ( ! this.sidebarNode ) {
      return;
    }

    // reference our nodes
    const sidebarNode = this.sidebarNode
    const innerSidebarNode = sidebarNode.children[0]
    const contentNode = this.contentNode

    // get our elements boundaries
    const boundingClientRect = sidebarNode.getBoundingClientRect()
    const contentBoundingClientRect = contentNode.getBoundingClientRect()

    // set the max scroll during which the sidebar should be fixed
    this.maxScroll = (contentBoundingClientRect.height + contentNode.offsetTop) - window.innerHeight
console.log( boundingClientRect.height )
console.log( contentBoundingClientRect.height )

    if ( boundingClientRect.height > contentBoundingClientRect.height ) {
      contentNode.style.minHeight = `${boundingClientRect.height}px`
      sidebarNode.style.minHeight = `${boundingClientRect.height}px`
    } else {
      sidebarNode.style.minHeight = `${contentBoundingClientRect.height}px'`
    }

    // set the inner sidebar size and fixed position to the left of the window
    if ( window.innerWidth > TABLETMAXWIDTH ) {

      innerSidebarNode.style.width = `${boundingClientRect.width}px`
      innerSidebarNode.style.left = boundingClientRect.left + 'px'
    } else {
      sidebarNode.style.height = ''
      innerSidebarNode.style.width = ''
      innerSidebarNode.style.left = ''
    }
  }

  onScroll () {
    // move this out of here
    this._setupSidebarForScroll()

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    // console.log( scrollTop )
    if (!this.sidebarNode || !this.contentNode || !this.titleMarginBottom) {
      // if we dont have necessary DOM nodes then we cant move with scroll
      return this.setState({ isSidebarFixed: false })
    }

    // set these as constants in this scope so flow knows they havent changed
    // since we checked their existence
    const sidebarNode = this.sidebarNode
    const innerSidebarNode = sidebarNode.children[0]
    const contentNode = this.contentNode
    const titleMarginBottomNumber = this.titleMarginBottom

    const boundingClientRect = sidebarNode.getBoundingClientRect()
    const contentBoundingClientRect = contentNode.getBoundingClientRect()

    this.setState({
      isSidebarFixed: titleMarginBottomNumber > contentBoundingClientRect.top,
      sidebarScrollClass: ( scrollTop > this.maxScroll )
        ? style.attachToBottom
        : (titleMarginBottomNumber > contentBoundingClientRect.top)
          ? style.sidebarFixed : '',
    })

    if (this.state.isSidebarFixed
      && contentBoundingClientRect.height > window.innerHeight) {
      innerSidebarNode.style.height = ( window.innerHeight - 60 ) + 'px'
    } else {
      innerSidebarNode.style.height = 'auto'
    }


    // if ( top >= boundingClientRect.top ) {
    //   console.log( 'should be fixed' )
    //   // return this.setState({ isSidebarFixed: true })
    // } else {
    //   console.log( 'should not be fixed' )
    // }
    //

    // if (contentBoundingClientRect.height < boundingClientRect.height) {
    //   // if the sidebar is longer than the content next to it
    //   // then we dont need to move it on scroll
    //   // sidebarNode.style.height = 'auto'
    //   return this.setState({ isSidebarFixed: false })
    // }

    // if (
    //   boundingClientRect.top < titleMarginBottomNumber &&
    //   this.state.isSidebarFixed === false
    // ) {
    //   // if the title underline is right at the top of the window,
    //   // we snap the sidebar to the screen by
    //   // setting position fixed and setting its position values
    //   // from values we get with its position WRT the screen at the time of snapping
    //   //
    //   // note: we save the scroll position at which we snapped
    //   //       to make it easier to snap back.
    //   const right =
    //     window.innerWidth - (sidebarNode.offsetLeft + boundingClientRect.width)
    //   const height = window.innerHeight - 2 * titleMarginBottomNumber

    //   this.snappedAtY = window.scrollY
    //   sidebarNode.style.right = `${right}px`
    //   sidebarNode.style.top = titlemarginbottom
    //   sidebarNode.style.width = `${boundingClientRect.width}px`
    //   sidebarNode.style.height = `${height}px`
    //   return this.setState({ isSidebarFixed: true })
    // }

    // if (
    //   this.snappedAtY &&
    //   window.scrollY < this.snappedAtY &&
    //   this.state.isSidebarFixed === true
    // ) {
    //   // using the saved scroll position at which we snapped
    //   // if we cross back above that, we want to snap back
    //   // and return the sidebar to having position static
    //   //
    //   // note: we also return the element's scrollTop to 0
    //   //       so it can start again when we next scroll down
    //   sidebarNode.scrollTop = 0
    //   return this.setState({ isSidebarFixed: false })
    // }

    // if (window.innerHeight - window.scrollY - 3 * titleMarginBottomNumber < 0) {
    //   // if the sidebar comes close to the footer
    //   // we take over the positioning and set it from the bottom
    //   // so that we can move it up as we scroll further down
    //   // thus preventing it from colliding with the footer
    //   sidebarNode.style.top = 'unset'
    //   sidebarNode.style.bottom = `${-(
    //     window.innerHeight -
    //     window.scrollY -
    //     3 * titleMarginBottomNumber
    //   )}px`
    // }
  }
}

export default RightSidebarTemplate
