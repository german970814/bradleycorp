// @flow
import * as React from 'react'
import type { RouterHistory } from 'react-router-dom'
import type { MegaMenuNavMenuItem } from '../../../../../../../types/megaMenu_types'
import { withRouter } from 'react-router-dom'
import BCorpSearchField from '../../../../../../../components/BCorpFilterField/BCorpSearchField'
import style from './BottomBar.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>,
  // from withRouter HOC
  history: RouterHistory
}

class BottomBar extends React.Component<Props> {
  handleSearchSubmit (searchString: string): void {
    this.props.history.push(`/results/${searchString}/product`)
  }

  render () {
    return (
      <div className={`row ${style.bottomBar}`}>
        <div className={`col2 ${style.searchWrapper}`}>
          <BCorpSearchField
            handleSubmit={this.handleSearchSubmit.bind(this)}
            title={'Search'}
            className={style.productsSearch}
            placeholder={'Search for Products'}
            magnifyingGlassColor={'grey'}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(BottomBar)
