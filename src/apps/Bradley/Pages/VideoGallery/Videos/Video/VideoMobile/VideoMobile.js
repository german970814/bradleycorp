// @flow
import * as React from 'react'
import type { YouTubeAPI, YouTubeIframe } from '../Video'
import type { VideoGalleryPost } from '../../../../../../../lib/types/cpt_types'
import { opts } from '../Video'
import BCorpVideo from '../../../../../../../lib/components/BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import style from '../Video.scss'

type Props = {
  video: VideoGalleryPost
}

type State = {
  time: number
}

class Video extends React.Component<Props, State> {
  url: string
  opts: {}
  youtubeAPI: ?YouTubeAPI
  iframe: ?YouTubeIframe

  constructor (props: Props) {
    super(props)

    this.state = {
      time: 0
    }

    this.url = this.props.video.meta.video_gallery_video
    this.opts = opts
  }

  openFullScreen () {
    if (this.youtubeAPI && this.iframe) {
      const requestFullScreen =
        this.iframe.requestFullScreen ||
        this.iframe.mozRequestFullScreen ||
        this.iframe.webkitRequestFullScreen

      if (requestFullScreen) {
        requestFullScreen.bind(this.iframe)()
      }
    }
  }

  handlePlayerReady (event: { target: YouTubeAPI }) {
    this.youtubeAPI = event.target
    this.youtubeAPI.ready = true
    this.iframe = this.youtubeAPI.getIframe()
    this.iframe.addEventListener('click', this.openFullScreen.bind(this))
  }

  handlePlay () {
    if (this.iframe) {
      this.iframe.click()
    }
  }

  render () {
    return (
      <div className={`col1 ${style.videoWrapper}`}>
        <FixedAspectRatioBox>
          <BCorpVideo
            className={style.video}
            url={this.url}
            youtubeProps={{
              onReady: this.handlePlayerReady.bind(this),
              onPlay: this.handlePlay.bind(this),
              opts: this.opts
            }}
            noVimeo
          />
        </FixedAspectRatioBox>
        <h5 className={style.title}>{this.props.video.post.post_title}</h5>
      </div>
    )
  }
}

export default Video
