import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validChain } from '../../../bcorpObject'
import { lookupColor } from '../../../bcorpStyles'
import VideoBackground from '../../../components/BCorpVideo/VideoBackground/VideoBackground'
import BCorpBackground from '../../../components/BCorpBackground/BCorpBackground'
import style from './FullWidthTemplate.scss'

class FullWidthTemplate extends Component {
  constructor (props) {
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.pageSlug !== this.props.pageSlug) {
      this.resetText()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.pageSlug !== this.props.pageSlug) {
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

  renderTitle (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <div
        style={{
          opacity: this.state.showTitle ? 1 : 0
        }}
        className={`col1 hero-headline ${style.title}`}>
        {data.metaboxes['page_hero'].title}
      </div>
    )
  }

  renderTagline (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <div
        style={{
          opacity: this.state.showTagline ? 1 : 0
        }}
        className={`col1 hero-intro ${style.tagline}`}>
        {data.metaboxes['page_hero'].tagline}
      </div>
    )
  }

  renderCopy (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <div
        style={{
          opacity: this.state.showCopy ? 1 : 0
        }}
        className={`col1 hero-copy ${style.copy}`}>
        {data.metaboxes['page_hero'].copy}
      </div>
    )
  }

  renderHeroBackground () {
    if (
      !this.props.data.metaboxes['page_hero']['video_url'] ||
      !this.heroNode
    ) {
      return this.renderHeroBackgroundImage()
    }

    return this.renderHeroBackgroundVideo()
  }

  renderHeroBackgroundImage () {
    return (
      <BCorpBackground
        imageSrc={this.getHeroBackgroundImageSrc()}
        overlay={this.props.data.metaboxes['page_hero']['overlay']}
        imageOpacity={0.33}
      />
    )
  }

  renderHeroBackgroundVideo () {
    return (
      <React.Fragment>
        <VideoBackground
          node={this.heroNode}
          url={this.props.data.metaboxes['page_hero']['video_url']}
          placeholder={this.getHeroBackgroundImageSrc()}
        />

        <div
          style={{
            backgroundColor: lookupColor(
              this.props.data.metaboxes['page_hero']['overlay']
            )
          }}
          className={style.videoOverlay}
        />
      </React.Fragment>
    )
  }

  getHeroBackgroundImageSrc () {
    if (
      !this.props.data['featured_image'] ||
      this.props.data['featured_image'].length === 0
    ) {
      return undefined
    }

    return this.props.data['featured_image'][0]
  }

  renderHero () {
    const shouldRender = this.heroShouldRender()

    if (!shouldRender) {
      return
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

  render () {
    return (
      <div className={style.FullWidthTemplate}>
        {this.renderHero()}
        {this.props.renderModules()}
      </div>
    )
  }

  heroShouldRender () {
    const { data } = this.props
    const shouldRender = {
      title: false,
      tagline: false,
      copy: false
    }

    if (
      validChain(data, 'metaboxes', 'page_hero', 'title') &&
      data.metaboxes['page_hero'].title
    ) {
      shouldRender.title = true
    }
    if (
      validChain(data, 'metaboxes', 'page_hero', 'tagline') &&
      data.metaboxes['page_hero'].tagline
    ) {
      shouldRender.tagline = true
    }
    if (
      validChain(data, 'metaboxes', 'page_hero', 'copy') &&
      data.metaboxes['page_hero'].copy
    ) {
      shouldRender.copy = true
    }

    if (!shouldRender.title && !shouldRender.tagline && !shouldRender.copy) {
      return false
    }

    return shouldRender
  }
}

FullWidthTemplate.propTypes = {
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  pageSlug: PropTypes.string
}

export default FullWidthTemplate
