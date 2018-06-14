// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import FillColumns from '../../../../components/FillColumns/FillColumns'
import { sortIntoRows } from '../../../../bcorpJSX'
import Thumbnail from './Thumbnail/Thumbnail'
import style from './WithThumbnails.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class WithThumbnails extends React.PureComponent<Props> {
  renderThumbnails () {
    return this.props.menuItem.children.map((child, index) => {
      return (
        <div className={`col2 ${style.column}`}>
          <Thumbnail menuItem={child} />
        </div>
      )
    })
  }

  render () {
    return (
      <div className={`row ${style.withoutThumbnails}`}>
        <div className={style.thumbnailsWrapper}>
          {sortIntoRows(this.renderThumbnails(), 2)}
        </div>
        <div className={style.featuredPostWrapper} />
      </div>
    )
  }
}

export default WithThumbnails
