// @flow
import * as React from 'react'
import type { BCorpColor } from '../../types/styleguide_types'
import { lookupColor } from '../../bcorpStyles'
import VideoBackground from '../../components/BCorpVideo/VideoBackground/VideoBackground'
import BCorpBackground from '../../components/BCorpBackground/BCorpBackground'
import style from './PageHero.scss'

type Props = {
  tagline?: string,
  title?: string,
  copy?: string,
  videoUrl?: string,
  imgSrc?: string,
  overlay?: BCorpColor
}

type State = {
  showTagline: boolean,
  showTitle: boolean,
  showCopy: boolean
}

class PageHero extends React.Component<Props, State> {
  defaultState: State
  taglineTimer: Timeout
  titleTimer: Timeout
  copyTimer: Timeout
  heroNode: ?HTMLDivElement

  constructor (props: Props) {
    super(props)

    this.defaultState = {
      showTagline: false,
      showTitle: false,
      showCopy: false
    }
    this.state = this.defaultState
  }

  componentDidMount () {
    this.fadeTextIn()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (
      nextProps.title !== this.props.title ||
      nextProps.tagline !== this.props.tagline ||
      nextProps.copy !== this.props.copy
    ) {
      this.resetText()
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (
      prevProps.title !== this.props.title ||
      prevProps.tagline !== this.props.tagline ||
      prevProps.copy !== this.props.copy
    ) {
      this.fadeTextIn()
    }
  }

  resetText () {
    clearTimeout(this.taglineTimer)
    clearTimeout(this.titleTimer)
    clearTimeout(this.copyTimer)
    this.setState(this.defaultState)
  }

  fadeTextIn () {
    this.taglineTimer = setTimeout(this.showTagline.bind(this), 1000)
    this.titleTimer = setTimeout(this.showTitle.bind(this), 2000)
    this.copyTimer = setTimeout(this.showCopy.bind(this), 3000)
  }

  showTagline () {
    this.setState({ showTagline: true })
  }

  showTitle () {
    this.setState({ showTitle: true })
  }

  showCopy () {
    this.setState({ showCopy: true })
  }

  renderTitle (shouldRender: boolean) {
    if (!shouldRender || !this.props.title) {
      return
    }

    return (
      <div
        style={{
          opacity: this.state.showTitle ? 1 : 0
        }}
        className={`col1 hero-headline ${style.title}`}>
        {this.props.title}
      </div>
    )
  }

  renderTagline (shouldRender: boolean) {
    if (!shouldRender || !this.props.tagline) {
      return
    }

    return (
      <div
        style={{
          opacity: this.state.showTagline ? 1 : 0
        }}
        className={`col1 hero-intro ${style.tagline}`}>
        {this.props.tagline}
      </div>
    )
  }

  renderCopy (shouldRender: boolean) {
    if (!shouldRender || !this.props.copy) {
      return
    }

    return (
      <div
        style={{
          opacity: this.state.showCopy ? 1 : 0
        }}
        className={`col1 hero-copy ${style.copy}`}>
        {this.props.copy}
      </div>
    )
  }

  renderHeroBackground () {
    if (!this.props.videoUrl || !this.heroNode) {
      return this.renderHeroBackgroundImage()
    }

    return this.renderHeroBackgroundVideo()
  }

  renderHeroBackgroundImage () {
    return (
      <BCorpBackground
        imageSrc={this.getHeroBackgroundImageSrc()}
        overlay={this.props.overlay}
        imageOpacity={0.33}
      />
    )
  }

  renderHeroBackgroundVideo () {
    return (
      <React.Fragment>
        <VideoBackground
          node={this.heroNode}
          url={this.props.videoUrl}
          placeholder={this.getHeroBackgroundImageSrc()}
        />

        <div
          style={{
            backgroundColor: lookupColor(this.props.overlay)
          }}
          className={style.videoOverlay}
        />
      </React.Fragment>
    )
  }

  getHeroBackgroundImageSrc () {
    return this.props.imgSrc
  }

  render () {
    const shouldRender = this.heroShouldRender()

    if (!shouldRender.title && !shouldRender.tagline && !shouldRender.copy) {
      return null
    }

    return (
      <div
        ref={node => {
          this.heroNode = node
        }}
        className={style.heroWrapper}>
        {this.renderHeroBackground()}

        <div className={`row ${style.hero}`}>
          {this.renderTagline(shouldRender.tagline)}
          {this.renderTitle(shouldRender.title)}
          {this.renderCopy(shouldRender.copy)}
        </div>
      </div>
    )
  }

  heroShouldRender (): { title: boolean, tagline: boolean, copy: boolean } {
    const { tagline, title, copy } = this.props

    const shouldRender = {
      title: !!title,
      tagline: !!tagline,
      copy: !!copy
    }

    return shouldRender
  }
}

export default PageHero
