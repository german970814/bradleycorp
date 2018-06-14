// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../../../../types/megaMenu_types'
import { Link } from 'react-router-dom'
import { createNavMenuItemUrl } from '../../../../../../../bcorpUrl'
import ImageFrame from '../../../../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './Thumbnail.scss'

type Props = {
  menuItem: MegaMenuNavMenuItem
}

class Thumbnail extends React.PureComponent<Props> {
  render () {
    return (
      <div className={style.thumbnail}>
        <Link to={createNavMenuItemUrl(this.props.menuItem) || '#'}>
          <h6>{this.props.menuItem.title}</h6>
          {this.props.menuItem.object_featured_image && (
            <ImageFrame
              src={this.props.menuItem.object_featured_image}
              aspectRatio={80 / 170}
            />
          )}
        </Link>
      </div>
    )
  }
}

export default Thumbnail
