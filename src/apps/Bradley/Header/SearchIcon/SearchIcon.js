import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './SearchIcon.scss'

class SearchIcon extends Component {
  handleClick (e) {
    e.stopPropagation()
  }

  render () {
    return (

      <div
        className={style.magnifyingGlassWrapper} >

        <Lightbox
          backgroundClass={style.lightboxBackground}
          onLightboxOpen={this.props.blurApp}
          onLightboxClose={this.props.blurApp} >

          {/* outside lightbox in header bar */}
          <div
            className={style.magnifyingGlass} >
            <img
              src={require('../../../../images/magnifying-glass/magnifying-glass@2x.png')}
              className={style.magnifyingGlassImage} />
          </div>

          {/* inside lightbox */}

          <React.Fragment>

            <VerticalAlignHelper />

            <form
              className={style.lightboxSearchForm}>
              <input
                type={'text'}
                name={'search'}
                className={style.lightboxSearchFormInput}
                onClick={this.handleClick.bind(this)} />

              <input
                type={'image'}
                src={require('../../../../images/magnifying-glass/magnifying-glass-white@2x.png')}
                className={style.submit} />
            </form>

          </React.Fragment>

        </Lightbox>

      </div>
    )
  }
}

SearchIcon.propTypes = {
  blurApp: PropTypes.func
}

export default SearchIcon
