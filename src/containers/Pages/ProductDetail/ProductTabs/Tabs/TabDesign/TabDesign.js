import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FileDownloadLink from '../../../../../../components/Partials/FileDownloadLink/FileDownloadLink'
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

  renderLinks () {
    return this.props.links.map((link, index) => {
      return (
        <li
          key={index} >
          <Link to={link.url} replace>
            {link.text}
          </Link>
        </li>
      )
    })
  }

  renderVideos () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          <iframe src={video} />
        </li>
      )
    })
  }

  renderLiterature () {
    return this.props.literature.map((literature, index) => {
      return (
        <li
          key={index}>
          <FileDownloadLink
            title={literature.post['post_title']}
            link={literature.meta['literature_pdf']} />
        </li>
      )
    })
  }

  renderColors () {
    return this.props.colors.map((color, index) => {
      return (
        <li
          key={index} >
          {color.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={style.tabDesign} >

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Links'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderLinks()}
          </ul>
        </div>

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Videos'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderVideos()}
          </ul>
        </div>

        <div
          className={tabStyle.thirdWidthColDesktopTab} >
          <h5
            className={tabStyle.tabColTitle} >
            {'Literature'}
          </h5>
          <ul
            className={tabStyle.tabColUl} >
            {this.renderLiterature()}
          </ul>
        </div>

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
