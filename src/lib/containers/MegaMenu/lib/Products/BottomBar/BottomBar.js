// @flow
import * as React from 'react'
import type { RouterHistory } from 'react-router-dom'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import { withRouter, Link } from 'react-router-dom'
import BCorpLink from '../../../../../components/BCorpLink/BCorpLink'
import FillColumns from '../../../../../components/FillColumns/FillColumns'
import BCorpSearchField from '../../../../../components/BCorpFilterField/BCorpSearchField'
import style from './BottomBar.scss'

type LinkType = {
  text: string,
  url: string
}

type ColType = {
  name: string,
  links: Array<LinkType>
}

type Props = {
  productMegaMenuItem: MegaMenuNavMenuItem,
  stack?: boolean,
  greyIcon?: boolean,
  // from withRouter HOC
  history: RouterHistory
}

class BottomBar extends React.Component<Props> {
  handleSearchSubmit (searchString: string): void {
    if (searchString !== '') {
      this.props.history.push(`/results/${searchString}/product`)
    }
  }

  renderExtraLinksColumnName (title: string) {
    return <h6>{title}</h6>
  }

  renderLink (link: LinkType, index: number) {
    return (
      <BCorpLink
        key={index}
        url={link.url}
        renderInternal={url => {
          return (
            <Link to={url}>
              <div className={`small-body`}>{link.text}</div>
            </Link>
          )
        }}
        renderExternal={url => {
          return (
            <a href={url} target="_blank">
              <div className={`small-body`}>{link.text}</div>
            </a>
          )
        }}
      />
    )
  }

  renderExtraLinksColumn1 () {
    const columInfo = this.extractExtraLinksColumnInfo('1')
    if (!columInfo) {
      return null
    }

    return (
      <React.Fragment>
        {this.renderExtraLinksColumnName(columInfo.name)}
        {columInfo.links.map((link, index) => {
          return this.renderLink(link, index)
        })}
      </React.Fragment>
    )
  }

  renderExtraLinksColumn2 () {
    const columInfo = this.extractExtraLinksColumnInfo('2')
    if (!columInfo) {
      return null
    }

    const colClasses = this.props.stack ? ['col1', 'col1'] : ['col2', 'col2']

    return (
      <React.Fragment>
        {this.renderExtraLinksColumnName(columInfo.name)}
        <FillColumns colClasses={colClasses}>
          {columInfo.links.map((link, index) => {
            return this.renderLink(link, index)
          })}
        </FillColumns>
      </React.Fragment>
    )
  }

  render () {
    return (
      <div
        className={`row ${style.bottomBar} ${
          this.props.stack ? style.stack : ''
        } ${this.props.greyIcon ? style.greyIcon : ''}`}>
        <div
          className={`${this.props.stack ? 'col1' : 'col2'} ${
            style.searchWrapper
          }`}>
          <BCorpSearchField
            handleSubmit={this.handleSearchSubmit.bind(this)}
            title={'Search'}
            className={style.productsSearch}
            placeholder={'Search for Products'}
            magnifyingGlassColor={this.props.greyIcon ? 'grey' : undefined}
          />
        </div>
        <div
          className={`${this.props.stack ? 'col1' : 'col2'} ${
            style.extraLinksWrapper
          }`}>
          <div
            className={`${this.props.stack ? 'col1' : 'col3'} ${
              style.extraLinksColumn
            }`}>
            {this.renderExtraLinksColumn1()}
          </div>
          <div
            className={`${this.props.stack ? 'col1' : 'col3x2'} ${
              style.extraLinksColumn
            }`}>
            {this.renderExtraLinksColumn2()}
          </div>
        </div>
      </div>
    )
  }

  extractExtraLinksColumnInfo (colId: string): false | ColType {
    if (
      !this.props.productMegaMenuItem[`bcorp_mega_menu_extra_links_col_${colId}`] ||
      this.props.productMegaMenuItem[`bcorp_mega_menu_extra_links_col_${colId}`]
        .length === 0
    ) {
      return false
    }

    const name = this.props.productMegaMenuItem[`bcorp_mega_menu_extra_links_col_${colId}`].name

    const links = Object.keys(
      this.props.productMegaMenuItem[`bcorp_mega_menu_extra_links_col_${colId}`]
        .links
    ).map(index => {
      return this.props.productMegaMenuItem[`bcorp_mega_menu_extra_links_col_${colId}`].links[index]
    })

    return { name, links }
  }
}

const BottomBarWithRouter: withRouter<Props> = withRouter(BottomBar)
export default BottomBarWithRouter
