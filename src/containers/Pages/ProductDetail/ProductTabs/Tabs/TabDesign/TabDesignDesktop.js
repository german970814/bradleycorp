import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class TabDesignDesktop extends Component {
  constructor(props) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
    this.renderLiterature = this.renderLiterature.bind(this)
  }

  renderLinks() {
    return this.props.links.map( (link, index) => {
      return (
        <li
          key={index} >
          <Link to={link.url} replace> //TODO: what if this is an external link, might need to be anchor tag
            {link.text}
          </Link>
        </li>
      )
    })
  }

  renderVideos() {
    return this.props.videos.map( (video, index) => {
      return (
        <li
          key={index} >
          <iframe src={video} />
        </li>
      )
    })
  }

  renderLiterature() {
    return this.props.literature.map( (literature, index) => {
      console.log(literature)
      return (
        <li
          key={index}>
          <div>
            {literature.post["post_title"]}
          </div>
          {literature.meta["literature_pdf"]}
        </li>
      )
    })
  }

  render () {
    return (
      <div>

        <div>
          <h4>
            {'Links'}
          </h4>
          <ul>
            {this.renderLinks()}
          </ul>
        </div>

        <div>
          <h4>
            {'Videos'}
          </h4>
          <ul>
            {this.renderVideos()}
          </ul>
        </div>

        <div>
          <h4>
            {'Literature'}
          </h4>
          <ul>
            {this.renderLiterature()}
          </ul>
        </div>

      </div>
    )
  }
}

TabDesignDesktop.propTypes = {
  videos: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired
}

export default TabDesignDesktop
