// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../types/post_types'
import { Link } from 'react-router-dom'
import ContentTransformer from '../../../../../components/ContentTransformer/ContentTransformer'
import { getExcerpt } from '../../../../../bcorpPost'
import { createCPTUrl } from '../../../../../bcorpUrl'
import SVGArrow from '../../../../../components/SVGIcon/SVGArrow'
import style from './FeaturedPost.scss'

type Props = {
  post: BCorpPost,
  postTypePretty: string
}

class FeaturedPost extends React.PureComponent<Props> {
  render () {
    const post = this.props.post.post

    return (
      <div className={style.featuredPost}>
        <h6 className={style.featuredPostType}>{`Featured ${
          this.props.postTypePretty
        }`}</h6>
        <Link to={createCPTUrl(post) || '#'}>
          <h6 className={style.postTitle}>{post.post_title}</h6>
        </Link>
        <div className={`small-body ${style.content}`}>
          <ContentTransformer
            content={getExcerpt(
              post.post_excerpt,
              post.post_content || '',
              'short'
            )}
          />
        </div>
        <Link to={createCPTUrl(post) || '#'}>
          <div className={style.arrow}>
            <SVGArrow icon={'arrow'} color={'silver'} redrawOnHover />
          </div>
        </Link>
      </div>
    )
  }
}

export default FeaturedPost
