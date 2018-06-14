// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import { withScreenSize } from '../../../../contexts/ScreenSizeContext'
import MenuBlock from '../../lib/WithoutThumbnails/MenuBlock/MenuBlock'
import FillColumns from '../../../../components/FillColumns/FillColumns'
import style from './WithoutThumbnails.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

class WithoutThumbnails extends React.PureComponent<Props> {
  renderMenuBlocks () {
    return this.props.menuItem.children.map((childItem, index) => {
      return <MenuBlock key={index} menuItem={childItem} />
    })
  }

  render () {
    return (
      <div className={`row ${style.withoutThumbnails}`}>
        {this.props.screenSize === 'mobile' ? (
          this.renderMenuBlocks()
        ) : (
          <FillColumns colClasses={[`col2 ${style.columnLeft}`, `col2`]}>
            {this.renderMenuBlocks()}
          </FillColumns>
        )}
      </div>
    )
  }
}

export default withScreenSize(WithoutThumbnails)
