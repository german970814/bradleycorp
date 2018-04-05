// @flow
import * as React from 'react'
import type { MenuModuleMenuBlockData } from '../../../../types/module_types'
import { Link } from 'react-router-dom'
import BCorpLink from '../../../../components/BCorpLink/BCorpLink'
import ArrowThumbnail from '../../../../components/ArrowThumbnail/ArrowThumbnail'
import style from './MenuBlock.scss'

type Props = {
  blockData: MenuModuleMenuBlockData
}

class MenuBlock extends React.Component<Props> {
  renderChildLinks () {
    if (
      !this.props.blockData.children ||
      this.props.blockData.children.length === 0
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
                <Link to={url} replace>
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

  /**
   * Within the Menu Module, and when getting data directly from the nav-menu endpoint,
   * the menu block should always have a parent link.
   * But if this component is reused elsewhere
   * it's possible to pass our own data and render just the children.
   */
  renderParentLink () {
    const { blockData } = this.props

    if (!blockData.title || !blockData.url) {
      return
    }

    return (
      <BCorpLink
        url={blockData.url}
        renderInternal={url => {
          return (
            <Link className={style.blockDataTitle} to={url} replace>
              <h6 className={style.blockTitle}>{blockData.title}</h6>
            </Link>
          )
        }}
        renderExternal={url => {
          return (
            <a className={style.blockDataTitle} href={url}>
              <h6 className={style.blockTitle}>{blockData.title}</h6>
            </a>
          )
        }}
      />
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
