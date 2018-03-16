import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validChain } from '../../../../../../lib/bcorpObject'
import VideoBackground from '../../../../../../lib/components/BCorpVideo/VideoBackground/VideoBackground'
import style from './FullWidthTemplate.scss'

class FullWidthTemplate extends Component {
  renderTitle (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <div className={`col1 hero-headline ${style.title}`} >
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
      <h3 className={`col1 ${style.tagline}`} >
        {data.metaboxes['page_hero'].tagline}
      </h3>
    )
  }

  renderCopy (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <div className={`col1 hero-copy ${style.copy}`} >
        {data.metaboxes['page_hero'].copy}
      </div>
    )
  }

  renderBackgroundVideo () {
    if (!this.props.data.metaboxes['page_hero']['video_url'] || !this.heroNode) {
      return
    }

    return (
      <VideoBackground
        node={this.heroNode}
        url={this.props.data.metaboxes['page_hero']['video_url']} />
    )
  }

  getHeroBackgroundImage () {
    // only use this if no video url is given
    if (!this.props.data['featured_image'] || this.props.data['featured_image'].length === 0 ||
        this.props.data.metaboxes['page_hero']['video_url'] !== '') {
      return undefined
    }

    return `url(${this.props.data['featured_image'][0]})`
  }

  renderHero () {
    const shouldRender = this.heroShouldRender()

    if (!shouldRender) {
      return
    }

    return (
      <div
        ref={node => { this.heroNode = node }}
        className={style.heroWrapper} >
        {this.renderBackgroundVideo()}
        <div
          style={{
            backgroundImage: this.getHeroBackgroundImage()
          }}
          className={`row ${style.hero}`}>
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

    if (validChain(data, 'metaboxes', 'page_hero', 'title') && data.metaboxes['page_hero'].title) {
      shouldRender.title = true
    }
    if (validChain(data, 'metaboxes', 'page_hero', 'tagline') && data.metaboxes['page_hero'].tagline) {
      shouldRender.tagline = true
    }
    if (validChain(data, 'metaboxes', 'page_hero', 'copy') && data.metaboxes['page_hero'].copy) {
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
  renderWidgets: PropTypes.func.isRequired
}

export default FullWidthTemplate
