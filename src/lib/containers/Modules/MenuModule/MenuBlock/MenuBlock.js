import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BCorpLink from '../../../../components/BCorpLink/BCorpLink'
import ArrowThumbnail from '../../../../components/ArrowThumbnail/ArrowThumbnail'
import style from './MenuBlock.scss'

class MenuBlock extends Component {
  renderChildLinks () {
    if (
      !this.props.blockData.children ||
      this.props.blockData.children.length === 0
    ) {
      return
    }

    return this.props.blockData.children.map((childLink, index) => {
      return (
        <ArrowThumbnail key={index} className={style.arrowWrapper}>
          <BCorpLink
            url={childLink.url}
            renderInternal={url => {
              return (
                <Link to={url} replace>
                  <div className={`${style.childLink} link-navy`}>
                    {childLink.title}
                  </div>
                </Link>
              )
            }}
            renderExternal={url => {
              return (
                <a href={url}>
                  <div className={`${style.childLink} link-navy`}>
                    {childLink.title}
                  </div>
                </a>
              )
            }}
          />
        </ArrowThumbnail>
      )
    })
  }

  render () {
    const { blockData } = this.props

    return (
      <React.Fragment>
        <BCorpLink
          url={blockData.url}
          renderInternal={url => {
            return (
              <Link className={style.blockDataTitle} to={url} replace>
                <h6 className={style.blockTitle}>{blockData.title}</h6>
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a className={style.blockDataTitle} href={url}>
                <h6 className={style.blockTitle}>{blockData.title}</h6>
              </a>
            )
          }}
        />

        {this.renderChildLinks()}
      </React.Fragment>
    )
  }
}

MenuBlock.propTypes = {
  blockData: PropTypes.object
}

export default MenuBlock
