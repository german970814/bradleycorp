// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../../types/megaMenu_types'
import FillColumns from '../../../../../../components/FillColumns/FillColumns'
import MenuBlock from '../../../../lib/WithoutThumbnails/MenuBlock/MenuBlock'
import style from './WithoutThumbnails.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class WithoutThumbnails extends React.PureComponent<Props> {
  renderMenuBlocks () {
    return this.props.menuItem.children.map((childItem, index) => {
      return <MenuBlock key={index} menuItem={childItem} />
    })
  }

  render () {
    const colClass = `col4 ${style.column}`
    return (
      <div className={style.withoutThumbnailsWrapper}>
        <div className={`row ${style.withoutThumbnailsInner}`}>
          <FillColumns colClasses={[colClass, colClass, colClass, colClass]}>
            {this.renderMenuBlocks()}
          </FillColumns>
        </div>
      </div>
    )
  }
}

export default WithoutThumbnails
