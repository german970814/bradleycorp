// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../types/megaMenu_types'
import FillColumns from '../../../../components/FillColumns/FillColumns'
import { sortIntoRows } from '../../../../bcorpJSX'
import { maxLength } from '../../MegaMenuItemsHover/MegaMenu/MegaMenuExpanded/WithThumbnails/WithThumbnails'
import Thumbnail from './Thumbnail/Thumbnail'
import FeaturedPost from '../../lib/WithThumbnails/FeaturedPost/FeaturedPost'
import style from './WithThumbnails.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class WithThumbnails extends React.PureComponent<Props> {
  renderThumbnails () {
    return this.props.menuItem.children.map((child, index) => {
      if (index >= maxLength) {
        return
      }

      return (
        <div key={index} className={`col2 ${style.column}`}>
          <Thumbnail menuItem={child} />
        </div>
      )
    })
  }

  render () {
    const { menuItem } = this.props
    return (
      <div className={`row ${style.withoutThumbnails}`}>
        <div className={style.thumbnailsWrapper}>
          {sortIntoRows(this.renderThumbnails(), 2)}
        </div>
        {menuItem.bcorp_mega_menu_featured_post &&
          menuItem.bcorp_mega_menu_featured_post_type && (
            <div className={style.featuredPostWrapper}>
              <FeaturedPost
                post={menuItem.bcorp_mega_menu_featured_post}
                postTypePretty={menuItem.bcorp_mega_menu_featured_post_type}
              />
            </div>
          )}
      </div>
    )
  }
}

export default WithThumbnails
