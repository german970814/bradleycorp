import React from 'react'
import PropTypes from 'prop-types'
import BCorpModule from '../BCorpModule'
import style from './AllPurposeModule.scss'

class AllPurposeModule extends BCorpModule {
  constructor (props) {
    super(props, style, 'allPurposeModule')
  }

  renderModule () {
    return (
      <div
        className={this.containerClassName} >

        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: decodeURIComponent(this.props.content) }} />

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.props.content) {
      return false
    }

    return true
  }
}

AllPurposeModule.propTypes = {
  content: PropTypes.string
}

export default AllPurposeModule
