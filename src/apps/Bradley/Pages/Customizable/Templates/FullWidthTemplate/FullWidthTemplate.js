import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validChain } from '../../../../../../lib/bcorpObject'
import style from './FullWidthTemplate.scss'

class FullWidthTemplate extends Component {
  renderTitle (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <h4 className={`col1 ${style.title}`} >
        {data.metaboxes['page_hero'].title}
      </h4>
    )
  }

  renderTagline (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <h5 className={`col1 ${style.tagline}`} >
        {data.metaboxes['page_hero'].tagline}
      </h5>
    )
  }

  renderCopy (shouldRender) {
    if (!shouldRender) {
      return
    }

    const { data } = this.props

    return (
      <h6 className={`col1 ${style.copy}`} >
        {data.metaboxes['page_hero'].copy}
      </h6>
    )
  }

  getHeroBackgroundImage () {
    if (!this.props.data['featured_image'] || this.props.data['featured_image'].length === 0) {
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
        style={{
          backgroundImage: this.getHeroBackgroundImage()
        }}
        className={`row ${style.hero}`}>
        {this.renderTagline(shouldRender.tagline)}
        {this.renderTitle(shouldRender.title)}
        {this.renderCopy(shouldRender.copy)}
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
