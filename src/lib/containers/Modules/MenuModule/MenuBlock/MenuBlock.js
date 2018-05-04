// @flow
import * as React from 'react'
import type { MenuModuleMenuBlockData } from '../../../../types/module_types'
import { Link } from 'react-router-dom'
import BCorpLink from '../../../../components/BCorpLink/BCorpLink'
import ArrowThumbnail from '../../../../components/ArrowThumbnail/ArrowThumbnail'
import style from './MenuBlock.scss'

type Props = {
  blockData: MenuModuleMenuBlockData,
  /**
   * Allow child link to collapse under parent
   */
  collapsible?: boolean
}

type State = {
  collapsed: boolean
}

class MenuBlock extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      collapsed: !!this.props.collapsible
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    this.setState({ collapsed: !!nextProps.collapsible })
  }

  collapse (event: SyntheticEvent<HTMLImageElement>) {
    return this.setState({ collapsed: true })
  }

  expand (event: SyntheticEvent<HTMLImageElement>) {
    return this.setState({ collapsed: false })
  }

  renderChildLinks () {
    if (
      !this.props.blockData.children ||
      this.props.blockData.children.length === 0 ||
      this.state.collapsed
    ) {
      return
    }

    return this.props.blockData.children.map((childLink, index) => {
      return (
        <ArrowThumbnail key={index} className={style.arrowWrapper}>
          <BCorpLink
            url={childLink.url}
            renderInternal={url => {
              return (
                <Link to={url}>
                  <div className={`${style.childLink} link-navy`}>
                    {childLink.title}
                  </div>
                </Link>
              )
            }}
            renderExternal={url => {
              return (
                <a href={url}>
                  <div className={`${style.childLink} link-navy`}>
                    {childLink.title}
                  </div>
                </a>
              )
            }}
          />
        </ArrowThumbnail>
      )
    })
  }

  renderCollapsibleIcon () {
    if (
      !this.props.collapsible ||
      !this.props.blockData.children ||
      this.props.blockData.children.length === 0
    ) {
      return
    }

    return this.state.collapsed ? (
      <img
        src={require('../../../../../images/collapsible-icons/expand@3x.png')}
        className={style.collapsibleIcon}
        onClickCapture={this.expand.bind(this)}
      />
    ) : (
      <img
        src={require('../../../../../images/collapsible-icons/collapse@3x.png')}
        className={style.collapsibleIcon}
        onClickCapture={this.collapse.bind(this)}
      />
    )
  }

  /**
   * Within the Menu Module, and when getting data directly from the nav-menu endpoint,
   * the menu block should always have a parent link.
   * But if this component is reused elsewhere
   * it's possible to pass our own data and render just the children.
   */
  renderParentLink () {
    const { blockData, collapsible } = this.props

    if (!blockData.title || !blockData.url) {
      if (collapsible) {
        return (
          <div className={`${style.title} ${style.noParent}`}>
            {this.renderCollapsibleIcon()}
          </div>
        )
      }
      return
    }

    const collapsibleClass = collapsible ? style.collapsible : ''

    return (
      <div className={style.title}>
        <BCorpLink
          url={blockData.url}
          renderInternal={url => {
            return (
              <Link className={style.blockDataTitle} to={url}>
                <h6 className={`${style.blockTitle} ${collapsibleClass}`}>
                  {blockData.title}
                </h6>
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a className={style.blockDataTitle} href={url}>
                <h6 className={`${style.blockTitle} ${collapsibleClass}`}>
                  {blockData.title}
                </h6>
              </a>
            )
          }}
        />
        {this.renderCollapsibleIcon()}
      </div>
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.renderParentLink()}
        {this.renderChildLinks()}
      </React.Fragment>
    )
  }
}

export default MenuBlock
