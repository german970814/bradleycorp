// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../../../lib/types/post_types'
import { Link } from 'react-router-dom'
import { DarkGray } from '../../../../../../../scss/partials/_variables.scss'
import style from './TabApplicationGallery.scss'

type Props = {
  applicationGalleries: Array<BCorpPost>
}

class TabApplicationGallery extends React.Component<Props> {
  render () {
    return (
      <div className={style.tabApplicationGallery}>
        {this.props.applicationGalleries.map((post, index) => {
          const inlineStyle = post.meta.app_gallery_img
            ? {
              backgroundImage: `url('${post.meta.app_gallery_img}')`
            }
            : {
              backgroundColor: DarkGray
            }

          return (
            <Link
              key={index}
              to={`/application-gallery/${post.post.post_name || ''}`}>
              <div style={inlineStyle} className={style.image} />
            </Link>
          )
        })}
      </div>
    )
  }
}

export default TabApplicationGallery
