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
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  addToDownloads: (postToAdd: LiteraturePost) => void,
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
    <div className={props.isMobile ? style.addButton : style.addButtonDesktop}>
      <AddToOrderButton
        addToShipment={props.addToShipment}
        addToDownloads={props.addToDownloads}
        isMobile={props.isMobile}
        post={props.post}
      />
    </div>
  )

  return props.isMobile ? (
    <div className={`col1 ${style.option} ${postTypeClassName}`}>
      <div className={'row'}>
        <div className={`inline-col4-middle ${style.imgContainer}`}>
          {featuredImage}
        </div>
        <div className={`inline-col4x3-middle ${style.contentContainer}`}>
          {title}
          {addButton}
        </div>
      </div>
    </div>
  ) : (
    <div className={`col2 ${style.option} ${postTypeClassName}`}>
      <div className={'row'}>
        <div className={`col4 ${style.imgContainer}`}>{featuredImage}</div>
        <div className={`col4x3 ${style.contentContainer}`}>
          {title}
          {addButton}
        </div>
      </div>
    </div>
  )
}

export default Option
