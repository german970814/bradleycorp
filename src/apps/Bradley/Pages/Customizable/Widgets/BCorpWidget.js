import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './BCorpWidget.scss'

class BCorpWidget extends Component {
  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h4 className={style.title}>{title}</h4>
  }

  renderContentBox () {}

  render () {
    return (
      <div
        className={`${style.widget}`} >

        {this.renderTitle()}

        <div className={`${style.contentBox}`} >
          {this.renderContentBox()}
        </div>

      </div>
    )
  }
}

BCorpWidget.propTypes = {
  title: PropTypes.string
}

export default BCorpWidget
