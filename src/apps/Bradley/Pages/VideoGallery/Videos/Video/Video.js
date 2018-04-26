// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../../../../lib/types/cpt_types'
// import style from './Video.scss'

type Props = {
  video: VideoGalleryPost
}

const Video = (props: Props) => {
  return <div>{props.video.post.post_title}</div>
}

export default Video
