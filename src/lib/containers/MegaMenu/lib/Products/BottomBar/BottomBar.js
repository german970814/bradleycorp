// @flow
import * as React from 'react'
import type { RouterHistory } from 'react-router-dom'
import type { MegaMenuNavMenuItem } from '../../../../../types/megaMenu_types'
import { withRouter } from 'react-router-dom'
import BCorpSearchField from '../../../../../components/BCorpFilterField/BCorpSearchField'
import style from './BottomBar.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
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
      </div>
    )
  }
}

const BottomBarWithRouter: withRouter<Props> = withRouter(BottomBar)
export default BottomBarWithRouter
