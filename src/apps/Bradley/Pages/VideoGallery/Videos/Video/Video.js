// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../../../../lib/types/cpt_types'
import BCorpVideo from '../../../../../../lib/components/BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import style from './Video.scss'

type Props = {
  video: VideoGalleryPost
}

const Video = (props: Props) => {
  return (
    <div className={`col1 col2-tablet ${style.videoWrapper}`}>
      <FixedAspectRatioBox>
        <BCorpVideo
          className={style.video}
          url={props.video.meta.video_gallery_video}
        />
      </FixedAspectRatioBox>
      <h5 className={style.title}>{props.video.post.post_title}</h5>
    </div>
  )
}

export default Video
