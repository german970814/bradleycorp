import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PDFWithFeaturedImage from '../../../../../../components/Partials/PDFWithFeaturedImage/PDFWithFeaturedImage'
import renderVideoThumbnail from '../renderVideoThumbnail'
import ArrowThumbnail from '../../../../../../components/Partials/ArrowThumbnail/ArrowThumbnail'
import tabStyle from '../Tabs.scss'
import style from './TabDesign.scss'

class TabDesign extends Component {
  constructor (props) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
    this.renderLiterature = this.renderLiterature.bind(this)
    this.renderColors = this.renderColors.bind(this)
  }

  getColumnWidth () {
    let count = 0
    const propsArray = [this.props.links, this.props.videos, this.props.literature]
    propsArray.forEach(prop => {
      if (prop.length) {
        count++
      }
    })

    switch (count) {
      case 1:
        return tabStyle.fullWidthColDesktopTab
      case 2:
        return tabStyle.halfWidthColDesktopTab
      case 3:
        return tabStyle.thirdWidthColDesktopTab
    }
  }

  renderLinksList (linksArray) {
    return linksArray.map((link, index) => {
      if (!link.text) {
        return
      }
      return (
        <li
          key={index} >
          <ArrowThumbnail
            arrowCustomClass={tabStyle.greyArrow}>
            <Link
              to={link.url}
              className={tabStyle.tabTextOrange}
              replace >
              {link.text}
            </Link>
          </ArrowThumbnail>
        </li>
      )
    })
  }

  renderLinks () {
    if (this.props.links.length) {
      // links array always seems to contain an empty object, so remove this
      const links = this.props.links
      const indexOfEmpty = links.findIndex(link => link.text === '')
      if (indexOfEmpty !== -1) {
        links.splice(indexOfEmpty, 1)
      }

      if (links.length) {
        return (
          <div
            className={this.getColumnWidth()} >
            <h5
              className={tabStyle.tabColTitle} >
              {'Links'}
            </h5>
            <ul
              className={tabStyle.tabColUl} >
              {this.renderLinksList(links)}
            </ul>
          </div>
        )
      }
    }
  }

  renderVideosList () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          {renderVideoThumbnail(video.meta['video_gallery_video'])}
        </li>
      )
    })
  }

  renderVideos () {
    if (this.props.videos.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderVideosList()}
          </ul>
        </div>
      )
    }
  }

  renderLiteratureList () {
    return this.props.literature.map((literature, index) => {
      const imageSrc = literature.media['featured_image'] && literature.media['featured_image'].length
        ? literature.media['featured_image'][0]
        : undefined
      return (
        <li
          key={index}
          className={style.literature} >

          <a href={literature.meta['literature_pdf']}>
            <PDFWithFeaturedImage
              title={literature.post['post_title']}
              imageSrc={imageSrc}
              titleClassName={tabStyle.tabTextOrange} />
          </a>

        </li>
      )
    })
  }

  renderLiterature () {
    if (this.props.literature.length) {
      return (
        <div
          className={this.getColumnWidth()} >
          <h5
            className={`${tabStyle.tabColTitle} ${style.literatureTitle}`} >
            {'Literature'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderLiteratureList()}
          </ul>
        </div>
      )
    }
  }

  getColorsByMaterialType () {
    const colorsByMaterialType = {}

    this.props.colors.forEach(color => {
      color.terms['material_type'].forEach(materialType => {
        const termName = materialType.name

        if (Object.keys(colorsByMaterialType).includes(termName)) {
          colorsByMaterialType[termName] = [ ...colorsByMaterialType[termName], color ]
          return
        }

        colorsByMaterialType[termName] = [ color ]
      })
    })

    return colorsByMaterialType
  }

  renderColorsList (colors) {
    return colors.map((color, index) => {
      const src = color.media['featured_image'] && color.media['featured_image'].length
        ? color.media['featured_image'][0]
        : ''
      return (
        <li
          key={index}
          className={style.color} >

          <img
            src={src}
            className={style.colorImage} />
          <div
            className={style.colorTitle} >
            {color.post['post_title']}
          </div>

        </li>
      )
    })
  }

  renderColors () {
    if (this.props.colors.length) {
      const colorsByMaterialType = this.getColorsByMaterialType()
      return Object.keys(colorsByMaterialType).map((materialType, index) => {
        return (
          <div
            key={index}
            className={tabStyle.fullWidthColDesktopTab} >
            <h5
              className={`${tabStyle.tabColTitle} ${style.colorMaterialType}`} >
              {materialType}
            </h5>
            <ul
              className={tabStyle.tabColUl} >
              {this.renderColorsList(colorsByMaterialType[materialType])}
            </ul>
          </div>
        )
      })
    }
  }

  render () {
    return (
      <div
        className={style.tabDesign} >

        {this.renderLinks()}

        {this.renderVideos()}

        {this.renderLiterature()}

        {this.renderColors()}

      </div>
    )
  }
}

TabDesign.propTypes = {
  videos: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
}

export default TabDesign
