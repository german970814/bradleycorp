// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../types/cpt_types'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import LightboxV2 from '../../../containers/Lightbox/LightboxV2/LightboxV2'
import BCorpVideo from '../../BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../FixedAspectRatioBox/FixedAspectRatioBox'
import style from './VideoGalleryItem.scss'

/**
 * Created for the Video gallery,
 * but could really be used anywhere we have a video gallery post.
 *
 * This component opens the video in a lightbox on play
 * (but plays directly from player on mobile)
 * and keeps track of the video's play time when the lightbox is closed
 * so it will play from the same place when reopened.
 *
 * It will give the illusion that the same player is just opening in a lightbox,
 * but in fact we have two different players,
 * and the component acts as a middle man keeping their play time in sync.
 *
 * Currently we can only support YouTube with this functionality
 */

type Props = {
  video: VideoGalleryPost,
  /**
   * Will render the video gallery post title underneath the player
   */
  showTitle?: boolean,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  /**
   * Here we keep track of the latest play time of the player
   * to always keep the players inside and outside the lightbox in sync.
   */
  time: number
}

/**
 * Flow didnt like the iframe type, so we created our own.
 */
type YouTubeIframe = {
  requestFullScreen: () => void,
  mozRequestFullScreen: () => void,
  webkitRequestFullScreen: () => void,
  click: () => void,
  addEventListener: (event: string, cb: () => void) => void
}

/**
 * For flow,
 * just includes the parts of the YouTube Embed API that we actually need.
 *
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
type YouTubeAPI = {
  playVideo: () => void,
  pauseVideo: () => void,
  getCurrentTime: () => number,
  seekTo: (time: number) => void,
  getIframe: () => YouTubeIframe,
  ready: boolean
}

/**
 * The iframe video player options
 */
const opts = {
  playerVars: {
    modestbranding: 1,
    showinfo: 0
  }
}

class VideoGalleryItem extends React.Component<Props, State> {
  url: string
  opts: {}
  // store a ref to the dom node
  // for the video players both in and out the lightbox
  youtubeAPIClosed: ?YouTubeAPI
  youtubeAPIOpen: ?YouTubeAPI

  constructor (props: Props) {
    super(props)

    this.state = {
      time: 0
    }

    // will need the url a few times, so just make it easier and store it here
    this.url = this.props.video.meta.video_gallery_video
    this.opts = opts
  }

  render () {
    // if mobile we dont need to worry about lightbox
    // or really any of the functionality that this component offers,
    // so just render a normal video player.
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
          // the player displayed outside the lightbox
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
          // the player inside the lightbox
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
          // When the close the lightbox we want to sync both players.
          //
          // We only need to do this here
          // since the video will only ever play in the open lightbox.
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
