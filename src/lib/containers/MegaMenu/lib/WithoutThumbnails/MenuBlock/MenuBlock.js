// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import { Link } from 'react-router-dom'
import { createNavMenuItemUrl } from '../../../../../bcorpUrl'
import BCorpLink from '../../../../../components/BCorpLink/BCorpLink'
import style from './MenuBlock.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class MenuBlock extends React.PureComponent<Props> {
  renderChildItems () {
    return this.props.menuItem.children.map((child, index) => {
      return (
        <BCorpLink
          key={index}
          url={createNavMenuItemUrl(child) || '#'}
          renderInternal={url => {
            return (
              <Link to={url}>
                <div
                  key={index}
                  className={`small-body menu-block-child-item ${
                    style.childItem
                  }`}>
                  {child.title}
                </div>
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a href={url} target="_blank">
                <div
                  key={index}
                  className={`small-body menu-block-child-item  ${
                    style.childItem
                  }`}>
                  {child.title}
                </div>
              </a>
            )
          }}
        />
      )
    })
  }

  render () {
    return (
      <div className={`menu-block ${style.menuBlock}`}>
        <BCorpLink
          url={createNavMenuItemUrl(this.props.menuItem) || '#'}
          renderInternal={url => {
            return (
              <React.Fragment>
                <Link to={url}>
                  <h6 className={`menu-block-title ${style.title}`}>
                    {this.props.menuItem.title}
                  </h6>
                </Link>
                {this.renderChildItems()}
              </React.Fragment>
            )
          }}
          renderExternal={url => {
            return (
              <React.Fragment>
                <a href={url} target="_blank">
                  <h6 className={`menu-block-title ${style.title}`}>
                    {this.props.menuItem.title}
                  </h6>
                </a>
                {this.renderChildItems()}
              </React.Fragment>
            )
          }}
        />
      </div>
    )
  }
}

export default MenuBlock
