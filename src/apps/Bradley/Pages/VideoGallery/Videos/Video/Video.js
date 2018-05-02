// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../../../../lib/types/cpt_types'
import LightboxV2 from '../../../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import BCorpVideo from '../../../../../../lib/components/BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import style from './Video.scss'

type Props = {
  video: VideoGalleryPost
}

type State = {
  time: number
}

type YouTubeAPI = {
  playVideo: () => void,
  pauseVideo: () => void,
  getCurrentTime: () => number,
  seekTo: (time: number) => void,
  ready: boolean
}

class Video extends React.Component<Props, State> {
  url: string
  opts: {}
  youtubeAPIClosed: ?YouTubeAPI
  youtubeAPIOpen: ?YouTubeAPI

  constructor (props: Props) {
    super(props)

    this.state = {
      time: 0
    }

    this.url = this.props.video.meta.video_gallery_video
    this.opts = {
      playerVars: {
        modestbranding: 1,
        showinfo: 0
      }
    }
  }

  render () {
    return (
      <LightboxV2
        renderChildren={openLightbox => {
          return (
            <div className={`col1 col2-tablet ${style.videoWrapper}`}>
              <FixedAspectRatioBox>
                <div className={style.videoOverlayWrapper}>
                  <BCorpVideo
                    className={style.video}
                    url={this.url}
                    youtubeProps={{
                      onReady: event => {
                        this.youtubeAPIClosed = event.target
                        this.youtubeAPIClosed.ready = true
                      },
                      onPlay: event => {
                        if (this.youtubeAPIClosed) {
                          this.youtubeAPIClosed.pauseVideo()
                          openLightbox()
                        }
                      },
                      opts: this.opts
                    }}
                    noVimeo
                  />
                </div>
              </FixedAspectRatioBox>
              <h5 className={style.title}>
                {this.props.video.post.post_title}
              </h5>
            </div>
          )
        }}
        renderLightboxContents={() => {
          return (
            <FixedAspectRatioBox>
              <BCorpVideo
                className={style.video}
                url={this.url}
                youtubeProps={{
                  opts: this.opts,
                  onReady: event => {
                    this.youtubeAPIOpen = event.target
                    const youtubeAPIOpen = this.youtubeAPIOpen
                    youtubeAPIOpen.playVideo()
                    youtubeAPIOpen.seekTo(this.state.time)
                  }
                }}
                noVimeo
                autoplay
              />
            </FixedAspectRatioBox>
          )
        }}
        onLightboxClose={() => {
          if (this.youtubeAPIOpen && this.youtubeAPIClosed) {
            const youtubeAPIClosed = this.youtubeAPIClosed
            const time = this.youtubeAPIOpen.getCurrentTime()
            youtubeAPIClosed.seekTo(time)
            this.setState({ time })
          }
        }}
        fitLightboxToContent
        fullWidth
        maxWidth={'792px'}
      />
    )
  }
}

export default Video
