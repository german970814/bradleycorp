// @flow
import * as React from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import commercialWashroomImageSrc from '../../../../images/home-images/water-falling/water-falling@2x.png'
import emergencySafetyImageSrc from '../../../../images/home-images/water-splashing/water-splashing@2x.png'
import VideoBackground from '../../../../lib/components/BCorpVideo/VideoBackground/VideoBackground'
import BCorpBackground from '../../../../lib/components/BCorpBackground/BCorpBackground'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './Home.scss'

type Props = {}

type State = {
  washroomNode?: HTMLDivElement,
  emergencySafetyNode?: HTMLDivElement
}

class Home extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  renderHeader (isMobile: boolean) {
    if (isMobile) {
      return (
        <div className={style.headerMobile}>
          <VerticalAlignHelper />
          <img src={require('../../../../images/logo-white/logo@2x.png')} />
          <div className={`home-caption ${style.headerCaption}`}>
            {'every professional’s natural resource'}
          </div>
        </div>
      )
    }

    return (
      <div className={style.header}>
        <img src={require('../../../../images/logo-white/logo@2x.png')} />
      </div>
    )
  }

  renderCommercialWashroom (isMobile: boolean) {
    if (!this.state.washroomNode) {
      return null
    }

    const content = (
      <h1 className={`row ${style.commercialWashroomContent}`}>
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
          url={'https://www.youtube.com/watch?v=FS0QJ-MXkOY'}
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
      <h1 className={`row ${style.emergencySafetyContent}`}>
        {'Emergency Safety & Industrial Solutions'}
      </h1>
    )
    return isMobile ? (
      <React.Fragment>
        <BCorpBackground
          imageSrc={emergencySafetyImageSrc}
          customOverlayColor={'#2f3d70'}
          imageOpacity={0.33}
        />
        {content}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <VideoBackground
          node={this.state.emergencySafetyNode}
          url={'https://www.youtube.com/watch?v=lmWfSZ7xJbk'}
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
        <button>{'ABOUT BRADLEY'}</button>
      </React.Fragment>
    )
  }

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match => {
          return (
            <div className={`row ${style.Home}`}>
              {this.renderHeader(match)}

              <div className={style.blackBlueContainer}>
                <div
                  ref={node => {
                    if (!this.state.washroomNode && node) {
                      this.setState({ washroomNode: node })
                    }
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
        }}
      </Media>
    )
  }
}

export default Home
