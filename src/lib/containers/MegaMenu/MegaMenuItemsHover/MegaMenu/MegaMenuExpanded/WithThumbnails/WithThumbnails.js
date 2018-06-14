// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../../types/megaMenu_types'
import Thumbnail from './Thumbnail/Thumbnail'
import FeaturedPost from '../../../../lib/WithThumbnails/FeaturedPost/FeaturedPost'
import style from './WithThumbnails.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class WithThumbnails extends React.PureComponent<Props> {
  renderFeaturedPost () {
    const featuredPost = this.props.menuItem.bcorp_mega_menu_featured_post
    const featuredPostType = this.props.menuItem
      .bcorp_mega_menu_featured_post_type

    return (
      <FeaturedPost post={featuredPost} postTypePretty={featuredPostType} />
    )
  }

  renderColumn (startIndex: number, endIndex: number) {
    // set max length of children
    const maxLength = 10
    const childMenuItems =
      this.props.menuItem.children.length <= maxLength
        ? [...this.props.menuItem.children]
        : [...this.props.menuItem.children.slice(0, maxLength)]

    console.log(childMenuItems.length)

    // if we have just the first post in the column
    // we can render the featured image after
    if (childMenuItems.length - 1 === startIndex) {
      const childMenuItem = childMenuItems[startIndex]

      return (
        <div className={`col4 ${style.column}`}>
          <Thumbnail menuItem={childMenuItem} />
          {this.renderFeaturedPost()}
        </div>
      )
    }

    // if we request a start index larger than the length
    // then just display the featured post
    if (
      childMenuItems.length + 1 === startIndex ||
      childMenuItems.length === startIndex
    ) {
      return (
        <div className={`col4 ${style.column}`}>
          {this.renderFeaturedPost()}
        </div>
      )
    }

    // otherwise render a column of thumbnails
    return (
      <div className={`col4 ${style.column}`}>
        {childMenuItems.map((child, index) => {
          if (index >= startIndex && index < endIndex) {
            return <Thumbnail key={index} menuItem={child} />
          }
        })}
      </div>
    )
  }

  render () {
    return (
      <div className={style.withThumbnailsWrapper}>
        <div className={`row ${style.withThumbnailsInner}`}>
          {this.renderColumn(0, 3)}
          {this.renderColumn(3, 6)}
          {this.renderColumn(6, 9)}
          {this.renderColumn(9, 11)}
        </div>
      </div>
    )
  }
}

export default WithThumbnails
