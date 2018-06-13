// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../types/cpt_types'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import LightboxV2 from '../../../containers/Lightbox/LightboxV2/LightboxV2'
import BCorpVideo from '../../BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../FixedAspectRatioBox/FixedAspectRatioBox'
import style from './VideoGalleryItem.scss'

type Props = {
  video: VideoGalleryPost,
  showTitle?: boolean,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  time: number
}

type YouTubeIframe = {
  requestFullScreen: () => void,
  mozRequestFullScreen: () => void,
  webkitRequestFullScreen: () => void,
  click: () => void,
  addEventListener: (event: string, cb: () => void) => void
}

type YouTubeAPI = {
  playVideo: () => void,
  pauseVideo: () => void,
  getCurrentTime: () => number,
  seekTo: (time: number) => void,
  getIframe: () => YouTubeIframe,
  ready: boolean
}

const opts = {
  playerVars: {
    modestbranding: 1,
    showinfo: 0
  }
}

class VideoGalleryItem extends React.Component<Props, State> {
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
    this.opts = opts
  }

  render () {
    return this.props.screenSize === 'mobile' ? (
      <div className={`col1 col2-tablet ${style.videoWrapper}`}>
        <FixedAspectRatioBox>
          <BCorpVideo
            className={style.video}
            url={this.url}
            youtubeProps={{
              opts: this.opts
            }}
            noVimeo
          />
        </FixedAspectRatioBox>
        {this.props.showTitle && (
          <h5 className={style.title}>{this.props.video.post.post_title}</h5>
        )}
      </div>
    ) : (
      <LightboxV2
        renderChildren={openLightbox => {
          return (
            <div className={`col1 col2-tablet ${style.videoWrapper}`}>
              <FixedAspectRatioBox>
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
              </FixedAspectRatioBox>
              {this.props.showTitle && (
                <h5 className={style.title}>
                  {this.props.video.post.post_title}
                </h5>
              )}
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

export type { YouTubeAPI, YouTubeIframe }
export { opts }
export default withScreenSize(VideoGalleryItem)
