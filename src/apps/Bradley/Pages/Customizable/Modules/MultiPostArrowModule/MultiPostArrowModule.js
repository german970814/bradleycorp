// import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
// import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
// import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
// import style from './MultiPostArrowModule.scss'

/**
 * Handles the presentational logic for the Multi Post Arrow Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostArrowModule extends PostGettingModule {
  render () {
    return null
  }
}

MultiPostArrowModule.propTypes = {

  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default MultiPostArrowModule
