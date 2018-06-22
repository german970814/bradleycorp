// @flow
import * as React from 'react'
import type {
  HomePageCookie,
  HomePageCookieOption
} from '../../../../lib/types/cookie_types'
import type { RouterHistory } from 'react-router-dom'
import type { ScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import { Link } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import { withScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import commercialWashroomImageSrc from '../../../../images/home-images/water-falling/water-falling@2x.png'
import emergencySafetyImageSrc from '../../../../images/home-images/water-splashing/water-splashing@2x.png'
import VideoBackground from '../../../../lib/components/BCorpVideo/VideoBackground/VideoBackground'
import BCorpBackground from '../../../../lib/components/BCorpBackground/BCorpBackground'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import BCorpHead from '../../../../lib/components/BCorpHead/BCorpHead'
import style, { emergencysafetyoverlay } from './Home.scss'

type Props = {
  cookies: Cookies,
  history: RouterHistory,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  washroomNode?: HTMLDivElement,
  emergencySafetyNode?: HTMLDivElement
}

const pageTitle = 'Home'
const pageDescription = ''

class Home extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {}

  handleBlackBlueClick (type: HomePageCookieOption) {
    const cookieName: HomePageCookie = 'BcorpHomePage'
    this.props.cookies.set(cookieName, type)
    this.props.history.push('/')
  }

  renderHeader (isMobile: boolean) {
    if (isMobile) {
      return (
        <div className={`${style.fadeIn} ${style.headerMobile}`}>
          <VerticalAlignHelper />
          <img src={require('../../../../images/logo-white/logo@2x.png')} />
          <div className={`home-caption ${style.headerCaption}`}>
            {'every professional’s natural resource'}
          </div>
        </div>
      )
    }

    return (
      <div className={`${style.header}`}>
        <img src={require('../../../../images/logo-white/logo@2x.png')} />
      </div>
    )
  }

  renderCommercialWashroom (isMobile: boolean) {
    if (!this.state.washroomNode) {
      return null
    }

    const content = (
      <h1 className={`row ${style.fadeIn} ${style.commercialWashroomContent}`}>
        {'Commercial Washroom Solutions'}
      </h1>
    )
    return isMobile ? (
      <React.Fragment>
        <BCorpBackground
          imageSrc={commercialWashroomImageSrc}
          overlay={'black'}
          imageOpacity={0.66}
        />
        {content}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <VideoBackground
          node={this.state.washroomNode}
          url={'https://www.youtube.com/watch?v=VWV1fER7vxI&feature=youtu.be'}
          placeholder={commercialWashroomImageSrc}
        />

        <div className={style.videoOverlay} />

        <VerticalAlignHelper />
        {content}
      </React.Fragment>
    )
  }

  renderEmergencySafety (isMobile: boolean) {
    if (!this.state.emergencySafetyNode) {
      return null
    }

    const content = (
      <h1 className={`row ${style.fadeIn} ${style.emergencySafetyContent}`}>
        {'Emergency Safety & Industrial Solutions'}
      </h1>
    )
    return isMobile ? (
      <React.Fragment>
        <BCorpBackground
          imageSrc={emergencySafetyImageSrc}
          customOverlayColor={emergencysafetyoverlay}
          imageOpacity={0.66}
        />
        {content}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <VideoBackground
          node={this.state.emergencySafetyNode}
          url={'https://www.youtube.com/watch?v=9Eso0FnROI4&feature=youtu.be'}
          placeholder={emergencySafetyImageSrc}
        />

        <div className={style.videoOverlay} />

        <VerticalAlignHelper />
        {content}
      </React.Fragment>
    )
  }

  renderCTA () {
    return (
      <React.Fragment>
        <h3>{'Not Just a Partner'}</h3>
        <div className={`hero-headline`}>{'A Well Of Experience'}</div>
        <Link to="/about">
          <button>{'ABOUT BRADLEY'}</button>
        </Link>
      </React.Fragment>
    )
  }

  render () {
    const match = this.props.screenSize === 'mobile'

    return (
      <div className={`row ${style.Home}`}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        {this.renderHeader(match)}

        <div className={`${style.fadeInMobile} ${style.blackBlueContainer}`}>
          <div
            ref={node => {
              if (!this.state.washroomNode && node) {
                this.setState({ washroomNode: node })
              }
            }}
            onClick={() => {
              return this.handleBlackBlueClick('commercial')
            }}
            className={`col1 col2-tablet ${style.commercialWashroom}`}>
            {this.renderCommercialWashroom(match)}
          </div>
          <div
            ref={node => {
              if (!this.state.emergencySafetyNode && node) {
                this.setState({ emergencySafetyNode: node })
              }
            }}
            onClick={() => {
              return this.handleBlackBlueClick('industrial')
            }}
            className={`col1 col2-tablet ${style.emergencySafety}`}>
            {this.renderEmergencySafety(match)}
          </div>

          {!match && (
            <div className={'home-caption'}>
              {'every professional’s natural resource'}
            </div>
          )}
        </div>

        <div className={`col1 ${style.cta}`}>{this.renderCTA()}</div>
      </div>
    )
  }
}

export default withScreenSize(withCookies(Home))
