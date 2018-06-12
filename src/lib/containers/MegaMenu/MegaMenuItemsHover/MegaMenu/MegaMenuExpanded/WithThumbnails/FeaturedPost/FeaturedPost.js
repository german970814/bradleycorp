// @flow
import * as React from 'react'
import type { WPPost } from '../../../../../../../types/post_types'
import style from './FeaturedPost.scss'

type Props = {
  post: WPPost,
  postTypePretty: string
}

class FeaturedPost extends React.PureComponent<Props> {
  render () {
    return (
      <div className={style.featuredPost}>
        <h6 className={style.featuredPostType}>{`Featured ${
          this.props.postTypePretty
        }`}</h6>
        <h6 className={style.postTitle}>{this.props.post.post_title}</h6>
      </div>
    )
  }
}

export default FeaturedPost
