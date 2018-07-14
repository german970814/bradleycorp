import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withScreenSize } from '../../../../../../../lib/contexts/ScreenSizeContext'
import PropTypes from 'prop-types'
import PDFWithFeaturedImage from '../../../../../../../lib/components/PDFWithFeaturedImage/PDFWithFeaturedImage'
import renderVideoThumbnail from '../renderVideoThumbnail'
import ArrowThumbnail from '../../../../../../../lib/components/ArrowThumbnail/ArrowThumbnail'
import FeaturedImage from '../../../../LiteratureAndChipSamples/Options/Option/FeaturedImage/FeaturedImage'
import tabStyle from '../Tabs.scss'
import style from './TabDesign.scss'

class TabDesign extends Component {
  constructor (props) {
    super(props)

    this.columnsObject = this.getColumnsObject()
  }

  renderLinksList (linksArray) {
    return linksArray.map((link, index) => {
      if (!link.text) {
        return
      }
      return (
        <li key={index}>
          <ArrowThumbnail>
            {!link.url.startsWith('http') ? (
              <Link
                to={link.url}
                className={`link-orange ${tabStyle.tabTextOrange}`}
                replace>
                {link.text}
              </Link>
            ) : (
              <a
                href={link.url}
                target="_blank"
                className={`link-orange ${tabStyle.tabTextOrange}`}>
                {link.text}
              </a>
            )}
          </ArrowThumbnail>
        </li>
      )
    })
  }

  renderLinks () {
    if (this.props.links.length) {
      return (
        <div className={this.columnsObject.class}>
          <h5 className={tabStyle.tabColTitle}>{'Links'}</h5>
          <ul className={tabStyle.tabColUl}>
            {this.renderLinksList(this.props.links)}
          </ul>
        </div>
      )
    }
  }

  renderVideos () {
    if (this.props.videos.length) {
      return (
        <div className={this.columnsObject.class}>
          <div className={tabStyle.videoColMaxWidth}>
            <h5 className={tabStyle.tabColTitle}>{'Videos'}</h5>
            <div className={tabStyle.videoApectRatioWrapper}>
              <div className={tabStyle.videoAspectRatioInside}>
                {renderVideoThumbnail(this.props.videos)}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderLiteratureList () {
    return this.props.literature.map((literature, index) => {
      const imageSrc =
        literature.media['featured_image'] &&
        literature.media['featured_image'].length > 0
          ? literature.media['featured_image'][0]
          : undefined
      return (
        <li key={index} className={style.literature}>
          <PDFWithFeaturedImage
            title={literature.post['post_title']}
            url={literature.meta['literature_pdf']}
            imageSrc={imageSrc}
            titleClassName={`link-orange ${tabStyle.tabTextOrange}`}
          />
        </li>
      )
    })
  }

  renderLiterature () {
    if (this.props.literature.length) {
      return (
        <div className={this.columnsObject.class}>
          <h5 className={`${tabStyle.tabColTitle} ${style.literatureTitle}`}>
            {'Literature'}
          </h5>
          <ul className={tabStyle.tabColUl}>{this.renderLiteratureList()}</ul>
        </div>
      )
    }
  }

  filterParentsWithChildren (terms) {
    let parentTermIds = []

    // we first get all the parent ids for all the terms we have
    terms.forEach(term => {
      if (term.parent !== 0) {
        parentTermIds = [...parentTermIds, term.parent]
      }
    })

    // now we loop through terms again
    // and this time if their ID matches a parent id
    // from another term in the array
    // then we can remove it
    return terms.filter(term => {
      return !parentTermIds.includes(term.term_id)
    })
  }

  getColorsByMaterialType () {
    const colorsByMaterialType = {}

    this.props.colors.forEach(color => {
      // if a color belongs to multiple material types within the same
      // parent/child tree
      // then we only want to show it once,
      // in the subcategory furthest down the tree
      //
      // here we remove the unwanted material types for each colour
      const materialTypesFiltered = this.filterParentsWithChildren(
        color.terms['material_type'] || []
      )

      materialTypesFiltered.forEach(materialType => {
        const termName = materialType.name

        if (Object.keys(colorsByMaterialType).includes(termName)) {
          colorsByMaterialType[termName] = [
            ...colorsByMaterialType[termName],
            color
          ]
          return
        }

        colorsByMaterialType[termName] = [color]
      })
    })

    console.log(colorsByMaterialType)

    return colorsByMaterialType
  }

  renderColorsList (colors) {
    return colors.map((color, index) => {
      return (
        <li key={index} className={style.color}>
          <div className={style.colorImage}>
            <FeaturedImage
              className={style.colorImage}
              post={color}
              isMobile={false}
            />
          </div>
          <h6 className={style.colorTitle}>{color.post['post_title']}</h6>
        </li>
      )
    })
  }

  renderColors () {
    const colorsByMaterialType = this.getColorsByMaterialType()
    console.log(colorsByMaterialType)
    return Object.keys(colorsByMaterialType).map((materialType, index) => {
      return (
        <div
          key={index}
          className={`${tabStyle.fullWidthColDesktopTab} ${style.colorBlock}`}>
          <h5 className={`${tabStyle.tabColTitle} ${style.colorMaterialType}`}>
            {materialType}
          </h5>
          <ul className={tabStyle.tabColUl}>
            {this.renderColorsList(colorsByMaterialType[materialType])}
          </ul>
        </div>
      )
    })
  }

  // note we check for existence of at least one column for each row,
  // otherwise we get an empty row with unecessary margin bottom
  render () {
    return (
      <div className={style.tabDesign}>
        {this.props.literature.length > 0 ||
        this.props.videos.length > 0 ||
        this.props.links.length > 0 ? (
            <div className={`row ${tabStyle.row}`}>
              {this.renderLinks()}
              {this.renderVideos()}
              {this.renderLiterature()}
            </div>
          ) : null}

        {this.props.colors.length > 0 && (
          <div className={`row ${tabStyle.row}`}>{this.renderColors()}</div>
        )}
      </div>
    )
  }

  getColumnsObject () {
    let count = 0
    const propsArray = [
      this.props.links,
      this.props.videos,
      this.props.literature
    ]
    propsArray.forEach(prop => {
      if (prop.length) {
        count++
      }
    })

    if (this.props.screenSize === 'mobile') {
      return {
        class: tabStyle.fullWidthColDesktopTab,
        number: count
      }
    }

    switch (count) {
      case 1:
        return {
          class: tabStyle.fullWidthColDesktopTab,
          number: count
        }
      case 2:
        return {
          class: tabStyle.halfWidthColDesktopTab,
          number: count
        }
      case 3:
        return {
          class: tabStyle.thirdWidthColDesktopTab,
          number: count
        }
    }
  }
}

TabDesign.propTypes = {
  videos: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  // from withScreenSize HOC
  screenSize: PropTypes.string
}

export default withScreenSize(TabDesign)
