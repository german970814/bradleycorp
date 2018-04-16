// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../lib/types/cpt_types'
import AddToOrderButton from './AddToOrderButton/AddToOrderButton'
import style from './Option.scss'

type Props = {
  post: LiteraturePost | ChipSamplePost,
  isMobile: boolean
}

const Option = (props: Props) => {
  const postTypeClassName =
    props.post.post.post_type === 'literature'
      ? style.literature
      : style.chipSample

  const featuredImage =
    props.post.media.featured_image.constructor === Array ? (
      <img
        src={props.post.media.featured_image[0]}
        className={style.featuredImage}
      />
    ) : null

  const title = props.post.post.post_title ? (
    <h5 className={style.title}>{props.post.post.post_title}</h5>
  ) : null

  const addButton = (
    <div className={style.addButton}>
      <AddToOrderButton
        isMobile={props.isMobile}
        postType={props.post.post.post_type}
      />
    </div>
  )

  return props.isMobile ? (
    <div className={`row ${style.option} ${postTypeClassName}`}>
      <div className={`inline-col4-middle ${style.imgContainer}`}>
        {featuredImage}
      </div>
      <div className={`inline-col4x3-middle ${style.contentContainer}`}>
        {title}
        {addButton}
      </div>
    </div>
  ) : null
}

export default Option
